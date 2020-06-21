package com.chrisyoo.matchpointtennis;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;

@EnableResourceServer
@SpringBootApplication
public class MatchpointtennisApplication {

	public static void main(String[] args) {
		SpringApplication.run(MatchpointtennisApplication.class, args);
	}

}
