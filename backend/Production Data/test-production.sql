-- For simplicity sake in output, everything has a limit of 5
-- SELECT by whether reservation required 
SELECT * FROM poi WHERE reservation_required = 1 LIMIT 5;

-- Select reviews above 4 experience rating
SELECT R.*, P.name FROM (SELECT * FROM review WHERE experience_rating >= 4 ORDER BY experience_rating) AS R INNER JOIN (SELECT pid, name FROM poi) AS P ON R.poi_code = P.pid ORDER BY experience_rating LIMIT 5;

-- Select poi open on weekends
SELECT * FROM poi WHERE time LIKE '%Sunday%Saturday%' LIMIT 5;

-- Insert new poi
INSERT INTO poi(name, days_of_week, time, address, reservation_details, reservation_required, location, accessibility) 
VALUES ("Tims", "MTWTF", 
"Monday 10:30 AM - 11:00 PM, Tuesday 10:30 AM - 11:00 PM, Wednesday 10:30 AM - 11:00 PM, Thursday 10:30 AM - 11:00 PM, Friday 10:30 AM - 11:00 PM", 
"150 University Ave W", null, 0, “Waterloo”, null);

-- Delete poi
DELETE FROM poi WHERE pid = 123;

-- Update poi
UPDATE poi SET 
name = "Tims", days_of_week= "MTWTFSS", time= null,
address= "150 University Ave W", reservation_details= null, reservation_required= 0, 
location= "Waterloo", accessibility=null WHERE pid = 4;

-- Select schedule entries and their corresponding poi name and poi reservation_details
SELECT schedule.*, poi.name, poi.reservation_details FROM schedule 
LEFT JOIN poi ON schedule.pid = poi.pid 
WHERE schedule.cus_no = 1;

-- Select popular pois
SELECT info.pid, info.popularity, ROUND(info.rating, 2) as rating, poi.name, poi.reservation_details FROM poi 
RIGHT JOIN (SELECT popTable.*, rateTable.rating FROM (SELECT pid, COUNT(*) as popularity 
FROM schedule GROUP BY pid) AS popTable 
LEFT JOIN (SELECT poi_code, avg(would_revisit_rating) as rating FROM review GROUP BY poi_code) as rateTable 
ON rateTable.poi_code = popTable.pid) AS info ON poi.pid = info.pid 
ORDER BY info.popularity DESC
LIMIT 5;

