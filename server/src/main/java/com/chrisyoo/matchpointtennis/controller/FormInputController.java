package com.chrisyoo.matchpointtennis.controller;

import javax.servlet.http.HttpServletRequest;

import org.json.simple.JSONObject;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/form-input")
public class FormInputController {
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
	
	@PostMapping("/data")
	public @ResponseBody String data(HttpServletRequest request, Model theModel) {
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

	@GetMapping("/ephemeral-data")
	public JSONObject ephemeralData(HttpServletRequest request, Model theModel) {

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
						System.out.println("variables are cleaned, cleanUpThread no longer needed and stopped");
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
