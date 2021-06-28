package com.chrisyoo.matchpointtennis.controller;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;
import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.HashMap;
import java.util.Map;

import static org.hamcrest.Matchers.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.chrisyoo.matchpointtennis.entity.ConfirmationEmail;
import com.chrisyoo.matchpointtennis.entity.OpenIdUser;
import com.chrisyoo.matchpointtennis.entity.PastOrder;
import com.chrisyoo.matchpointtennis.entity.StripeClient;
import com.chrisyoo.matchpointtennis.service.OpenIdUserService;
import com.chrisyoo.matchpointtennis.service.PastOrderService;
import com.stripe.model.Charge;

@RunWith(SpringRunner.class)
@WebMvcTest
@AutoConfigureMockMvc(addFilters = false)
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
	public void should_call_findByUsername_to_find_past_orders_for_registered_user() throws Exception {
		String randomBearerToken = "empty eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4"
				+ "gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
		
		when(openIdUserService.findByUsername(any())).thenReturn(null);
		
		mockMvc.perform(post("/registered-user/past-orders").header("Authorization", randomBearerToken))
		.andExpect(status().isOk()).andExpect(content().contentType(MediaType.APPLICATION_JSON));
		verify(openIdUserService).findByUsername(any());
	}
	
	@Test
	public void should_return_zero_past_orders_for_newly_registered_user() throws Exception {
		String randomBearerToken = "empty eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4"
				+ "gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
		
		when(openIdUserService.findByUsername(any())).thenReturn(null);
		
		mockMvc.perform(post("/registered-user/past-orders").header("Authorization", randomBearerToken))
		.andExpect(status().isOk()).andExpect(content().contentType(MediaType.APPLICATION_JSON))
		.andExpect(MockMvcResultMatchers.jsonPath("$").isEmpty());
	}
	
	@Test
	public void should_return_past_orders_for_existing_registered_user() throws Exception {
		String randomBearerToken = "empty eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4"
				+ "gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
		OpenIdUser user = new OpenIdUser();
		PastOrder userPastOrder1 = new PastOrder();
		userPastOrder1.setAddress1("3887  Yorkie Lane");
		PastOrder userPastOrder2 = new PastOrder();
		userPastOrder2.setAddress1("1896  Wright Court");
		user.addPastOrder(userPastOrder1);
		user.addPastOrder(userPastOrder2);
		
		when(openIdUserService.findByUsername(any())).thenReturn(user);
			
		mockMvc.perform(post("/registered-user/past-orders").header("Authorization", randomBearerToken))
		.andExpect(status().isOk()).andExpect(content().contentType(MediaType.APPLICATION_JSON))
		.andExpect(MockMvcResultMatchers.jsonPath("$[0].address1").value("3887  Yorkie Lane"))
		.andExpect(MockMvcResultMatchers.jsonPath("$[1].address1").value("1896  Wright Court"));
	}

	@Test
	public void should_return_past_order_by_id() throws Exception {
		String randomBearerToken = "empty eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4"
				+ "gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
		OpenIdUser user = new OpenIdUser();
		PastOrder result = new PastOrder();
		result.setId(5);
		result.setAddress1("3887  Yorkie Lane");
		user.addPastOrder(result);
		
		when(openIdUserService.findByUsername(any())).thenReturn(user);
		when(pastOrderService.findById(5)).thenReturn(result);
		
		mockMvc.perform(post("/registered-user/past-order/5").header("Authorization", randomBearerToken))
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(MockMvcResultMatchers.jsonPath("$.id").value(5))
				.andExpect(MockMvcResultMatchers.jsonPath("$.address1").value("3887  Yorkie Lane"));
	}

	@Test
	public void should_charge_card() throws Exception {
		Charge result = new Charge();
		result.setAmount(55L);
		result.setCurrency("dollar");

		when(stripeClient.chargeCreditCard(any(), anyDouble(), any())).thenReturn(result);
		doNothing().when(confirmationEmail).sendEmail(any());
		when(pastOrderService.createPastOrder(any())).thenReturn(null);
		doNothing().when(openIdUserService).addPastOrderToExistingUserOrNewUser(any(), any());
		doNothing().when(pastOrderService).save(any());

		mockMvc.perform(post("/registered-user/charge").header("token", "any()").header("amount", "0.00"))
				.andExpect(status().isOk()).andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(MockMvcResultMatchers.jsonPath("$.amount").value("55"))
				.andExpect(MockMvcResultMatchers.jsonPath("$.currency").value("dollar"));
	}

	@Test
	public void should_send_email_during_charge_card() throws Exception {
		Charge result = new Charge();

		when(stripeClient.chargeCreditCard(any(), anyDouble(), any())).thenReturn(result);
		doNothing().when(confirmationEmail).sendEmail(any());
		when(pastOrderService.createPastOrder(any())).thenReturn(null);
		doNothing().when(openIdUserService).addPastOrderToExistingUserOrNewUser(any(), any());
		doNothing().when(pastOrderService).save(any());

		mockMvc.perform(post("/registered-user/charge").header("token", "any()").header("amount", "0.00"))
				.andExpect(status().isOk()).andExpect(content().contentType(MediaType.APPLICATION_JSON));
		verify(confirmationEmail).sendEmail(any());
	}
	
	@Test
	public void should_save_order_during_charge_card() throws Exception {
		Charge result = new Charge();

		when(stripeClient.chargeCreditCard(any(), anyDouble(), any())).thenReturn(result);
		doNothing().when(confirmationEmail).sendEmail(any());
		when(pastOrderService.createPastOrder(any())).thenReturn(null);
		doNothing().when(openIdUserService).addPastOrderToExistingUserOrNewUser(any(), any());
		doNothing().when(pastOrderService).save(any());

		mockMvc.perform(post("/registered-user/charge").header("token", "any()").header("amount", "0.00"))
				.andExpect(status().isOk()).andExpect(content().contentType(MediaType.APPLICATION_JSON));
		verify(pastOrderService).createPastOrder(any());
		verify(openIdUserService).addPastOrderToExistingUserOrNewUser(any(), any());
		verify(pastOrderService).save(any());
	}

}
