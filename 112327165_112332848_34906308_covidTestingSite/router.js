const express = require('express');
const path = require('path');
const conn = require('./connection.js');

const router = express.Router();

// Routes for Lab Employees
router.get('/labtech', (req, res) => {
    // Make sure to pass in any parameters as a string ==> can use JSON.stringify() to convert other Javascript types into strings
    // res.render(path.resolve('public/views/labtech.html'), { });
    // Here is an example of how to pass in parameters that can be accessed on the client-side via EJS:
    res.render(path.resolve('public/views/labtech.html'), { param1: 'example', param2: JSON.stringify([0, 1, 2]) });
});

router.post('/labtech', (req, res) => {
    let body = req.body;
    res.render(path.resolve('public/views/testCollection.html'), { });
});

router.get('/testCollection', (req, res) => {
    res.render(path.resolve('public/views/testCollection.html'), { });
});

router.post('/testCollection', (req, res) => {
    let body = req.body;
    res.render(path.resolve('public/views/testCollection.html'), { });
});

router.get('/labHome', (req, res) => {
    res.render(path.resolve('public/views/labHome.html'), { });
});

router.get('/poolMapping', (req, res) => {
    res.render(path.resolve('public/views/poolMapping.html'), { });
});

router.post('/poolMapping', (req, res) => {
    let body = req.body;
    res.render(path.resolve('public/views/poolMapping.html'), { });
});

router.get('/wellTesting', (req, res) => {
    res.render(path.resolve('public/views/wellTesting.html'), { });
});

router.post('/wellTesting', (req, res) => {
    let body = req.body;
    res.render(path.resolve('public/views/wellTesting.html'), { });
});

// Routes for Employees
router.get('/employee', (req, res) => {
    res.render(path.resolve('public/views/employee.html'), { });
});

router.post('/employee', (req, res) => {
    let body = req.body;
    res.render(path.resolve('public/views/labHome.html'), { });
});

router.get('/employeeHome', (req, res) => {
    res.render(path.resolve('public/views/employeeHome.html'), { });
});

// Handling any other route with a 404 message
router.get('*', (req, res) => {
    res.send('<h1>404: File Not Found</h1>');
});

module.exports = router
