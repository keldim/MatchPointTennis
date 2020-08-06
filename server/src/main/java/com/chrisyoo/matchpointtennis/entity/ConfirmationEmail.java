package com.chrisyoo.matchpointtennis.entity;

import java.util.HashMap;
import java.util.Map;

import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;

import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import freemarker.template.Configuration;
import freemarker.template.Template;

@Component
public class ConfirmationEmail {

	@Autowired
	private JavaMailSender emailSender;
	
	@Autowired
    private Configuration freemarkerConfig;
	
	public void sendEmail(HttpServletRequest request) throws Exception {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        Map<String, Object> model = addValuesToModel(request);
         
        freemarkerConfig.setClassForTemplateLoading(this.getClass(), "/templates/");
        Template template = freemarkerConfig.getTemplate("order-confirmation.ftl");
        String text = FreeMarkerTemplateUtils.processTemplateIntoString(template, model);
        helper.setTo(request.getHeader("email"));
        helper.setText(text, true);
        helper.setSubject("Order Confirmation - Match Point Tennis");
        
        emailSender.send(message);    
    }
	
	private Map<String, Object> addValuesToModel(HttpServletRequest request) throws Exception {
		JSONParser parser = new JSONParser();
        JSONArray selectedRacquets = (JSONArray) parser.parse(request.getHeader("selectedRacquets"));
		JSONArray selectedShoes = (JSONArray) parser.parse(request.getHeader("selectedShoes"));
		JSONArray selectedApparel = (JSONArray) parser.parse(request.getHeader("selectedApparel"));
		JSONArray selectedItems = (JSONArray) parser.parse(request.getHeader("selectedItems"));
		
		Map<String, Object> model = new HashMap<String, Object>();
		model.put("amount", request.getHeader("amount"));
		model.put("subtotal", request.getHeader("subtotal"));	
        model.put("selectedRacquets", selectedRacquets);
        model.put("selectedShoes", selectedShoes);
        model.put("selectedApparel", selectedApparel);
        model.put("selectedItems", selectedItems);
        model.put("firstName", request.getHeader("firstName"));
        model.put("lastName", request.getHeader("lastName"));
        model.put("email", request.getHeader("email"));
        model.put("phoneNumber", request.getHeader("phoneNumber"));
        model.put("address1", request.getHeader("address1"));
        model.put("address2", request.getHeader("address2"));
        model.put("city", request.getHeader("city"));
        model.put("state", request.getHeader("state"));
        model.put("zipcode", request.getHeader("zipcode"));
        model.put("cardLastFourNumbers", request.getHeader("cardLastFourNumbers"));
        model.put("cardType", request.getHeader("cardType"));
        
        return model;
	}
	
}
