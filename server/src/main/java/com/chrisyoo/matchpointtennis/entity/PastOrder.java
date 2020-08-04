package com.chrisyoo.matchpointtennis.entity;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="past_order")
public class PastOrder {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private int id;
	
	@Column(name="ordered_at")
	private Timestamp ordered_at;
	
	// add address1, address2, city, state, zipcode, cardLastFourNumbers, cardType
	@Column(name="address1")
	private String address1;
	
	@Column(name="address2")
	private String address2;
	
	@Column(name="city")
	private String city;
	
	@Column(name="state")
	private String state;
	
	@Column(name="zipcode")
	private String zipcode;
	
	@Column(name="card_last_four_numbers")
	private String cardLastFourNumbers;
	
	@Column(name="card_type")
	private String cardType;
	
//	@ManyToOne(cascade={CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
//	@JoinColumn(name="openiduser_id")
//	@JsonIgnoreProperties("pastOrders")
//	private OpenIdUser openIdUser;
	
//	mappedBy="pastOrder", 
	@OneToMany(cascade=CascadeType.ALL)
	@JoinColumn(name="past_order_id")
	private List<Racquet> racquets;
	
//	mappedBy="past_orders", 
	@OneToMany(cascade=CascadeType.ALL)
	@JoinColumn(name="past_order_id")
	private List<Shoe> shoes;
	
//	mappedBy="past_orders", 
	@OneToMany(cascade=CascadeType.ALL)
	@JoinColumn(name="past_order_id")
	private List<ApparelItem> apparel;
	
//	mappedBy="past_orders", 
	@OneToMany(cascade=CascadeType.ALL)
	@JoinColumn(name="past_order_id")
	private List<Item> items;		
	
	public PastOrder() {
		
	}

	public PastOrder(Timestamp ordered_at, String address1, String address2, String city, String state, String zipcode,
			String cardLastFourNumbers, String cardType) {
		this.ordered_at = ordered_at;
		this.address1 = address1;
		this.address2 = address2;
		this.city = city;
		this.state = state;
		this.zipcode = zipcode;
		this.cardLastFourNumbers = cardLastFourNumbers;
		this.cardType = cardType;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Timestamp getOrdered_at() {
		return ordered_at;
	}

	public void setOrdered_at(Timestamp ordered_at) {
		this.ordered_at = ordered_at;
	}

	public String getAddress1() {
		return address1;
	}

	public void setAddress1(String address1) {
		this.address1 = address1;
	}

	public String getAddress2() {
		return address2;
	}

	public void setAddress2(String address2) {
		this.address2 = address2;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getZipcode() {
		return zipcode;
	}

	public void setZipcode(String zipcode) {
		this.zipcode = zipcode;
	}

	public String getCardLastFourNumbers() {
		return cardLastFourNumbers;
	}

	public void setCardLastFourNumbers(String cardLastFourNumbers) {
		this.cardLastFourNumbers = cardLastFourNumbers;
	}

	public String getCardType() {
		return cardType;
	}

	public void setCardType(String cardType) {
		this.cardType = cardType;
	}

	public List<Racquet> getRacquets() {
		return racquets;
	}

	public void setRacquets(List<Racquet> racquets) {
		this.racquets = racquets;
	}
	
	public void addRacquet(Racquet racquet) {

		if (racquets == null) {
			racquets = new ArrayList<>();
		}

		racquets.add(racquet);
//		pizza.setPastOrder(this);
	}
	
	public List<Shoe> getShoes() {
		return shoes;
	}

	public void setShoes(List<Shoe> shoes) {
		this.shoes = shoes;
	}
	
	public void addShoe(Shoe shoe) {

		if (shoes == null) {
			shoes = new ArrayList<>();
		}

		shoes.add(shoe);
//		pizza.setPastOrder(this);
	}

	public List<ApparelItem> getApparel() {
		return apparel;
	}

	public void setApparel(List<ApparelItem> apparel) {
		this.apparel = apparel;
	}

	public void addApparelItem(ApparelItem apparelItem) {

		if (apparel == null) {
			apparel = new ArrayList<>();
		}

		apparel.add(apparelItem);
//		pizza.setPastOrder(this);
	}
	
	public List<Item> getItems() {
		return items;
	}

	public void setItems(List<Item> items) {
		this.items = items;
	}

	public void addItem(Item item) {

		if (items == null) {
			items = new ArrayList<>();
		}

		items.add(item);
//		pizza.setPastOrder(this);
	}
	
}
