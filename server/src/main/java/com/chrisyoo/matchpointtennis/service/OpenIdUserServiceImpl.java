package com.chrisyoo.matchpointtennis.service;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.codec.binary.Base64;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chrisyoo.matchpointtennis.dao.OpenIdUserRepository;
import com.chrisyoo.matchpointtennis.entity.OpenIdUser;
import com.chrisyoo.matchpointtennis.entity.PastOrder;

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

	@Override
	public void addPastOrderToExistingUserOrNewUser(HttpServletRequest request, PastOrder newPastOrder) throws Exception {
		String[] pre_split_string = request.getHeader("Authorization").split(" ");
		String[] split_string = pre_split_string[1].split("\\.");
		String base64EncodedBody = split_string[1];
		Base64 base64Url = new Base64(true);
		String body = new String(base64Url.decode(base64EncodedBody));
		JSONParser parser = new JSONParser();
		JSONObject openId = (JSONObject) parser.parse(body);
		
		// what if there are no users at all?
		OpenIdUser existingUser = openIdUserRepository.findByUsername((String) openId.get("sub"));
		if (existingUser == null) {
			OpenIdUser newOpenIdUser = new OpenIdUser((String) openId.get("sub"));
			openIdUserRepository.save(newOpenIdUser);
			newOpenIdUser.addPastOrder(newPastOrder);
		} else {
			existingUser.addPastOrder(newPastOrder);
		}
	}
}
