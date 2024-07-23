DROP DATABASE IF EXISTS `test_trip`;
CREATE DATABASE `test_trip`; 
USE `test_trip`;

CREATE TABLE `poi` (
  `pid` tinyint(4) NOT NULL UNIQUE AUTO_INCREMENT,
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

INSERT INTO `test_trip`.`poi` (`pid`, `name`, `days_of_week`, `reservation_required`) VALUES ('1', 'Gols', 'MTWTF', '0');
INSERT INTO `test_trip`.`poi` (`pid`, `name`, `days_of_week`, `reservation_required`) VALUES ('2', 'Mels', 'MW', '0');
INSERT INTO `test_trip`.`poi` (`pid`, `name`, `days_of_week`, `reservation_required`) VALUES ('3', 'Yushang', 'MTW', '0');

CREATE TABLE `restaurant` (
  `rid` tinyint(4) NOT NULL UNIQUE AUTO_INCREMENT,
  `type_of_cuisine` VARCHAR(45) DEFAULT NULL,
  `menu_language` VARCHAR(45) DEFAULT NULL,
  `dietary` VARCHAR(45) DEFAULT NULL,
  PRIMARY KEY (`rid`),
  CONSTRAINT FOREIGN KEY (`rid`) REFERENCES `poi` (`pid`) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `test_trip`.`restaurant` (`rid`, `type_of_cuisine`) VALUES ('1', 'Chinese');
INSERT INTO `test_trip`.`restaurant` (`rid`, `type_of_cuisine`) VALUES ('2', 'English');
INSERT INTO `test_trip`.`restaurant` (`rid`, `type_of_cuisine`) VALUES ('3', 'Chinese');

CREATE TABLE `activity` (
  `aid` tinyint(4) NOT NULL UNIQUE AUTO_INCREMENT,
  `is_time_sensitive` TINYINT DEFAULT 0,
  PRIMARY KEY (`aid`),
  CONSTRAINT FOREIGN KEY (`aid`) REFERENCES `poi` (`pid`) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `users` (
  `uid` tinyint(4) NOT NULL UNIQUE AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL DEFAULT "guest",
  `email` VARCHAR(45) DEFAULT NULL,
  `password` VARCHAR(60) NOT NULL DEFAULT "password",
  `isAdmin` TINYINT NOT NULL DEFAULT 0,
  `isStoreOwner` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `test_trip`.`users` (`uid`, `username`,`password`) VALUES (1, "bob","password123");
INSERT INTO `test_trip`.`users` (`uid`, `username`,`password`) VALUES (2, "jane","toooodles");

CREATE TABLE `review` (
  `rno` tinyint(4) NOT NULL UNIQUE DEFAULT 0,
  `date` VARCHAR(45) DEFAULT NULL,
  `experience_rating` VARCHAR(45) DEFAULT NULL,
  `would_revisit_rating` VARCHAR(45) DEFAULT NULL,
  `comment` VARCHAR(45) DEFAULT NULL,
  `cus_no` tinyint(4) DEFAULT NULL,
  `poi_code` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`rno`),
  CONSTRAINT FOREIGN KEY (`poi_code`) REFERENCES `poi` (`pid`) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT FOREIGN KEY (`cus_no`) REFERENCES `customer`(`cno`) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `test_trip`.`review` (`rno`, `experience_rating`, `poi_code`) VALUES(1,4,1);
INSERT INTO `test_trip`.`review` (`rno`, `experience_rating`, `poi_code`) VALUES(2,2,1);
INSERT INTO `test_trip`.`review` (`rno`, `experience_rating`, `poi_code`) VALUES(3,3,2);

CREATE TABLE `schedule` (
    `sno` tinyint(4) NOT NULL UNIQUE DEFAULT 0,
    `date` VARCHAR(45) DEFAULT NULL,
    `time` VARCHAR(45) DEFAULT NULL,
    `cus_no` tinyint(4) NOT NULL DEFAULT 0,
    `pid` INT NOT NULL DEFAULT 0,
    PRIMARY KEY(`sno`),
    CONSTRAINT FOREIGN KEY (`cus_no`) REFERENCES `users` (`uid`) ON UPDATE CASCADE ON DELETE CASCADE
    CONSTRAINT FOREIGN KEY (`pid`) REFERENCES `poi` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `contains` (
    `pno` tinyint(4) NOT NULL UNIQUE DEFAULT 0,
    `sno` tinyint(4) NOT NULL UNIQUE DEFAULT 0,
    PRIMARY KEY (`pno`, `sno`),
    CONSTRAINT FOREIGN KEY (`pno`) REFERENCES `poi` (`pid`) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT FOREIGN KEY (`sno`) REFERENCES `schedule` (`sno`) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

