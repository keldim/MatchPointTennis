package com.chrisyoo.matchpointtennis.controller;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.codec.binary.Base64;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.chrisyoo.matchpointtennis.entity.StripeClient;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stripe.model.Charge;

//@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/unregistered-user")
public class UnregisteredUserController {

	private StripeClient stripeClient;
	
	@Autowired
	UnregisteredUserController(StripeClient stripeClient) {
		this.stripeClient = stripeClient;
	}

	@PostMapping("/charge")
	public Charge chargeCard(HttpServletRequest request, Model theModel) {
		try {
			String token = request.getHeader("token");
			Double amount = Double.parseDouble(request.getHeader("amount"));
			return this.stripeClient.chargeCreditCard(token, amount, request);
		} catch (Exception e) {
			System.out.println("Error in unregistered-user, /charge: " + e);
			return null;
		}
	}
	
}
