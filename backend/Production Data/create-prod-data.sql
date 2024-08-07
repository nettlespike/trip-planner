DROP DATABASE IF EXISTS `trip_data`;
CREATE DATABASE `trip_data`; 
USE `trip_data`;

/*Please import google_maps_export.csv using the wizard first before executing any more lines here */
/* When importing please import table as RawData
   And deselect the following columns:
      * id
      * object
      * result_position
      * cid
      * zero_x
      * collected_at
      * input_url
      * input_language
      * input_max_results
      * input_details
*/

ALTER TABLE `RawData` 
ADD `id` INT NOT NULL UNIQUE AUTO_INCREMENT FIRST;

CREATE TABLE `poi` (
  `pid` INT NOT NULL UNIQUE AUTO_INCREMENT,
  `name` LONGTEXT DEFAULT NULL,
  `days_of_week` VARCHAR(45) DEFAULT NULL,
  `time` VARCHAR(500) DEFAULT NULL,
  `address` VARCHAR(200) DEFAULT NULL,
  `reservation_details` VARCHAR(500) DEFAULT NULL,
  `reservation_required` TINYINT DEFAULT 0,
  `accessibility` VARCHAR(1000) DEFAULT NULL,
  PRIMARY KEY (`pid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/* To test if there are duplicates in RawData, uncomment and run the following code */
/*SELECT name, address, COUNT(*)
FROM RawData
GROUP BY name, address
HAVING COUNT(*) > 1
*/

/* There should be no duplicate records, but if there is, manually delete them */

INSERT INTO `poi`(`pid`,`name`, `time`, `address`, `reservation_details`, `location`,`accessibility`)
SELECT `id`,`name`, `opening_hours`, `address`, `booking_link`, `city`, `poi`
FROM `RawData`;

UPDATE poi 
SET reservation_required = 1
WHERE NOT (reservation_details IS NULL OR reservation_details = "");

CREATE TABLE `restaurant` (
  `rid` INT NOT NULL UNIQUE DEFAULT 0,
  `type_of_cuisine` VARCHAR(1000) DEFAULT NULL,
  `menu_language` VARCHAR(45) DEFAULT NULL,
  `dietary` VARCHAR(1000) DEFAULT NULL,
  PRIMARY KEY (`rid`),
  CONSTRAINT FOREIGN KEY (`rid`) REFERENCES `poi` (`pid`) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `activity` (
  `aid` INT NOT NULL UNIQUE DEFAULT 0,
  `is_time_sensitive` TINYINT DEFAULT 0,
  PRIMARY KEY (`aid`),
  CONSTRAINT FOREIGN KEY (`aid`) REFERENCES `poi` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE
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
  `uid` INT NOT NULL UNIQUE AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL DEFAULT "guest",
  `email` VARCHAR(100) DEFAULT NULL,
  `password` VARCHAR(60) NOT NULL DEFAULT "password",
  `isAdmin` TINYINT NOT NULL DEFAULT 0,
  `isStoreOwner` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `review` (
  `rno` INT NOT NULL UNIQUE AUTO_INCREMENT,
  `date` VARCHAR(45) DEFAULT NULL,
  `experience_rating` DOUBLE DEFAULT NULL,
  `would_revisit_rating` DOUBLE DEFAULT NULL,
  `comment` VARCHAR(5000) DEFAULT NULL,
  `cus_no` INT NOT NULL DEFAULT 1,
  `poi_code` INT NOT NULL DEFAULT 1,
  PRIMARY KEY (`rno`),
  CONSTRAINT FOREIGN KEY (`poi_code`) REFERENCES `poi` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT FOREIGN KEY (`cus_no`) REFERENCES `users`(`uid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `schedule` (
	`sno` INT NOT NULL UNIQUE AUTO_INCREMENT,
  `date` VARCHAR(45) DEFAULT "TBD",
  `time` VARCHAR(45) DEFAULT "TBD",
  `cus_no` INT NOT NULL DEFAULT 0,
  `pid` INT NOT NULL DEFAULT 0,
  PRIMARY KEY(`sno`),
  CONSTRAINT FOREIGN KEY (`cus_no`) REFERENCES `users` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT FOREIGN KEY (`pid`) REFERENCES `poi` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `contains` (
    `pno` INT NOT NULL UNIQUE DEFAULT 0,
    `sno` INT NOT NULL UNIQUE DEFAULT 0,
    PRIMARY KEY (`pno`, `sno`),
    CONSTRAINT FOREIGN KEY (`pno`) REFERENCES `poi` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FOREIGN KEY (`sno`) REFERENCES `schedule` (`sno`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/* For users data, please import usertest.csv using Table Import Data Wizard onto the 'users' table. 
Please specify
	username maps to username
*/

/* For schedules data, please import backend/Production Data/trip_schedules.csv using Table Import Data Wizard onto 'schedule' table.
Please specify
	date maps to date
*/
