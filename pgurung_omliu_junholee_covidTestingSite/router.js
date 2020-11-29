const express = require('express');
const path = require('path');
const conn = require('./connection.js');

const router = express.Router();

router.get('/labtech', (req, res) => {
    req.session.destroy();
    console.log("Logged out");
    res.render(path.resolve('public/views/labtech.html'), { error: "" });
});

router.post('/labtech', (req, res) => {
    req.session.user = {};

    let body = req.body;
    let labID = body['labID'];
    let password = body['password'];
    let errorMsg = "";

    if(!labID) {
        errorMsg = "No labID was entered";
        res.render(path.resolve('public/views/labtech.html'), { error: errorMsg });
    } else if(!password) {
        errorMsg = "No password was entered";
        res.render(path.resolve('public/views/labtech.html'), { error: errorMsg });
    } else {
        conn.query(`SELECT * FROM LabEmployee L WHERE L.labID = '${labID}'`, (err, result) => {
            if (err) {
                console.log('Could not successfully query database: ' + err);
                errorMsg = 'Could not query the database';
                res.render(path.resolve('public/views/labtech.html'), { error: errorMsg });
            } else {
                if (result.length > 0) {
                    let user = result[0];
                    if (password != user.password) {
                        errorMsg = 'Incorrect Password';
                        res.render(path.resolve('public/views/labtech.html'), { error: errorMsg });
                    } else {
                        req.session.user = {
                            type: "labEmployee",
                            id: user.labID
                        }
                        console.log("Logged in as user: " + JSON.stringify(req.session.user));
                        res.redirect("/labHome");
                    }
                } else {
                    console.log(`Lab Employee with labID ${labID} not found`);
                    errorMsg = 'Lab Employee with this labID not found';
                    res.render(path.resolve('public/views/labtech.html'), { error: errorMsg });
                }
            }
        });
    }
});

router.get('/labHome', (req, res) => {
    if (req.session.user != null && req.session.user != {} && req.session.user.type == "labEmployee") {
        res.render(path.resolve('public/views/labHome.html'), { });
    } else {
        res.redirect('/labtech');
    }
});

router.get('/testCollection', (req, res) => {
    if (req.session.user != null && req.session.user != {} && req.session.user.type == "labEmployee") {
         res.render(path.resolve('public/views/testCollection.html'), { });
     } else {
         res.redirect('/labtech');
     }
 });
 
 router.post('/testCollection', (req, res) => {
     if (req.session.user != null && req.session.user != {} && req.session.user.type == "labEmployee") {
         let body = req.body;
         res.render(path.resolve('public/views/testCollection.html'), { });
     } else {
         res.redirect('/labtech');
     }
 });

router.get('/poolMapping', (req, res) => {
    let poolMapping_express = require('./server/poolMapping_express.js')
    poolMapping_express.writeGet(req, res)
});

router.post('/poolMapping', (req, res) => {
    let poolMapping_express = require('./server/poolMapping_express.js')
    poolMapping_express.writePost(req, res)
});

router.get('/wellTesting', (req, res) => {
    if (req.session.user != null && req.session.user != {} && req.session.user.type == "labEmployee") {
        res.render(path.resolve('public/views/wellTesting.html'), { });
    } else {
        res.redirect('/labtech');
    }
});

router.post('/wellTesting', (req, res) => {
    if (req.session.user != null && req.session.user != {} && req.session.user.type == "labEmployee") {
        let body = req.body;
        res.render(path.resolve('public/views/wellTesting.html'), { });
    } else {
        res.redirect('/labtech');
    }
});

// Routes for Employees
router.get('/employee', (req, res) => {
    req.session.destroy();
    console.log("Logged out");
    res.render(path.resolve('public/views/employee.html'), { error: "" });
});

router.post('/employee', (req, res) => {
    req.session.user = {};

    let body = req.body;
    let email = body['email'];
    let password = body['password'];
    let errorMsg = "";

    if(!email) {
        errorMsg = "No email was entered";
        res.render(path.resolve('public/views/employee.html'), { error: errorMsg });
    } else if(!password) {
        errorMsg = "No password was entered";
        res.render(path.resolve('public/views/employee.html'), { error: errorMsg });
    } else {
        conn.query(`SELECT * FROM Employee E WHERE E.email = '${email}'`, (err, result) => {
            if (err) {
                console.log('Could not successfully query database: ' + err);
                errorMsg = 'Could not query the database';
                res.render(path.resolve('public/views/employee.html'), { error: errorMsg });
            } else {
                if (result.length > 0) {
                    let user = result[0];
                    if (password != user.password) {
                        errorMsg = 'Incorrect Password';
                        res.render(path.resolve('public/views/employee.html'), { error: errorMsg });
                    } else {
                        req.session.user = {
                            type: "employee",
                            id: user.employeeID,
                            email: email,
                            firstName: user.firstName,
                            lastName: user.lastName
                        }
                        console.log("Logged in as user: " + JSON.stringify(req.session.user));
                        res.redirect("/employeeHome");
                    }
                } else {
                    console.log(`Employee with email ${email} not found`);
                    errorMsg = 'Employee with this email not found';
                    res.render(path.resolve('public/views/employee.html'), { error: errorMsg });
                }
            }
        });
    }
});

router.get('/employeeHome', (req, res) => {
    if (req.session.user != null && req.session.user != {} && req.session.user.type == "employee") {
        res.render(path.resolve('public/views/employeeHome.html'), { });
    } else {
        res.redirect('/employee');
    }
});

// Handling default route
router.get('/', (req, res) => {
    if (req.session.user != null && req.session.user != {}) {
        if (req.session.user.type == "labEmployee") {
            res.redirect('/labHome');
        } else {
            res.redirect('/employeeHome');
        }
    } else {
        res.redirect('/employee');
    }
});

// Handling any other route with a 404 message
router.get('*', (req, res) => {
    res.send('<h1>404: File Not Found</h1>');
});

module.exports = router
