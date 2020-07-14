package com.chrisyoo.matchpointtennis.service;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chrisyoo.matchpointtennis.dao.OpenIdUserRepository;
import com.chrisyoo.matchpointtennis.entity.OpenIdUser;

@Service
public class OpenIdUserServiceImpl implements OpenIdUserService {

private OpenIdUserRepository openIdUserRepository;

	@Autowired
	public OpenIdUserServiceImpl(OpenIdUserRepository theOpenIdUserRepository) {
		openIdUserRepository = theOpenIdUserRepository;
	}
	
	@Override
	public List<OpenIdUser> findAll() {
		return openIdUserRepository.findAll();
	}

	@Override
	public OpenIdUser findById(int theId) {
		Optional<OpenIdUser> result = openIdUserRepository.findById(theId);

		OpenIdUser theOpenIdUser = null;
		if (result.isPresent()) {
			theOpenIdUser = result.get();
		} else {
			throw new RuntimeException("Did not find openIdUser id - " + theId);
		}

		return theOpenIdUser;	
	}

	@Override
	public void save(OpenIdUser theOpenIdUser) {
		openIdUserRepository.save(theOpenIdUser);
	}

	@Override
	public void deleteById(int theId) {
		openIdUserRepository.deleteById(theId);
	}
	
	@Override
	public OpenIdUser findByUsername(String theUsername) {
		return openIdUserRepository.findByUsername(theUsername);
	}

}
