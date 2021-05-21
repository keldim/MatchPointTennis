package com.chrisyoo.matchpointtennis;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;

import com.chrisyoo.matchpointtennis.security.ResourceServerConfiguration;

//@Configuration
public class TestConfiguration extends ResourceServerConfiguration {
	@Override
    public void configure(ResourceServerSecurityConfigurer res) {
      res.stateless(false);
    }
}
