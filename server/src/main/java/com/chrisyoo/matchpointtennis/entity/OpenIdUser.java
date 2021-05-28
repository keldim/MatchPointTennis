package com.chrisyoo.matchpointtennis.entity;

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
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "openiduser")
public class OpenIdUser {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;

	@Column(name = "username")
	private String username;
 
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name="openiduser_id")
	private List<PastOrder> pastOrders;

	public OpenIdUser() {

	}

	public OpenIdUser(String username) {
		this.username = username;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public List<PastOrder> getPastOrders() {
		return pastOrders;
	}

	public void setPastOrders(List<PastOrder> pastOrders) {
		this.pastOrders = pastOrders;
	}

	public void addPastOrder(PastOrder pastOrder) {

		if (pastOrders == null) {
			pastOrders = new ArrayList<>();
		}

		pastOrders.add(pastOrder);

	}

}
