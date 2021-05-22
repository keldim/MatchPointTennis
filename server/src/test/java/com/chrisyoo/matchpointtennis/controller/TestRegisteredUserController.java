package com.chrisyoo.matchpointtennis.controller;

import static org.junit.Assert.assertEquals;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import com.chrisyoo.matchpointtennis.entity.ConfirmationEmail;
import com.chrisyoo.matchpointtennis.entity.OpenIdUser;
import com.chrisyoo.matchpointtennis.entity.StripeClient;
import com.chrisyoo.matchpointtennis.service.OpenIdUserService;
import com.chrisyoo.matchpointtennis.service.PastOrderService;

@WebMvcTest
public class TestRegisteredUserController {

	@Autowired
	private MockMvc mockMvc;
	@MockBean
	private StripeClient stripeClient;
	@MockBean
	private PastOrderService pastOrderService;
	@MockBean
	private OpenIdUserService openIdUserService;
	@MockBean
	private ConfirmationEmail confirmationEmail;
	
	@Test
	public void should_return_past_orders_of_registered_user() {
		
	}
	
//	only test functionalities that are actually used
	
	@Test
	public void should_return_past_order_by_id() {
		
	}
	
	@Test
	public void should_charge_card() {
		
	}

}
