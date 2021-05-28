package com.chrisyoo.matchpointtennis.service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.codec.binary.Base64;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import com.chrisyoo.matchpointtennis.dao.PastOrderRepository;
import com.chrisyoo.matchpointtennis.entity.ApparelItem;
import com.chrisyoo.matchpointtennis.entity.Item;
import com.chrisyoo.matchpointtennis.entity.OpenIdUser;
import com.chrisyoo.matchpointtennis.entity.PastOrder;
import com.chrisyoo.matchpointtennis.entity.Racquet;
import com.chrisyoo.matchpointtennis.entity.Shoe;

@Service
public class PastOrderServiceImpl implements PastOrderService {

	private PastOrderRepository pastOrderRepository;

	@Autowired
	public PastOrderServiceImpl(PastOrderRepository thePastOrderRepository) {
		pastOrderRepository = thePastOrderRepository;
	}

	@Override
	public List<PastOrder> findAll() {
		return pastOrderRepository.findAll();
	}

	@Override
	public PastOrder findById(int theId) {
		Optional<PastOrder> result = pastOrderRepository.findById(theId);

		PastOrder thePastOrder = null;
		if (result.isPresent()) {
			thePastOrder = result.get();
		} else {
			throw new RuntimeException("Did not find past order id - " + theId);
		}

		return thePastOrder;
	}

	@Override
	public void save(PastOrder pastOrder) {
		pastOrderRepository.save(pastOrder);
	}

	@Override
	public void deleteById(int theId) {
		pastOrderRepository.deleteById(theId);
	}

	@Override
	public PastOrder createPastOrder(HttpServletRequest request) throws Exception {
		PastOrder newPastOrder = saveArraysToPastOrder(request);
		newPastOrder = saveValuesToPastOrder(request, newPastOrder);
		return newPastOrder;
	}
	
	private PastOrder saveArraysToPastOrder(HttpServletRequest request) throws Exception {
		PastOrder newPastOrder = new PastOrder();
		JSONParser parser = new JSONParser();
		JSONArray selectedRacquets = (JSONArray) parser.parse(request.getHeader("selectedRacquets"));
		JSONArray selectedShoes = (JSONArray) parser.parse(request.getHeader("selectedShoes"));
		JSONArray selectedApparel = (JSONArray) parser.parse(request.getHeader("selectedApparel"));
		JSONArray selectedItems = (JSONArray) parser.parse(request.getHeader("selectedItems"));
		
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
		
		return newPastOrder;
	}
	
	private PastOrder saveValuesToPastOrder(HttpServletRequest request, PastOrder newPastOrder) {
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
		
		return newPastOrder;
	}
	
	
	
	
	
}
