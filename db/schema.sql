CREATE DATABASE lazy_shopper_db;

USE lazy_shopper_db;

CREATE TABLE customer (
id INTEGER NOT NULL AUTO_INCREMENT,
user_name VARCHAR(100) NOT NULL,
user_email VARCHAR(50) NOT NULL,
password VARCHAR(15) NOT NULL,
PRIMARY KEY (id)
);