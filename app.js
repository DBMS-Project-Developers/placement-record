const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const mysql = require('mysql');
const routes = require('./src/routes/routes');
const connectDB = require("./src/config/db");

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended: true}));

app.use("/", routes);

app.listen('3000', () => {
    console.log('Server started at port 3000');
})