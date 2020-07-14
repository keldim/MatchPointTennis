package com.chrisyoo.matchpointtennis.dao;

import com.chrisyoo.matchpointtennis.entity.OpenIdUser;

public interface SearchByUsername {
	public OpenIdUser findByUsername(String theUsername);
}
