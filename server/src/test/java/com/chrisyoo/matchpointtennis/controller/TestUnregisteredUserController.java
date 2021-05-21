package com.chrisyoo.matchpointtennis.controller;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

@RunWith(SpringRunner.class)
@WebMvcTest(UnregisteredUserController.class)
class TestUnregisteredUserController {

	@Autowired
	private MockMvc mockMvc;

	@Test
	public void testSuccessfulChargeCard() throws Exception {
		// isolate charge part, test, use mock verify to check that charge method is called
		// isolate email part, test, use mock verfiy to check that email method is called
	}

}
