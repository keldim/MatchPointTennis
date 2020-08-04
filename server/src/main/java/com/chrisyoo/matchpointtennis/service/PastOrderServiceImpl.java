package com.chrisyoo.matchpointtennis.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import com.chrisyoo.matchpointtennis.dao.PastOrderRepository;
import com.chrisyoo.matchpointtennis.entity.PastOrder;

@Service
public class PastOrderServiceImpl implements PastOrderService {

	private PastOrderRepository pastOrderRepository;

	@Autowired
	public PastOrderServiceImpl(PastOrderRepository thePastOrderRepository) {
		pastOrderRepository = thePastOrderRepository;
	}

	@Override
	public List<PastOrder> findAll() {
		return pastOrderRepository.findAll();
	}

	@Override
	public PastOrder findById(int theId) {
		// "Optional"
		// Different pattern instead of having to check for nulls
		// Feature introduced in Java 8
		Optional<PastOrder> result = pastOrderRepository.findById(theId);

		PastOrder thePastOrder = null;
		if (result.isPresent()) {
			thePastOrder = result.get();
		} else {
			// we didn't find the past order
			throw new RuntimeException("Did not find past order id - " + theId);
		}

		return thePastOrder;
	}

	@Override
	public void save(PastOrder pastOrder) {
		pastOrderRepository.save(pastOrder);
	}

	@Override
	public void deleteById(int theId) {
		pastOrderRepository.deleteById(theId);
	}

	// @Query(value = "select * from past_orders")
	// List<Object[]> findAllPastOrder();

}
