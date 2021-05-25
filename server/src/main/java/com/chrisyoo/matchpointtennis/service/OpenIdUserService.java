package com.chrisyoo.matchpointtennis.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.chrisyoo.matchpointtennis.entity.OpenIdUser;
import com.chrisyoo.matchpointtennis.entity.PastOrder;

public interface OpenIdUserService {
	public List<OpenIdUser> findAll();

	public OpenIdUser findById(int theId);

	public void save(OpenIdUser theOpenIdUser);

	public void deleteById(int theId);
	
	public OpenIdUser findByUsername(String theUsername);
	
	public void addPastOrderToExistingUserOrNewUser(HttpServletRequest request, PastOrder newPastOrder) throws Exception;
}
