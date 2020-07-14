package com.chrisyoo.matchpointtennis.service;

import java.util.List;

import com.chrisyoo.matchpointtennis.entity.OpenIdUser;

public interface OpenIdUserService {
	public List<OpenIdUser> findAll();

	public OpenIdUser findById(int theId);

	public void save(OpenIdUser theOpenIdUser);

	public void deleteById(int theId);
	
	public OpenIdUser findByUsername(String theUsername);
}
