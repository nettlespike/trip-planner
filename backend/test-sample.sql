--Select by Attributes

SELECT * FROM poi WHERE reservation_required = 0

--List all REVIEWS Above Rating of 3
SELECT * FROM poi where review >= 3

--Show Password given username
SELECT password FROM users where username like 'bob'


--SHOW POI Open on Friday

SELECT * FROM poi WHERE days_of_week like '%F%
