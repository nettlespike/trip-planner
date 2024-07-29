# Front end Code Directory

## Public Folder

  index.html 
  Base skeleton page to hold all our pages and components

  manifest.json
  Specifies assets for index.html

## src folder
  ### components Folder
    Footer.jsx
    Footer of website attached to all pages 
    
    Navbar.jsx
    Navbar at top of every page - customized for different user permissions 

  ### context Folder
    authContext.js
    Helps specify which pages should be displayed based on different user types
  
  ### pages Folder
    Contains one file for each page of application, split into "admin" only pages for admin users and "customer' pages for customers

  App.js
  Base component to combining navbar, page component of choice, and footer. Also specifies which pages are displayed for different links 

  index.js
  Base website hosting App.js

  index.css
  Stylesheet specifying styles for index.js

  reportWebVitals.js
  Helps track statistics of website; currently not actively in use but required to run project

  

