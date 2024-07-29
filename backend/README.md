# Backend Code Directory 

## controllers folder
    auth.js
    Controls checks for valid / inserting new user credentials. Also ensures passwords are encrypted (aka hashed)

    filter.js
    Specifies which queries are to be sent to the server for specific filters (e.g selecting reservation required POIs)

    poi.js
    Specifies queries for POI page-related operations (e.g Inserting new POI into database, selecting POIs)

    review.js
    Specifies queries for review page-related operations (e.g Selecting all reviews, selecting reviews above certain experience_rating)

    schedule.js 
    Specifies queries for schedule page-related operations (e.g deleting from schedule, adding to schedule)

## Production Data folder
Contains files related to Production Data, including code that creates the database / data, as well as .csv files containing Production Data that should be imported into MySQL Workbench. Also contains test SQL queries that can be directly ran in MySQL Workbench to test out features (test-production.sql, output is test-production.out)

## routes folder
Each file specifies different links that can be accessed from each page and assigns it a name

## Sample Data folder
Contains files related to Sample Data, including code that creates the database / data, as well as test SQL queries that can be directly fan in MySQL Workbench to test out features (test-sample.sql, output in test-sample.out)


  .env file
  Specifies database connection credentials, specifically determines whether the sample database or production database is connected. 

  index.js
  Connects to database when backend is run, and connects routes and controllers. 
