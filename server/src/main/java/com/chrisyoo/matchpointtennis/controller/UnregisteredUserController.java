package com.chrisyoo.matchpointtennis.controller;

import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chrisyoo.matchpointtennis.entity.ConfirmationEmail;
import com.chrisyoo.matchpointtennis.entity.StripeClient;
import com.stripe.model.Charge;

@RestController
@RequestMapping("/unregistered-user")
public class UnregisteredUserController {

	private StripeClient stripeClient;
	private ConfirmationEmail confirmationEmail;
	
	@Autowired
	UnregisteredUserController(StripeClient stripeClient, ConfirmationEmail confirmationEmail) {
		this.stripeClient = stripeClient;
		this.confirmationEmail = confirmationEmail;
	}

	@PostMapping("/charge")
	public Charge chargeCard(HttpServletRequest request, Model theModel) {
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
			
			return charge;
		} catch (Exception e) {
			System.out.println("Error in unregistered-user, /charge: " + e);
			return null;
		}
	}
	
}
