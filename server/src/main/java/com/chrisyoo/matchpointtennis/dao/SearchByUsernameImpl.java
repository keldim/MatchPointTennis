package com.chrisyoo.matchpointtennis.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import com.chrisyoo.matchpointtennis.entity.OpenIdUser;

public class SearchByUsernameImpl implements SearchByUsername {

	private EntityManager entityManager;
	
	public SearchByUsernameImpl(EntityManager theEntityManager) {
		entityManager = theEntityManager;
	}

	public OpenIdUser findByUsername(String theUsername) {
		Query theQuery = entityManager.createQuery("SELECT u FROM OpenIdUser u WHERE u.username = :username");
		theQuery.setParameter("username", theUsername);
		List<OpenIdUser> result = theQuery.getResultList();
		
		if(result.size() == 0) {
			return null;
		} else {
			return result.get(0);
		}
		
	}
	
}
