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

// create unit tests using @WebMvcTest
// create integration tests? create tests for security?
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
	public void should_return_past_orders_of_registered_user() {
		
	}
	
//	only test functionalities that are actually used
	
	@Test
	public void should_return_past_order_by_id() throws Exception {
		PastOrder result = new PastOrder();
		result.setId(5);
		result.setAddress1("3887  Yorkie Lane");
		when(pastOrderService.findById(5))
		.thenReturn(result);
		mockMvc.perform(post("/registered-user/past-order/5"))
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(MockMvcResultMatchers.jsonPath("$.id").value(5))
				.andExpect(MockMvcResultMatchers.jsonPath("$.address1").value("3887  Yorkie Lane"));
	}
	
	@Test
	public void should_charge_card() throws Exception {
		
		
//		MockHttpServletRequest request = new MockHttpServletRequest();
//		request.addHeader("token", "5fgh2dk");
//		request.addHeader("amount", "0.55");
//		request.addHeader(null, request);
		
	Charge result = new Charge();
//		result.setSource("5fgh2dk");
		result.setAmount(55L);
		result.setCurrency("dollar");
//		when(pastOrderService.save(new PastOrder()))
	
//	Map<String, Object> chargeParams = new HashMap<String, Object>();
//    chargeParams.put("amount", (int)(0.55 * 100));
//    chargeParams.put("currency", "USD");
//    chargeParams.put("source", "5fgh2dk");
//    Charge charge = Charge.create(chargeParams);
    
		when(stripeClient.chargeCreditCard(any(), anyDouble(), any()))
		.thenReturn(result);
		doNothing().when(confirmationEmail).sendEmail(any());
		when(pastOrderService.createPastOrder(any())).thenReturn(null);
		doNothing().when(openIdUserService).addPastOrderToExistingUserOrNewUser(any(), any());
		doNothing().when(pastOrderService).save(any());

		
//		.andExpect(MockMvcResultMatchers.jsonPath("$.token").value("5fgh2dk"))
		mockMvc.perform(post("/registered-user/charge").header("token", "any()").header("amount", "0.00"))
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(MockMvcResultMatchers.jsonPath("$.amount").value("55"))
				.andExpect(MockMvcResultMatchers.jsonPath("$.currency").value("dollar"));
//				.andExpect(MockMvcResultMatchers.jsonPath("$.source").value("5fgh2dk"));
		
//		set headers for post?
//		mock pastOrderService in createAndSavePastOrder()
	}
	
	@Test
	public void should_send_email_after_charge_card() {
		
	}

}
