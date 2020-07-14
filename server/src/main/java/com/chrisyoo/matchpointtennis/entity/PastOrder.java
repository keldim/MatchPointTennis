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
	
	@Column(name="location")
	private String location;
	
//	@ManyToOne(cascade={CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
//	@JoinColumn(name="openiduser_id")
//	@JsonIgnoreProperties("pastOrders")
//	private OpenIdUser openIdUser;
	
//	mappedBy="pastOrder", 
	@OneToMany(cascade=CascadeType.ALL)
	@JoinColumn(name="past_order_id")
	private List<Pizza> PizzaItems;
	
//	mappedBy="past_orders", 
	@OneToMany(cascade=CascadeType.ALL)
	@JoinColumn(name="past_order_id")
	private List<Salad> SaladItems;
	
//	mappedBy="past_orders", 
	@OneToMany(cascade=CascadeType.ALL)
	@JoinColumn(name="past_order_id")
	private List<Drink> DrinkItems;
	
//	mappedBy="past_orders", 
	@OneToMany(cascade=CascadeType.ALL)
	@JoinColumn(name="past_order_id")
	private List<Dessert> DessertItems;		
	
	public PastOrder() {
		
	}

	public PastOrder(Timestamp ordered_at, String location) {
		this.ordered_at = ordered_at;
		this.location = location;
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
	
//	public OpenIdUser getOpenIdUser() {
//		return openIdUser;
//	}
//
//	public void setOpenIdUser(OpenIdUser openIdUser) {
//		this.openIdUser = openIdUser;
//	}

	public List<Pizza> getPizzaItems() {
		return PizzaItems;
	}

	public void setPizzaItems(List<Pizza> pizzaItems) {
		PizzaItems = pizzaItems;
	}
	
	public void addPizza(Pizza pizza) {

		if (PizzaItems == null) {
			PizzaItems = new ArrayList<>();
		}

		PizzaItems.add(pizza);
//		pizza.setPastOrder(this);
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}
	
	public List<Salad> getSaladItems() {
		return SaladItems;
	}

	public void setSaladItems(List<Salad> saladItems) {
		SaladItems = saladItems;
	}
	
	public void addSalad(Salad salad) {

		if (SaladItems == null) {
			SaladItems = new ArrayList<>();
		}

		SaladItems.add(salad);
//		pizza.setPastOrder(this);
	}

	public List<Drink> getDrinkItems() {
		return DrinkItems;
	}

	public void setDrinkItems(List<Drink> drinkItems) {
		DrinkItems = drinkItems;
	}

	public void addDrink(Drink drink) {

		if (DrinkItems == null) {
			DrinkItems = new ArrayList<>();
		}

		DrinkItems.add(drink);
//		pizza.setPastOrder(this);
	}
	
	public List<Dessert> getDessertItems() {
		return DessertItems;
	}

	public void setDessertItems(List<Dessert> dessertItems) {
		DessertItems = dessertItems;
	}

	public void addDessert(Dessert dessert) {

		if (DessertItems == null) {
			DessertItems = new ArrayList<>();
		}

		DessertItems.add(dessert);
//		pizza.setPastOrder(this);
	}
	
}
