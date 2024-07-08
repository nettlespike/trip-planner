DROP DATABASE IF EXISTS `trip_data`;
CREATE DATABASE `trip_data`; 
USE `trip_data`;

CREATE TABLE `RawData` (
    CREATE TABLE `RawData` (
    `id` INT,
    `object` TEXT,
    `result_position` INT,
    `address` TEXT,
    `booking_link` TEXT,
    `cid` BIGINT,
    `country` TEXT,
    `city` TEXT,
    `category` TEXT,
    `description` TEXT,
    `email` TEXT,
    `facebook` TEXT,
    `has_owener` TEXT,
    `health` CHAR,
    `instagram` TEXT,
    `lat` DOUBLE,
    `lng` DOUBLE,
    `last_opening_hours_updated_at` TEXT,
    `main_image_url` TEXT,
    `menu` TEXT,
    `name` TEXT,
    `opening_hours` TEXT,
    `phone` TEXT,
    `plus_code` TEXT,
    `poi` TEXT,
    `price` TEXT,
    `popular_times` TEXT,
    `ratings` INT,
    `score` DOUBLE,
    `url` TEXT,
    `website` TEXT,
    `zero_x` TEXT,
    `zip_code` TEXT,
    `collected_at` DATE,
    `input_url` TEXT,
    `input_language` TEXT,
    `input_max_results` INT,
    `input_details` TEXT,
    PRIMARY KEY (`id`)
);

LOAD DATA INFILE 'trip-planner\backend\google_maps_export.csv'
INTO TABLE employee_details
FIELDS TERMINATED BY ','
IGNORE 1 ROWS;

CREATE TABLE `poi` (
  `pid` tinyint(4) NOT NULL UNIQUE DEFAULT 0,
  `name` LONGTEXT DEFAULT NULL,
  `days_of_week` VARCHAR(45) DEFAULT NULL,
  `time` VARCHAR(45) DEFAULT NULL,
  `address` VARCHAR(45) DEFAULT NULL,
  `reservation_details` VARCHAR(45) DEFAULT NULL,
  `reservation_required` TINYINT DEFAULT 0,
  `location` VARCHAR(45) DEFAULT NULL,
  `accessibility` VARCHAR(45) DEFAULT NULL,
  PRIMARY KEY (`pid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `poi`(`pid`, `name`, `time`, `address`, `reservation_details`, `accessibility`)
SELECT `id`, `name`, `opening_hours`, `address`, `booking_link`, `poi`
FROM `RawData`

CREATE TABLE `restaurant` (
  `rid` tinyint(4) NOT NULL UNIQUE DEFAULT 0,
  `type_of_cuisine` VARCHAR(45) DEFAULT NULL,
  `menu_language` VARCHAR(45) DEFAULT NULL,
  `dietary` VARCHAR(45) DEFAULT NULL,
  PRIMARY KEY (`rid`),
  CONSTRAINT FOREIGN KEY (`rid`) REFERENCES `poi` (`pid`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `activity` (
  `aid` tinyint(4) NOT NULL UNIQUE DEFAULT 0,
  `is_time_sensitive` TINYINT DEFAULT 0,
  PRIMARY KEY (`aid`),
  CONSTRAINT FOREIGN KEY (`aid`) REFERENCES `poi` (`pid`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `restaurant`(`rid`, `type_of_cuisine`, `dietary`)
SELECT P.`pid`, R.`description`, P.`accessibility`
FROM `RawData` AS R, `poi` AS P
WHERE (R.`category` LIKE '%restaurant%' OR R.`category` LIKE '%Restaurant%') AND (P.`pid` = R.`id`);

INSERT INTO `activity`(`aid`)
SELECT P.`pid`
FROM `RawData` AS R, `poi` AS P
WHERE NOT(R.`category` LIKE '%restaurant%' OR R.`category` LIKE '%Restaurant%') AND (P.`pid` = R.`id`);

CREATE TABLE `users` (
  `uid` tinyint(4) NOT NULL UNIQUE DEFAULT 0,
  `username` VARCHAR(45) NOT NULL DEFAULT "guest",
  `email` VARCHAR(45) DEFAULT NULL,
  `password` VARCHAR(45) NOT NULL DEFAULT "password",
  `comment` VARCHAR(45) DEFAULT NULL,
  `cus_no` VARCHAR(45) DEFAULT NULL,
  `poi_code` tinyint(4) DEFAULT 0,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `customer` (
  `cno` tinyint(4) NOT NULL UNIQUE DEFAULT 0,
  PRIMARY KEY (`cno`),
  CONSTRAINT FOREIGN KEY (`cno`) REFERENCES `users` (`uid`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `review` (
  `rno` tinyint(4) NOT NULL UNIQUE DEFAULT 0,
  `date` VARCHAR(45) DEFAULT NULL,
  `experience_rating` VARCHAR(45) DEFAULT NULL,
  `would_revisit_rating` VARCHAR(45) DEFAULT NULL,
  `comment` VARCHAR(45) DEFAULT NULL,
  `cus_no` tinyint(4) DEFAULT NULL,
  `poi_code` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`rno`),
  CONSTRAINT FOREIGN KEY (`poi_code`) REFERENCES `poi` (`pid`) ON UPDATE CASCADE,
  CONSTRAINT FOREIGN KEY (`cus_no`) REFERENCES `customer`(`cno`) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `administrator` (
  `ano` tinyint(4) NOT NULL UNIQUE DEFAULT 0,
  `isStoreOwner` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`ano`),
  CONSTRAINT FOREIGN KEY (`ano`) REFERENCES `users` (`uid`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `schedule` (
    `sno` tinyint(4) NOT NULL UNIQUE DEFAULT 0,
    `date` VARCHAR(45) DEFAULT NULL,
    `time` VARCHAR(45) DEFAULT NULL,
    `cus_no` tinyint(4) DEFAULT NULL,
    PRIMARY KEY(`sno`),
    CONSTRAINT FOREIGN KEY (`cus_no`) REFERENCES `users` (`uid`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `contains` (
    `pno` tinyint(4) NOT NULL UNIQUE DEFAULT 0,
    `sno` tinyint(4) NOT NULL UNIQUE DEFAULT 0,
    PRIMARY KEY (`pno`, `sno`),
    CONSTRAINT FOREIGN KEY (`pno`) REFERENCES `poi` (`pid`) ON UPDATE CASCADE,
    CONSTRAINT FOREIGN KEY (`sno`) REFERENCES `schedule` (`sno`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

