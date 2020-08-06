package com.chrisyoo.matchpointtennis.entity;


import java.util.HashMap;
import java.util.Map;
import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import com.stripe.Stripe;
import com.stripe.model.Charge;


@Component
public class StripeClient {
	
	@Value("${stripe.secret-key}")
    private String secretKey;
 
    @PostConstruct
    public void init() {
        Stripe.apiKey = secretKey;
    } 
    
    public Charge chargeCreditCard(String token, double amount, HttpServletRequest request) throws Exception {
        Map<String, Object> chargeParams = new HashMap<String, Object>();
        chargeParams.put("amount", (int)(amount * 100));
        chargeParams.put("currency", "USD");
        chargeParams.put("source", token);
        Charge charge = Charge.create(chargeParams);
       
        return charge;
    }
    
}
