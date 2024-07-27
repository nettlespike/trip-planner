--Select Every POI
SELECT * FROM poi

--Select by Whether reservation required
SELECT * FROM poi WHERE reservation_required = 0

--List all REVIEWS Above Rating of 3
SELECT R.* FROM `poi` AS P, `review` as R WHERE R.experience_rating >= 3 AND R.rno = P.pid

--Show Password given username
SELECT password FROM users where username like 'bob'

--SHOW POI Open on Friday

SELECT * FROM poi WHERE `time` like '%F%
