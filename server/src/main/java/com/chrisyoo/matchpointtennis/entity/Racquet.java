package com.chrisyoo.matchpointtennis.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="racquet")
public class Racquet {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private int id;
	
	@Column(name="name")
	private String name;
	
	@Column(name="grip_size")
	private String gripSize;
	
	@Column(name="racquet_string")
	private String racquetString;
	
	@Column(name="tension")
	private String tension;
	
	@Column(name="price")
	private String price;
	
	@Column(name="quantity")
	private String quantity;
	

	public Racquet() {
	
	}

	public Racquet(String name, String gripSize, String racquetString, String tension, String price, String quantity) {
		this.name = name;
		this.gripSize = gripSize;
		this.racquetString = racquetString;
		this.tension = tension;
		this.price = price;
		this.quantity = quantity;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getGripSize() {
		return gripSize;
	}

	public void setGripSize(String gripSize) {
		this.gripSize = gripSize;
	}

	public String getRacquetString() {
		return racquetString;
	}

	public void setRacquetString(String racquetString) {
		this.racquetString = racquetString;
	}

	public String getTension() {
		return tension;
	}

	public void setTension(String tension) {
		this.tension = tension;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getQuantity() {
		return quantity;
	}

	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}
}
