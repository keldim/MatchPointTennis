package com.chrisyoo.matchpointtennis.dao;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

import java.sql.Timestamp;
import java.util.Optional;

import org.junit.After;
import org.junit.Test;
import org.junit.jupiter.api.AfterEach;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityFilterAutoConfiguration;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.AutoConfigureTestEntityManager;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import com.chrisyoo.matchpointtennis.MatchpointtennisApplication;
import com.chrisyoo.matchpointtennis.entity.ApparelItem;
import com.chrisyoo.matchpointtennis.entity.Item;
import com.chrisyoo.matchpointtennis.entity.PastOrder;
import com.chrisyoo.matchpointtennis.entity.Racquet;
import com.chrisyoo.matchpointtennis.entity.Shoe;
import com.chrisyoo.matchpointtennis.security.CorsConfig;
import com.chrisyoo.matchpointtennis.security.ResourceServerConfiguration;

@RunWith(SpringRunner.class)
@TestPropertySource(
		  locations = "classpath:application-test.properties")
@SpringBootTest
@AutoConfigureTestEntityManager
@Transactional
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class TestPastOrderRepository {
	@Autowired
	private TestEntityManager entityManager;
	
	@Autowired
	private PastOrderRepository repo;
	
	
	private PastOrder pastOrder1;
	private Racquet racquet1;
	private Shoe shoe1;
	private ApparelItem apparelItem1;
	private Item item1;
	
	private PastOrder pastOrder2;
	private Racquet racquet2;
	private Shoe shoe2;
	private ApparelItem apparelItem2;
	private Item item2;
	
	
	private PastOrder pastOrder3;
	private Racquet racquet3;
	private Shoe shoe3;
	private ApparelItem apparelItem3;
	private Item item3;

	public TestPastOrderRepository() {

		pastOrder1 = new PastOrder();
		pastOrder1.setAddress1("3887  Yorkie Lane");
		racquet1 = new Racquet();
		racquet1.setName("Babolat Pure Drive");
		pastOrder1.addRacquet(racquet1);
		shoe1 = new Shoe();
		shoe1.setName("Nike Vapor");
		pastOrder1.addShoe(shoe1);
		apparelItem1 = new ApparelItem();
		apparelItem1.setName("Nike Blood Orange Shirt");
		pastOrder1.addApparelItem(apparelItem1);
		item1 = new Item();
		item1.setName("Wilson Ball Can");
		pastOrder1.addItem(item1);
		
		pastOrder2 = new PastOrder();
		pastOrder2.setAddress1("1896  Wright Court");
		racquet2 = new Racquet();
		racquet2.setName("Head Extreme");
		pastOrder2.addRacquet(racquet2);
		shoe2 = new Shoe();
		shoe2.setName("Adidas Barricade");
		pastOrder2.addShoe(shoe2);
		apparelItem2 = new ApparelItem();
		apparelItem2.setName("Adidas Forest Green Shirt");
		pastOrder2.addApparelItem(apparelItem2);
		item2 = new Item();
		item2.setName("Penn Ball Can");
		pastOrder2.addItem(item2);
		
		
		pastOrder3 = new PastOrder();
		pastOrder3.setAddress1("2489  Illinois Avenue");
		racquet3 = new Racquet();
		racquet3.setName("Wilson Prostaff");
		pastOrder3.addRacquet(racquet3);
		shoe3 = new Shoe();
		shoe3.setName("Prince Textreme");
		pastOrder3.addShoe(shoe3);
		apparelItem3 = new ApparelItem();
		apparelItem3.setName("Prince Yellow Shirt");
		pastOrder3.addApparelItem(apparelItem3);
		item3 = new Item();
		item3.setName("Kimony Overgrip");
		pastOrder3.addItem(item3);
		
		
	}

//	@Test
//	public void testFindAll() {
//		this.entityManager.persist(pastOrder1);
//		Iterable<PastOrder> pastOrders = repo.findAll();
//
//		int count = 0;
//		for (PastOrder pastOrder : pastOrders) {
//			assertEquals("3887  Yorkie Lane", pastOrder.getAddress1());
//			assertEquals("Babolat Pure Drive", pastOrder.getRacquets().get(0).getName());
//			assertEquals("Nike Vapor", pastOrder.getShoes().get(0).getName());
//			assertEquals("Nike Blood Orange Shirt", pastOrder.getApparel().get(0).getName());
//			assertEquals("Wilson Ball Can", pastOrder.getItems().get(0).getName());
//			count++;
//		}
//		assertEquals(1, count);
//	}

	@Test
	public void should_find_past_order_by_id() {
		this.entityManager.persist(pastOrder1);
		this.entityManager.persist(pastOrder2);
		this.entityManager.persist(pastOrder3);
		Optional<PastOrder> pastOrder = repo.findById(2);

		assertEquals(2, pastOrder.get().getId());
		assertEquals("1896  Wright Court", pastOrder.get().getAddress1());
		assertEquals("Head Extreme", pastOrder.get().getRacquets().get(0).getName());
		assertEquals("Adidas Barricade", pastOrder.get().getShoes().get(0).getName());
		assertEquals("Adidas Forest Green Shirt", pastOrder.get().getApparel().get(0).getName());
		assertEquals("Penn Ball Can", pastOrder.get().getItems().get(0).getName());
	}
	
	@Test
	public void should_store_past_order() {
		repo.save(pastOrder1);
		Optional<PastOrder> savedItem = repo.findById(1);

		assertEquals("3887  Yorkie Lane", savedItem.get().getAddress1());
		assertEquals("Babolat Pure Drive", savedItem.get().getRacquets().get(0).getName());
		assertEquals("Nike Vapor", savedItem.get().getShoes().get(0).getName());
		assertEquals("Nike Blood Orange Shirt", savedItem.get().getApparel().get(0).getName());
		assertEquals("Wilson Ball Can", savedItem.get().getItems().get(0).getName());
	}
}
