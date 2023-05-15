## General info
The application was created while creating another project - LoreQuiz. Thanks to this, instead of adding each question individually, I was able 
to import all of them from an Excel file.
## Technologies
* NodeJS
* xlsx API
* Mongoose
* MongoDB
## Features
* app.js detects new questions in `LoreQuiz.xlsx` and uploads them to remote database.
* checkAndUpdate.js compares data in `LoreQuiz.xlsx` and database and if detects some changes, updates database  
## Setup
To run this project, install it locally using npm:
```
$ cd ../lorem
$ npm install
```
To upload new questions to database, run app.js with command line
```
node app.js
```
To update or delete some questions run checkAndUpdate.js
```
node checkAndUpdate.js
```
