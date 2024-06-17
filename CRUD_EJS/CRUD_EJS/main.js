// Imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const router = require('./routes/route.js');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: 'my secret key',
    saveUninitialized: true,
    resave: false,
}));

app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

// Template engine
const viewsPath = path.join(__dirname, 'views');
app.set('view engine', 'ejs');
app.set('views', viewsPath);

// Static files
app.use(express.static(path.join(__dirname, 'uploads')));

// Database connection
mongoose.connect("mongodb://localhost:27017/Data", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Routes
app.use('/', router);

// Start the server
app.listen(PORT, () => {
    console.log(`App is listening on PORT: ${PORT}`);
});
