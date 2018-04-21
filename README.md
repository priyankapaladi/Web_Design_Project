## MEAN Stack Project - Blogging Application

# BlogSpace

Requirements for this project are:
Angular2 CLI
NodeJS
Mongo

To run this project:
1) In the terminal run the command mongod to start mongo
2) Navigate to the folder Angular2/blogApp and run the command npm i && ng build
3) Navigate to the folder Angular2 and run the command nodemon server.js (This is to run the node server)
4) Goto localhost:8080 on web-browser
5) For better experience, start by registering yourself and continue
6) The application is more descriptive and will guide/direct you with all the messages

# Basic Workflow

All the data from front-end is routed to the services module and then to the backend (which is in the routes folder). All the user related data can be seen in the authentication.services and authentication.js files. All the blog related data can be seen in the blog.services and blogs.js files.

All the components have their own functionality whose details can be seen their respective component.ts files.

You can also install Robo3T to see the structure of the schema and view the data being saved as and when you use the application.

Contributors:
Labdhi Shah
Gauri Chavan
Priyanka Paladi Rajagopal


