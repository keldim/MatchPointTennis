DROP DATABASE `match-point-tennis`;

CREATE DATABASE `match-point-tennis`;

USE `match-point-tennis`;

CREATE TABLE `openiduser` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `past_order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ordered_at` timestamp DEFAULT NOW(),
  `address1` varchar(200) DEFAULT NULL,
  `address2` varchar(200) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `zipcode` varchar(45) DEFAULT NULL,
  `card_last_four_numbers` varchar(45) DEFAULT NULL,
  `card_type` varchar(45) DEFAULT NULL,
  `openiduser_id` int(11) DEFAULT NULL, 
  PRIMARY KEY (`id`),
  KEY `FK_OPENIDUSER_idx` (`openiduser_id`),
  CONSTRAINT `FK_OPENIDUSER` FOREIGN KEY (`openiduser_id`) 
  REFERENCES `openiduser` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `racquet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `past_order_id` int(11) DEFAULT NULL, 
  `name` varchar(200) DEFAULT NULL,
  `grip_size` varchar(120) DEFAULT NULL,
  `racquet_string` varchar(120) DEFAULT NULL,
  `tension` varchar(45) DEFAULT NULL,
  `price` varchar(45) DEFAULT NULL,
  `quantity` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_PASTORDER_idx` (`past_order_id`),
  CONSTRAINT `FK_PASTORDER_1` FOREIGN KEY (`past_order_id`) 
  REFERENCES `past_order` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `shoe` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `past_order_id` int(11) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  `size` varchar(45) DEFAULT NULL,
  `price` varchar(45) DEFAULT NULL,
  `quantity` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_PASTORDER_idx` (`past_order_id`),
  CONSTRAINT `FK_PASTORDER_2` FOREIGN KEY (`past_order_id`) 
  REFERENCES `past_order` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `apparel_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `past_order_id` int(11) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  `size` varchar(45) DEFAULT NULL,
  `color` varchar(45) DEFAULT NULL,
  `price` varchar(45) DEFAULT NULL,
  `quantity` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_PASTORDER_idx` (`past_order_id`),
  CONSTRAINT `FK_PASTORDER_3` FOREIGN KEY (`past_order_id`) 
  REFERENCES `past_order` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `past_order_id` int(11) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  `price` varchar(45) DEFAULT NULL,
  `quantity` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_PASTORDER_idx` (`past_order_id`),
  CONSTRAINT `FK_PASTORDER_4` FOREIGN KEY (`past_order_id`) 
  REFERENCES `past_order` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
