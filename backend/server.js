const express = require('express');
const cors = require('cors');
const dbconnect = require('./config/db');
const userroutes = require('./routes/userroutes');
const shoproutes=require('./routes/shoproutes');
const adminroutes=require('./routes/adminroutes');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); 
require('dotenv').config(); 

const app = express();
dbconnect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true
}));

app.use(session({
    key: "userid",
    secret: "project",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24 * 1000, // 1 day
        secure: false,  // Allow HTTP for development (set to true for production with HTTPS)
        httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
        sameSite: 'Lax' // Helps mitigate CSRF attacks
    }
}));
app.use('/user', userroutes);
app.use('/shop', shoproutes);
app.use('/admin', adminroutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
