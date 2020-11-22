const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');

// Initializing Express App
const app = express();

// Configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serving static folder
app.use(express.static('public'));

// Look for files to render in views directory
app.set('views', path.resolve('public/views'));
// Set EJS as templating engine 
app.set('view engine', 'ejs');
// Render HTML files
app.engine('html', require('ejs').renderFile);

// Importing and using router
const router = require('./router.js');
app.use('/', router);

// Importing databse connection object
const conn = require('./connection.js');

// Starting server on port 3000
app.listen(3000, () => {
    console.log('Server started on port 3000...');
});