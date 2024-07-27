-- SELECT FIRST 10 POI 
SELECT * FROM POI LIMIT 10

--Select by Whether reservation required
SELECT * FROM poi WHERE reservation_required = 0 LIMIT 10

--List all REVIEWS Above Rating of 3
SELECT R.* FROM `poi` AS P, `review` as R WHERE R.experience_rating >= 3 AND R.rno = P.pid LIMIT 10

--Show Password given username
SELECT password FROM users where username like 'bob'


--SHOW POI Not open on Tuesday
SELECT * FROM poi WHERE `time` not like '%Tuesday Closed%' LIMIT 10

--ADD POI to database
INSERT INTO poi(name, days_of_week, time, address, reservation_details, reservation_required, location, accessibility) 
VALUES (“Tims”, "MTWTF", "Monday 10:30 AM - 11:00 PM, Tuesday Monday 10:30 AM - 11:00 PM, Wednesday Monday 10:30 AM - 11:00 PM, Thursday Monday 10:30 AM - 11:00 PM, Friday Monday 10:30 AM - 11:00 PM", “150 University Ave W”, null, 0, “Waterloo”, null)

--DELTE POI 
DELETE FROM poi WHERE pid = 123

--UPDATE POI
UPDATE poi SET name= “Tims”, days_of_week= “MTWTFSS”, time= null, address= “150 University Ave W”, reservation_details= null, reservation_required= 0, location= “Waterloo”, accessibility=null 
WHERE pid = 4