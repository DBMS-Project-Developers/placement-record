const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
var cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const mysql = require('mysql');
const routes = require('./src/routes/routes');
const connectDB = require("./src/config/db");

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ 
    secret: '123456cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

app.use(flash());

app.use((req, res, next) => {
    res.locals.currentUser = req.session.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use("/", routes);

app.listen('3000', () => {
    console.log('Server started at port 3000');
})