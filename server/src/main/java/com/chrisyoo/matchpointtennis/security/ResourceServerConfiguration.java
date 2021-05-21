package com.chrisyoo.matchpointtennis.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;

@Configuration
@EnableResourceServer
public class ResourceServerConfiguration extends ResourceServerConfigurerAdapter {
	
    public ResourceServerConfiguration() {
        super();
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
         http
            .antMatcher("/registered-user/**")
            .authorizeRequests()
            .anyRequest().authenticated();
    }
    
}