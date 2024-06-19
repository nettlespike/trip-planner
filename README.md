# trip-planner
CS 338 Final Project

## 1. Download the project.

## 2. Ensure you have the necessary things downloaded
### Node:
Check if you have node installed by running 
> node -v
If it lists out the versio detail you're good! Otherwise:
- download node at https://nodejs.org/en/download/package-manager
- If you're using mac use homebrew. To check if you have homebrew installed type this into command terminal:
> brew help
  If you get 'command not found' please install brew by following instructions at https://brew.sh/ 

### npm
Check if you have npm installed by typing this into your command prompt:
> npm -v
If it gives error, donwload npm:
On mac:
> brew install node


### SQL + SQL Workbench
- follow instructions at https://dev.mysql.com/downloads/workbench/

## 3. Download all necessary node module packages
- go into directory and type
> npm i

## 5. Copy & Paste, and run create-test.sql in SQL workbench to make all your data

## 6. Update index.js with your own username, password, hostname, etc 

## 7. To run the code type in terminal:
> cd backend
> npm start

## 8. To see application please type localhost:8800/poi into internet browswer of choice and click enter

## 9. To see output from queries, please copy and paste SQL query from test-sample.sql and paste it into the quotations in 
  > const q = "SELECT * FROM poi" 
on line 19 of backend/index.js

Refresh your browser to see the new query