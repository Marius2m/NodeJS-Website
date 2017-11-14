#================================================
# api database schema
#================================================

#ignore foreign key constraints
SET FOREIGN_KEY_CHECKS=0;
SET time_zone='+00:00';

#== database ========================================

DROP DATABASE IF EXISTS `WAD`;
CREATE DATABASE `WAD` CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `WAD`;


#== user ========================================

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
	`id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`first_name` VARCHAR(64) NOT NULL,
	`last_name` VARCHAR(64) NOT NULL,
	`email` VARCHAR(128) NOT NULL,
	`password` VARCHAR(64) NOT NULL,
	`dob` DATE NULL, 
	`phone` VARCHAR(20),
	`gender` ENUM('male', 'female', 'other') DEFAULT NULL,
	`joined_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB;


#== staff ========================================

DROP TABLE IF EXISTS `staff`;
CREATE TABLE `staff` (
	`id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`first_name` VARCHAR(64) NOT NULL,
	`last_name` VARCHAR(64) NOT NULL,
	`email` VARCHAR(128) NOT NULL,
	`password` VARCHAR(64) NOT NULL,
	`dob` DATE,
	`phone` VARCHAR(20) DEFAULT '',
	`gender` ENUM('male', 'female', 'other'),
	`description` TEXT DEFAULT '',
	`position` VARCHAR(128) DEFAULT '',
	`is_doctor` BOOLEAN DEFAULT 0,
	`is_assistent` BOOLEAN DEFAULT 0,
	`is_admin` BOOLEAN DEFAULT 0,
	`joined_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB;



#== appointment ========================================

DROP TABLE IF EXISTS `appointment`;
CREATE TABLE `appointment` (
	`id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`doctor_id` INT(11) UNSIGNED NOT NULL,
	`user_id` INT(11) UNSIGNED NOT NULL,
	`description` TEXT,
	`location` VARCHAR(200),
	`appointment_creation` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`appointment_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB;


#== insert staff data ===============================

INSERT INTO `staff` (`first_name`, `last_name`, `email`, `password`, `dob`, `phone`, `gender`, `description`, `position`, `is_doctor`, `is_assistent`)
VALUES ('Andrdeea', 'Lazarovici', 'andreea.lazarovici@wad.net', 'Wooltern1', '1982-02-10', '0723452900', 'female', 'This place is for my job description or things I wanna share.', 'Orthodontist', 1, 0),
('Ela', 'Jurcuta', 'ela.jurcuta@wad.net', 'Wooltern1', '1990-02-10', '0723452901', 'female', 'This place is for my job description or things I wanna share.', 'Surgeon', 1, 0),
('Luiza', 'Cotuna', 'luiza.cotuna@wad.net', 'Wooltern1', '1994-03-10', '0723452902', 'female', 'This place is for my job description or things I wanna share.', 'Dental Aesthetics', 1, 0),
('Claudiu', 'Anghel', 'claudiu.anghel@wad.net', 'Wooltern1', '1984-03-10', '0723452903', 'male', 'This place is for my job description or things I wanna share.', 'Orthodontist', 1, 0),
('Stefan', 'Alion', 'claudiu.anghel@wad.net', 'Wooltern1', '1974-03-10', '0723452931', 'male', 'This place is for my job description or things I wanna share.', 'Pedodontics', 1, 0),
('Ramona', 'Constantin', 'ramona.constantin@wad.net', 'Wooltern1', '1988-03-10', '0723452511', 'female', 'This place is for my job description or things I wanna share.', 'Assistant', 0, 1),
('Darius', 'Chineu', 'darius.chineu@wad.net', 'Wooltern1', '1997-03-10', '0746452511', 'male', 'This place is for my job description or things I wanna share.', 'Assistant', 0, 1),
('Mihai', 'Hosu', 'mihai.hosu@wad.net', 'Wooltern1', '1995-06-12', '0746452511', 'male', 'This place is for my job description or things I wanna share.', 'Assistant', 0, 1),
('Mihai', 'Bratu', 'mihai.bratu@wad.net', 'Wooltern1', '1993-06-12', '0746452511', 'male', 'This place is for my job description or things I wanna share.', 'Assistant', 0, 1);


#== insert admin data ===============================

INSERT INTO `staff` (`first_name`, `last_name`, `email`, `password`, `dob`, `phone`, `gender`, `is_admin`)
VALUES ('Toma', 'Cotuna', 'toma.cotuna@wad.net', 'portocale', '1996-05-10', '07464951436','male', 1),
('Marius', 'Mircea', 'marius.mircea@wad.com', 'portocale', '1995-11-24', '0723452901', 'male', 1);


#== insert user data ===============================

INSERT INTO `user` (`first_name`, `last_name`, `email`, `password`, `dob`, `phone`, `gender`)
VALUES ('Toma', 'Cotuna', 'tomacotunai@gmail.com', 'portocale', '1996-05-10', '07464951437', 'male'),
('Marius', 'Mircea', 'mariusmircea@outlook.com', 'portocale', '1995-11-24', '0723452901', 'male');


