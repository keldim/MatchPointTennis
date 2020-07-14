package com.chrisyoo.matchpointtennis.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.chrisyoo.matchpointtennis.entity.PastOrder;

public interface PastOrderRepository extends JpaRepository<PastOrder, Integer>{
	
}
