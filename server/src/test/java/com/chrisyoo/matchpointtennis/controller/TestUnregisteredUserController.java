package com.chrisyoo.matchpointtennis.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyDouble;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.chrisyoo.matchpointtennis.entity.ConfirmationEmail;
import com.chrisyoo.matchpointtennis.entity.StripeClient;
import com.chrisyoo.matchpointtennis.service.OpenIdUserService;
import com.chrisyoo.matchpointtennis.service.PastOrderService;
import com.stripe.model.Charge;

@RunWith(SpringRunner.class)
@WebMvcTest
@AutoConfigureMockMvc(addFilters = false)
public class TestUnregisteredUserController {

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
	public void should_charge_card() throws Exception {
		Charge result = new Charge();
		result.setAmount(55L);
		result.setCurrency("dollar");

		when(stripeClient.chargeCreditCard(any(), anyDouble(), any())).thenReturn(result);
		doNothing().when(confirmationEmail).sendEmail(any());

		mockMvc.perform(post("/unregistered-user/charge").header("token", "any()").header("amount", "0.00"))
				.andExpect(status().isOk()).andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(MockMvcResultMatchers.jsonPath("$.amount").value("55"))
				.andExpect(MockMvcResultMatchers.jsonPath("$.currency").value("dollar"));
	}

	@Test
	public void should_send_email_during_charge_card() throws Exception {
		Charge result = new Charge();

		when(stripeClient.chargeCreditCard(any(), anyDouble(), any())).thenReturn(result);
		doNothing().when(confirmationEmail).sendEmail(any());

		mockMvc.perform(post("/unregistered-user/charge").header("token", "any()").header("amount", "0.00"))
				.andExpect(status().isOk()).andExpect(content().contentType(MediaType.APPLICATION_JSON));
		verify(confirmationEmail).sendEmail(any());
	}

}
