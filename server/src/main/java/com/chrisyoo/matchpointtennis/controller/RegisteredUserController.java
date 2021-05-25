package com.chrisyoo.matchpointtennis.controller;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.apache.commons.codec.binary.Base64;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.chrisyoo.matchpointtennis.entity.ApparelItem;
import com.chrisyoo.matchpointtennis.entity.ConfirmationEmail;
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
	private ConfirmationEmail confirmationEmail;
	
	@Autowired
	public RegisteredUserController(StripeClient stripeClient, OpenIdUserService openIdUserService, PastOrderService pastOrderService, ConfirmationEmail confirmationEmail) {
		this.stripeClient = stripeClient;
		this.openIdUserService = openIdUserService;
		this.pastOrderService = pastOrderService;
		this.confirmationEmail = confirmationEmail;
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
	public Charge chargeCard(HttpServletRequest request) {

		try {
			String token = request.getHeader("token");
			Double amount = Double.parseDouble(request.getHeader("amount"));
			Charge charge = this.stripeClient.chargeCreditCard(token, amount, request);
			
			try {
	        	this.confirmationEmail.sendEmail(request);
	            System.out.println("Email Sent!");
	        } catch (Exception ex) {
	        	System.out.println("Error in sending email: " + ex);
	        	throw ex;
	        }
			
			PastOrder newPastOrder = pastOrderService.createPastOrder(request);
			openIdUserService.addPastOrderToExistingUserOrNewUser(request, newPastOrder);
			pastOrderService.save(newPastOrder);
			
			return charge;
			
		} catch (Exception e) {
			System.out.println("Error in registered user, /charge: " + e);
			return null;
		}
		
	}
	
	
}
