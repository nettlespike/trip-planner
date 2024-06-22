# trip-planner
CS 338 Final Project

## 1. Download the project.
- Download and use GitHub Desktop (software) if you don't want to clone it using command prompt

## 2. Ensure you have the necessary things downloaded
### Node:
Check if you have node installed by running 
> node -v

If it lists out the version detail you're good! Otherwise:
- download node at https://nodejs.org/en/download/package-manager

If you're using mac use homebrew. To check if you have homebrew installed type this into command terminal:

> brew help

- If you get 'command not found' please install brew by following instructions at https://brew.sh/ 

### npm
Check if you have npm installed by typing this into your command prompt:
> npm -v
- If you're on MAC and it gives error, download npm:
> brew install node


### SQL + SQL Workbench
- follow instructions to download SQL + SQL Workbench at https://dev.mysql.com/downloads/

## 3. Download all necessary node module packages on local machine
Go into directory where project is stored and type in terminal
> npm i

## 5. Creating data into database locally
- Open up SQL workbench and configure your user 
- Copy, Paste, and run create-test.sql (found in backend folder in your project) in SQL workbench to make all your data
- Create a file called ".env" in the backend folder and fill it with information like so based on your personal SQL Server configurations:
  - Note: you probably only have to change the value of DB_PAASSWORD and DB_USERNAME

```
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=test_trip
DB_USERNAME=root
DB_PASSWORD="my_password"
```

## 6. Running application 
Go into backend directory and type:
> npm start

Go to: localhost:8800/poi site on your favorite browser to see project

## 7. Doing queries 
To see output from queries, please copy and paste SQL query from test-sample.sql and paste it into the quotations in 
  > const q = "SELECT * FROM poi" 

on line 19 of backend/index.js

Refresh your browser to see the new query