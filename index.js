const path = require('path');
const express = require("express");
const app = express();
const data =require('./data.json');
const db = require('./config/db/index');
const route = require('./routes'); //this file contain routes of app
const cors = require('cors');
const jwt = require('jsonwebtoken');

let port = process.env.PORT || 3001;

//Connect mongodb
db.connect();

// Setting up the cors config
app.use(cors());

app.use(express.static(path.join(__dirname, 'public'))); //use to load static files in folder public, just understand that http://localhost:3001 is call to folder public
app.use(
    express.urlencoded({
        //call middleware to handling data from form data submit method POST
        extended: true,
    }),
);
//call middleware to handle code javascript submit: XMLHttpRequest, fetch, axios
app.use(express.json());


route(app);

app.get("/", (req, res) => {
    res.send("Xin chào. Đây là Backend API cho Mobile App Đặt món");
})

app.listen(port, ()=>{
    console.log(`App is listening on port ${port}`);
})