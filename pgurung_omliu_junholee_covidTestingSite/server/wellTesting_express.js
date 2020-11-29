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
    let sql = `INSERT INTO WellTesting VALUES ('${body.poolBarcode}', '${req.body.wellBarcode}', NULL, NULL, '${req.body.result}');`
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
