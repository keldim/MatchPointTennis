package com.chrisyoo.matchpointtennis.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chrisyoo.matchpointtennis.entity.OpenIdUser;

public interface OpenIdUserRepository extends JpaRepository<OpenIdUser, Integer>, SearchByUsername {

}
