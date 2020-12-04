const path = require('path');
const conn = require('../connection.js');

function writeGet(req, res){
    //negate the if statement (!) to bypass login
    if ((req.session.user != null && req.session.user != {} && req.session.user.type == "labEmployee")) {
        wellTestingView(res)
    } else {
        res.redirect('/labtech');
    }
}

function writePost(req, res) {
    //negate the if statement (!) to bypass login
    if ((req.session.user != null && req.session.user != {} && req.session.user.type == "labEmployee")) {
        submitWell(req)
        wellTestingView(res)
    } else {
        res.redirect('/labtech');
    }
}

function submitWell(req) {
    let body = req.body
    let wellBarcode = body.wellBarcode
    let poolBarcode = body.poolBarcode

    // get time in the form of 'yyyy-mm-dd hh:mm:ss' "2020-11-14 11:21:00";
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1; 
    var day = d.getDate();
    var s = d.getSeconds();
    var m = d.getMinutes();
    var h = d.getHours();
    
    var DATETIME = "'" + year + "-" + month + "-" + day + " " + h + ":" + m + ":" + s + "'";

    conn.query(`INSERT INTO Well VALUES ('${wellBarcode}');`, (err, result) => {
        if (err) {
            console.log(err)
        }
    })

    let sql = `INSERT INTO WellTesting VALUES ('${wellBarcode}', '${poolBarcode}', ${DATETIME}, ${body.result == "in progress" ? "NULL" : DATETIME}, '${body.result}');`
    conn.query(sql, (err) => {
        if (err) {
            console.log(err)
        }
    })
}

function wellTestingView(res) {
    conn.query('SELECT * FROM WellTesting', (error, result) =>{
        if (error){
            console.log(error)
            res.render(path.resolve('./public/views/wellTesting.html'), {data: ''})
        }
        res.render(path.resolve('./public/views/wellTesting.html'), {data: result})
    })
}

module.exports.writeGet = writeGet;
module.exports.writePost = writePost;
