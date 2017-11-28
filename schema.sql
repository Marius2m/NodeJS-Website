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


#== pages_pictures ==============================
DROP TABLE IF EXISTS `pages_pictures`;
CREATE TABLE `pages_pictures`(
	`id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `home` VARCHAR(64)   DEFAULT 'home',
    `services` VARCHAR(64)  DEFAULT 'services',
    `team` VARCHAR(64)  DEFAULT 'team',
    `account` VARCHAR(64)  DEFAULT 'account',
    `contact` VARCHAR(64)  DEFAULT 'contact',
    PRIMARY KEY(`id`)
);

INSERT INTO `pages_pictures` (`home`, `services`, `team`, `account`, `contact`)
VALUES (

);

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
	`description` VARCHAR(500) DEFAULT '',
	`position` VARCHAR(128) DEFAULT '',
	`is_doctor` BOOLEAN DEFAULT 0,
	`is_assistent` BOOLEAN DEFAULT 0,
	`is_admin` BOOLEAN DEFAULT 0,
	`joined_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB;

SELECT * FROM `staff`;

#== appointment ========================================

DROP TABLE IF EXISTS `appointment`;
CREATE TABLE `appointment` (
	`id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`doctor_id` INT(11) UNSIGNED NOT NULL,
    `doctor_name` VARCHAR(100) NOT NULL,
	`user_id` INT(11) UNSIGNED NOT NULL,
	`description` TEXT,
    `when` TIMESTAMP NOT NULL,
	`created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `is_cancelled` BOOLEAN DEFAULT 0,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB;

SELECT * FROM `appointment`; 
INSERT INTO `appointment` (`doctor_id`, `doctor_name`, `user_id`, `description`, `when`)
VALUES (
'12',
'Eugenie',
'4',
"Ma duc la ne",
"2019.10.12");




#== insert staff data ===============================

INSERT INTO `staff` (`first_name`, `last_name`, `email`, `password`, `dob`, `phone`, `gender`, `description`, `position`, `is_doctor`, `is_assistent`)
VALUES 
('Ela', 'Jurcuta', 'ela.jurcuta@wad.net', 'Wooltern1', '1990-02-10', '0723452901', 'female', 'This place is for my job description or things I wanna share.', 'Surgeon', 1, 0),
('Luiza', 'Cotuna', 'luiza.cotuna@wad.net', 'Wooltern1', '1994-03-10', '0723452902', 'female', 'This place is for my job description or things I wanna share.', 'Dental Aesthetics', 1, 0),
('Claudiu', 'Anghel', 'claudiu.anghel@wad.net', 'Wooltern1', '1984-03-10', '0723452903', 'male', 'This place is for my job description or things I wanna share.', 'Orthodontist', 1, 0),
('Stefan', 'Alion', 'claudiu.anghel@wad.net', 'Wooltern1', '1974-03-10', '0723452931', 'male', 'This place is for my job description or things I wanna share.', 'Pedodontics', 1, 0),
('Ramona', 'Constantin', 'ramona.constantin@wad.net', 'Wooltern1', '1988-03-10', '0723452511', 'female', 'This place is for my job description or things I wanna share.', 'Assistant', 0, 1),
('Mihai', 'Bratu', 'mihai.bratu@wad.net', 'Wooltern1', '1993-06-12', '0746452511', 'male', 'This place is for my job description or things I wanna share.', 'Assistant', 0, 1);


#== insert admin data ===============================

INSERT INTO `staff` (`first_name`, `last_name`, `email`, `password`, `dob`, `phone`, `gender`, `is_admin`)
VALUES ('Toma', 'Cotuna', 'toma.cotuna@wad.net', 'portocale', '1996-05-10', '07464951436','male', 1),
('Marius', 'Mircea', 'marius.mircea@wad.com', 'portocale', '1995-11-24', '0723452901', 'male', 1);


#== insert user data ===============================

INSERT INTO `user` (`first_name`, `last_name`, `email`, `password`, `dob`, `phone`, `gender`)
VALUES ('Toma', 'Cotuna', 'tomacotunai@gmail.com', 'portocale', '1996-05-10', '07464951437', 'male'),
('Marius', 'Mircea', 'mariusmircea@outlook.com', 'portocale', '1995-11-24', '0723452901', 'male');


SELECT * from WAD.staff;

UPdate WAD.staff set is_doctor=1 WHERE id=11;

#== insert homepage data ===============================

DROP TABLE IF EXISTS `homepage`;
CREATE TABLE `homepage` (
	`id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`description` VARCHAR(64) NOT NULL,
    `descriptionTitle` VARCHAR(64) NOT NULL,
	`firstSection` VARCHAR(2048) NOT NULL,
	`firstSectionDescription` VARCHAR(2048) NOT NULL,
	`secondSectionTitle` VARCHAR(2048) NOT NULL,
	`secondSectionDescription` VARCHAR(2048),
	`thirdSectionTitle` VARCHAR(2048) NOT NULL,
	`homepageQuote` VARCHAR(2048) NOT NULL,
    `pic_1` int,
	`pic_2` int,    
    `pic_3` int,
	`pic_4` int,    
    `pic_5` int,
	`pic_6` int,    
    `pic_7` int,
	`pic_8` int,    
    `pic_9` int,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB;

INSERT INTO `homepage` VALUES (
'1',
"Welcome to Dent Glow!", 
"Professional Dental Clinic",
"Our mission",
"Some data to come Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
"Check our services",
"",
"Gallery of our clinic!",
"Life is short, so smile while you still have teeth! :)"
); 

INSERT INTO `homepage` (`description`, `descriptionTitle`, `firstSection`, `firstSectionDescription`, `secondSectionTitle`, `thirdSectionTitle`, `homepageQuote`,
`pic_1`,`pic_2`,`pic_3`,`pic_4`,`pic_5`,`pic_6`)
VALUES (
"Welcome to Dent Glow!", 
"Professional Dental Clinic",
"Our mission",
"Some data to come Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
"Check our services",
"Gallery of our clinic!",
"Life is short, so smile while you still have teeth! :)",
1,
2,
3,
4,
5,
6
); 

UPDATE `homepage`
SET `secondSectionDescription`=''
WHERE id=1;

#== insert contactpage data ===============================

DROP TABLE IF EXISTS `contactpage`;
CREATE TABLE `contactpage` (
	`id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `descriptionTitle` VARCHAR(64) NOT NULL,
	`firstSectionTitle` VARCHAR(64) NOT NULL,
	`adress` VARCHAR(64) NOT NULL,
	`Monday` VARCHAR(64) NOT NULL,
	`Tuesday` VARCHAR(64) NOT NULL,
	`Wednesday` VARCHAR(64) NOT NULL,
	`Thursday` VARCHAR(64) NOT NULL,
    `Friday` VARCHAR(64) NOT NULL,
	`Saturday` VARCHAR(64) NOT NULL,
	`Sunday` VARCHAR(64) NOT NULL,
	`email` VARCHAR(64) NOT NULL,
    `mobile` VARCHAR(64) NOT NULL,
	`landline` VARCHAR(64) NOT NULL,
	`homepageQuote` VARCHAR(64) NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB;

INSERT INTO `contactpage` VALUES (
'1',
"Do you have a question for us?",
"Contact information!",
"Timisoara, Emanuil Gojdu, nr. 10, Romania",
"Luni      09:00 - 15:00",
"Marti     09:00 - 16:30",
"Miercuri  12:00 - 18:30",
"Joi       09:00 - 16:00",
"Vineri    10:00 - 14:00",
"",
"",
"contact@dentglow.ro",
"0799520378",
"0256 324 541",
"Brighten someone's day with your smile!"
); 


#== insert footer data ===============================

DROP TABLE IF EXISTS `footerpage`;
CREATE TABLE `footerpage` (
	`id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`bio_paragraph_1` TEXT,
    `bio_paragraph_2` TEXT,
	`Monday` VARCHAR(64) NOT NULL,
	`Tuesday` VARCHAR(64) NOT NULL,
	`Wednesday` VARCHAR(64) NOT NULL,
	`Thursday` VARCHAR(64) NOT NULL,
    `Friday` VARCHAR(64) NOT NULL,
	`Saturday` VARCHAR(64) ,
	`Sunday` VARCHAR(64),
	`adress` VARCHAR(64) NOT NULL,
	`email` VARCHAR(64) NOT NULL,
    `mobile` VARCHAR(64) NOT NULL,
    `facebook_link` VARCHAR(64) NOT NULL,
    `instagram_link` VARCHAR(64),
	PRIMARY KEY (`id`)
) ENGINE=InnoDB;

SELECT * FROM `footerpage`;

INSERT INTO `footerpage` (`bio_paragraph_1`, `Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `adress`, `email`, `mobile`, `facebook_link`) 
VALUES (
"We are a new and professional dental clinic ready to brigthen your smile!",
"Luni      09:00 - 15:00",
"Marti     09:00 - 16:30",
"Miercuri  12:00 - 18:30",
"Joi       09:00 - 16:00",
"Vineri    10:00 - 14:00",
"Timisoara, Emanuil Gojdu, nr. 10, Romania",
"contact@dentglow.ro",
"0799520378",
"facebook.com/glowdent"
); 

#=============================================================
#== SERVICES =================================================
#=============================================================
DROP TABLE IF EXISTS `servicesT`;
CREATE TABLE `servicesT` (
	`id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `post_id` INT NOT NULL,
    `picture_id` INT,
    `text_area` text,
    `youtube_link` text,
    `prices_id` INT NOT NULL,
    `title` text NOT NULL,
    `t1` text,
	`t2` text,
    `t3` text,
    `t4` text,
	`t5` text,
    `t6` text,
    `t7` text,
    `t8` text,
    `p1` text,
    `p2` text,
    `p3` text,
    `p4` text,
    `p5` text,
    `p6` text,
    `p7` text,
    `p8` text,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`post_id`) REFERENCES `postT`(`post_id`),
    FOREIGN KEY (`prices_id`) REFERENCES `pricesT`(`prices_id`)
) ENGINE=InnoDB;

DROP TABLE IF EXISTS `postT`;
CREATE TABLE  `postT`(
	`id` INT NOT NULL AUTO_INCREMENT,
    `title` text,
    `picture_id` text,
    `text_area` text,
    `youtube_link` text,
	PRIMARY KEY(`id`)
) ENGINE=InnoDB;
INSERT INTO `postT`(`title`, `picture_id`, `youtube_link`, `text_area`) 
	VALUES ('orthodontics', '1', "https://www.youtube.com/v/09yk0ktMZfQ", "This is free text. Add your own!");
INSERT INTO `postT`(`title`, `picture_id`, `text_area`) 
	VALUES ('implantology', '1', "More stuff you can read here: check this out...");
SELECT * FROM `postT`;

DROP TABLE IF EXISTS `pricesT`;
CREATE TABLE `pricesT`(
	`id` INT NOT NULL AUTO_INCREMENT,
    `title` text NOT NULL,
    `t1` text,
    `t2` text,
    `t3` text,
    `t4` text,
	`t5` text,
    `t6` text,
    `t7` text,
    `t8` text,
    `p1` text,
    `p2` text,
    `p3` text,
    `p4` text,
    `p5` text,
    `p6` text,
    `p7` text,
    `p8` text,
    PRIMARY KEY(`id`)
);









