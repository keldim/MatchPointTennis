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
	// private OpenIdUserService openIdUserService;
	// private PastOrderService pastOrderService;

	// OpenIdUserService openIdUserService
	// PastOrderService pastOrderService

	private Thread cleanUpThread = new Thread() {
		public void run() {
			try {
				System.out.println("cleanUpThread running");
				Thread.sleep(900000);
				variableCleanUp();
				System.out.println("cleanUpThread stopped");
			} catch (InterruptedException e) {
				System.out.println("order canceled, variables are cleaned, cleanUpThread stopped");
			}
		}
	};

	private String firstName = "";
	private String lastName = "";
	private String email = "";
	private String phoneNumber = "";

	private String address1 = "";
	private String address2 = "";
	private String city = "";
	private String state = "";
	private String zipcode = "";

	private String cardNumber = "";
	private String expMonth = "";
	private String expYear = "";
	private String cvc = "";

	@Autowired
	UnregisteredUserController(StripeClient stripeClient) {
		this.stripeClient = stripeClient;
		// this.openIdUserService = openIdUserService;
		// this.pastOrderService = pastOrderService;
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

	@PostMapping("/shipping-and-payment")
	public @ResponseBody String shippingAndPayment(HttpServletRequest request, Model theModel) {
		this.firstName = request.getHeader("firstName");
		this.lastName = request.getHeader("lastName");
		this.email = request.getHeader("email");
		this.phoneNumber = request.getHeader("phoneNumber");

		this.address1 = request.getHeader("address1");
		this.address2 = request.getHeader("address2");
		this.city = request.getHeader("city");
		this.state = request.getHeader("state");
		this.zipcode = request.getHeader("zipcode");

		this.cardNumber = request.getHeader("cardNumber");
		this.expMonth = request.getHeader("expMonth");
		this.expYear = request.getHeader("expYear");
		this.cvc = request.getHeader("cvc");

		return "{\"status\":\"OK\"}";
	}

	@GetMapping("/shipping-and-payment-info")
	public JSONObject shippingAndPaymentInfo(HttpServletRequest request, Model theModel) {

		JSONObject shippingAndPaymentInfo = new JSONObject();

		shippingAndPaymentInfo.put("firstName", this.firstName);
		shippingAndPaymentInfo.put("lastName", this.lastName);
		shippingAndPaymentInfo.put("email", this.email);
		shippingAndPaymentInfo.put("phoneNumber", this.phoneNumber);

		shippingAndPaymentInfo.put("address1", this.address1);
		shippingAndPaymentInfo.put("address2", this.address2);
		shippingAndPaymentInfo.put("city", this.city);
		shippingAndPaymentInfo.put("state", this.state);
		shippingAndPaymentInfo.put("zipcode", this.zipcode);

		shippingAndPaymentInfo.put("cardNumber", this.cardNumber);
		shippingAndPaymentInfo.put("expMonth", this.expMonth);
		shippingAndPaymentInfo.put("expYear", this.expYear);
		shippingAndPaymentInfo.put("cvc", this.cvc);

		return shippingAndPaymentInfo;
	}

	@PostMapping("/clean-up")
	public void cleanUp() {
		if (this.cleanUpThread.isAlive() == false) {
			this.cleanUpThread = new Thread() {
				public void run() {
					try {
						System.out.println("cleanUpThread running");
						Thread.sleep(900000);
						variableCleanUp();
						System.out.println("cleanUpThread stopped");
					} catch (InterruptedException e) {
						System.out.println("order canceled, variables are cleaned, cleanUpThread stopped");
					}
				}
			};
			this.cleanUpThread.start();
		}
	}

	@PostMapping("/cancel")
	public void cancelOrder() {
		if (this.cleanUpThread.isAlive()) {
			this.cleanUpThread.interrupt();
			variableCleanUp();
		} else {
			variableCleanUp();
		}
	}

	public void variableCleanUp() {
		this.firstName = "";
		this.lastName = "";
		this.email = "";
		this.phoneNumber = "";

		this.address1 = "";
		this.address2 = "";
		this.city = "";
		this.state = "";
		this.zipcode = "";

		this.cardNumber = "";
		this.expMonth = "";
		this.expYear = "";
		this.cvc = "";
	}
}
