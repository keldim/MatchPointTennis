package com.chrisyoo.matchpointtennis.controller;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.codec.binary.Base64;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.chrisyoo.matchpointtennis.entity.ApparelItem;
import com.chrisyoo.matchpointtennis.entity.Item;
import com.chrisyoo.matchpointtennis.entity.OpenIdUser;
import com.chrisyoo.matchpointtennis.entity.PastOrder;
import com.chrisyoo.matchpointtennis.entity.Racquet;
import com.chrisyoo.matchpointtennis.entity.Shoe;
import com.chrisyoo.matchpointtennis.entity.StripeClient;
import com.chrisyoo.matchpointtennis.service.OpenIdUserService;
import com.chrisyoo.matchpointtennis.service.PastOrderService;
import com.stripe.model.Charge;

@RestController
@RequestMapping("/registered-user")
public class RegisteredUserController {
	
	private StripeClient stripeClient;
	private PastOrderService pastOrderService;
	private OpenIdUserService openIdUserService;
	
	@Autowired
	public RegisteredUserController(StripeClient stripeClient, OpenIdUserService openIdUserService, PastOrderService pastOrderService) {
		this.stripeClient = stripeClient;
		this.openIdUserService = openIdUserService;
		this.pastOrderService = pastOrderService;
	}

	@PostMapping("/past-orders")
	public List<PastOrder> getPastOrders(HttpServletRequest request) {
				
		JSONObject openId;
		
		try {
			String[] pre_split_string = request.getHeader("Authorization").split(" ");
	        String[] split_string = pre_split_string[1].split("\\.");
	        JSONParser parser = new JSONParser();

	        String base64EncodedBody = split_string[1];
	        Base64 base64Url = new Base64(true);
	        String body = new String(base64Url.decode(base64EncodedBody));      
			openId = (JSONObject) parser.parse(body);
		} catch (Exception e) {
			System.out.println("Error in registered user, /past-orders: " + e);
			return null;
		}
			
		OpenIdUser existingUser = openIdUserService.findByUsername((String) openId.get("sub"));
		
		if (existingUser == null) {
			return new ArrayList<PastOrder>();
		} else {
			List<PastOrder> allPastOrders = existingUser.getPastOrders();
			return allPastOrders;
		}
		
	}
	
	@PostMapping("/past-order/{id}")
	public PastOrder getPastOrder(@PathVariable int id) {
		return pastOrderService.findById(id);
	}
	
	@PostMapping("/charge")
	public Charge chargeCard(HttpServletRequest request, Model theModel) {

		try {
			JSONParser parser = new JSONParser();

			// what if there are no pizzas at all?
			JSONArray selectedRacquets = (JSONArray) parser.parse(request.getHeader("selectedRacquets"));
			JSONArray selectedShoes = (JSONArray) parser.parse(request.getHeader("selectedShoes"));
			JSONArray selectedApparel = (JSONArray) parser.parse(request.getHeader("selectedApparel"));
			JSONArray selectedItems = (JSONArray) parser.parse(request.getHeader("selectedItems"));
					
			PastOrder newPastOrder = new PastOrder();
				
			for (int i = 0; i < selectedRacquets.size(); i++) {
				JSONObject currentRacquet = (JSONObject) selectedRacquets.get(i);
				String name = (String) currentRacquet.get("name");
				String gripSize = (String) currentRacquet.get("gripSize");
				String racquetString = (String) currentRacquet.get("racquetString");
				String tension = (String) currentRacquet.get("tension");
				String price = (String) currentRacquet.get("price");
				String quantity = (String) currentRacquet.get("quantity");
				
				Racquet racquetPastOrder = new Racquet(name, gripSize, racquetString, tension, price, quantity);
				newPastOrder.addRacquet(racquetPastOrder);		
			}
			
			for (int i = 0; i < selectedShoes.size(); i++) {
				JSONObject currentShoe = (JSONObject) selectedShoes.get(i);
				String name = (String) currentShoe.get("name");
				String size = (String) currentShoe.get("size");
				String price = (String) currentShoe.get("price");
				String quantity = (String) currentShoe.get("quantity");
				
				Shoe shoePastOrder = new Shoe(name, size, price, quantity);
				newPastOrder.addShoe(shoePastOrder);
			}
			
			for (int i = 0; i < selectedApparel.size(); i++) {
				JSONObject currentApparelItem = (JSONObject) selectedApparel.get(i);
				String name = (String) currentApparelItem.get("name");
				String size = (String) currentApparelItem.get("size");
				String color = (String) currentApparelItem.get("color");
				String price = (String) currentApparelItem.get("price");
				String quantity = (String) currentApparelItem.get("quantity");
				
				ApparelItem apparelItemPastOrder = new ApparelItem(name, size, color, price, quantity);
				newPastOrder.addApparelItem(apparelItemPastOrder);
			}
			
			for (int i = 0; i < selectedItems.size(); i++) {
				JSONObject currentItem = (JSONObject) selectedItems.get(i);
				String name = (String) currentItem.get("name");
				String price = (String) currentItem.get("price");
				String quantity = (String) currentItem.get("quantity");
				
				Item itemPastOrder = new Item(name, price, quantity);
				newPastOrder.addItem(itemPastOrder);
			}
				
//			leave amount as it is, no need to parse quantity as long
				
			String token = request.getHeader("token");
			// with toggle, simply run the application, if the error occurs, then enter
			// debug perspective

			String[] pre_split_string = request.getHeader("Authorization").split(" ");
			String[] split_string = pre_split_string[1].split("\\.");
			
			String base64EncodedBody = split_string[1];
			Base64 base64Url = new Base64(true);
			String body = new String(base64Url.decode(base64EncodedBody));
			JSONObject openId = (JSONObject) parser.parse(body);
			
			LocalDateTime now = LocalDateTime.now();
			Timestamp timeSaved = Timestamp.valueOf(now);
			
			newPastOrder.setOrdered_at(timeSaved);
			newPastOrder.setAddress1(request.getHeader("address1"));
			newPastOrder.setAddress2(request.getHeader("address2"));
			newPastOrder.setCity(request.getHeader("city"));
			newPastOrder.setState(request.getHeader("state"));
			newPastOrder.setZipcode(request.getHeader("zipcode"));
			newPastOrder.setCardLastFourNumbers(request.getHeader("cardLastFourNumbers"));
			newPastOrder.setCardType(request.getHeader("cardType"));
			
			// what if there are no users at all?
			OpenIdUser existingUser = openIdUserService.findByUsername((String) openId.get("sub"));
			if (existingUser == null) {
				OpenIdUser newOpenIdUser = new OpenIdUser((String) openId.get("sub"));
				openIdUserService.save(newOpenIdUser);
				newOpenIdUser.addPastOrder(newPastOrder);
			} else {
				existingUser.addPastOrder(newPastOrder);
			}
			pastOrderService.save(newPastOrder);

			Double amount = Double.parseDouble(request.getHeader("amount"));

			return this.stripeClient.chargeCreditCard(token, amount, request);
			
		} catch (Exception e) {
			System.out.println("Error in registered user, /charge: " + e);
			return null;
		}
		
	}
}
