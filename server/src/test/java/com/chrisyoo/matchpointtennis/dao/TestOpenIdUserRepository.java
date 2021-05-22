package com.chrisyoo.matchpointtennis.dao;

import static org.junit.Assert.assertEquals;

import java.util.Optional;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.AutoConfigureTestEntityManager;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import com.chrisyoo.matchpointtennis.entity.ApparelItem;
import com.chrisyoo.matchpointtennis.entity.Item;
import com.chrisyoo.matchpointtennis.entity.OpenIdUser;
import com.chrisyoo.matchpointtennis.entity.PastOrder;
import com.chrisyoo.matchpointtennis.entity.Racquet;
import com.chrisyoo.matchpointtennis.entity.Shoe;



@RunWith(SpringRunner.class)
@TestPropertySource(
		  locations = "classpath:application-test.properties")
@SpringBootTest
@AutoConfigureTestEntityManager
@Transactional
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class TestOpenIdUserRepository {

	@Autowired
	private TestEntityManager entityManager;
	
	@Autowired
	private OpenIdUserRepository repo;
	
	@Autowired
	private SearchByUsernameImpl searchRepo;
	
	private OpenIdUser openIdUser1;
	private PastOrder pastOrder1;
	
	private OpenIdUser openIdUser2;
	private PastOrder pastOrder2;
	
	private OpenIdUser openIdUser3;
	private PastOrder pastOrder3;
	
	
	
	public TestOpenIdUserRepository() {
		openIdUser1 = new OpenIdUser("supersonicTaco");
		pastOrder1 = new PastOrder();
		pastOrder1.setAddress1("3887  Yorkie Lane");
		openIdUser1.addPastOrder(pastOrder1);
		
		openIdUser2 = new OpenIdUser("cookieMonster");
		pastOrder2 = new PastOrder();
		pastOrder2.setAddress1("1896  Wright Court");
		openIdUser2.addPastOrder(pastOrder2);
		
		openIdUser3 = new OpenIdUser("lightningFast");
		pastOrder3 = new PastOrder();
		pastOrder3.setAddress1("2489  Illinois Avenue");
		openIdUser3.addPastOrder(pastOrder3);
	}

	@Test
	public void should_find_open_id_user_by_username() {
		this.entityManager.persist(openIdUser1);
		this.entityManager.persist(openIdUser2);
		this.entityManager.persist(openIdUser3);
		OpenIdUser openIdUser = searchRepo.findByUsername("cookieMonster");

		assertEquals("cookieMonster", openIdUser.getUsername());
		assertEquals("1896  Wright Court", openIdUser.getPastOrders().get(0).getAddress1());
	}
	
//	only test functionalities that are actually used
	
	@Test
	public void should_store_open_id_user() {
		repo.save(openIdUser1);
		OpenIdUser openIdUser = searchRepo.findByUsername("supersonicTaco");

		assertEquals("supersonicTaco", openIdUser.getUsername());
		assertEquals("3887  Yorkie Lane", openIdUser.getPastOrders().get(0).getAddress1());
	}

}
