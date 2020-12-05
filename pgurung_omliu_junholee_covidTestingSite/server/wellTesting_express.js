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
    testing = 1
    //testing = true

    if(testing == 0){
        if ((req.session.user != null && req.session.user != {} && req.session.user.type == "labEmployee")) {
            submitWell(req)
            updateResults(req)
            wellTestingView(res)
        } else {
            res.redirect('/labtech');
        }
    }else{
        ///working on currently
        console.log(submitWell(req))
        // submitWell(req).then(()=> {
        //     updateResults(req).then(() => {
        //         wellTestingView(res)
        //     })
        // })
    }
}

function updateResults(req) {
        let newResult = req.body.newResult
        return conn.query('SELECT * FROM WellTesting', (error, result) =>{
            if (error){
                console.log(error)
            }
            //console.log(result)
            for(i = 0; i < result.length; i++){
                sql = ` UPDATE wellTesting W
                        SET W.result = '${newResult[i]}'
                        WHERE W.wellBarcode = '${result[i].wellBarcode}' AND W.poolBarcode = '${result[i].poolBarcode}'
                        ;
                `
                //console.log(sql)
                conn.query(sql, (error) =>{
                    if(error)
                        console.log(error)
                })
            }
        })
}

function submitWell(req) {
    let body = req.body
    let wellBarcode = body.wellBarcode
    let poolBarcode = body.poolBarcode

    if(wellBarcode==''||wellBarcode==null||poolBarcode==''||poolBarcode==null)
        return

    // get time in the form of 'yyyy-mm-dd hh:mm:ss' "2020-11-14 11:21:00";
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1; 
    var day = d.getDate();
    var s = d.getSeconds();
    var m = d.getMinutes();
    var h = d.getHours();
    
    var DATETIME = "'" + year + "-" + month + "-" + day + " " + h + ":" + m + ":" + s + "'";

    // conn.query(`INSERT INTO Well VALUES ('${wellBarcode}');`, (err, result) => {
    //     if (err) {
    //         console.log(err)
    //     }
    // })
    // return conn.query(sql, (err) => {
    //     if (err) {
    //         console.log(err)
    //     }
    // })

    conn.query(sql, (err, result) => {
        if(err)
            return err
        else
            return result
    })

    return makeWell(wellBarcode).then(() =>{ 
        let sql = `INSERT INTO WellTesting VALUES ('${wellBarcode}', '${poolBarcode}', ${DATETIME}, ${body.result == "in progress" ? "NULL" : DATETIME}, '${body.result}');`
        return conn.query(sql, (err) => {
            if (err) {
                console.log(err)
            }
        })
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

function makeWell(wellBarcode){
    return conn.query(`INSERT INTO Well VALUES ('${wellBarcode}');`, (err, result) => {
        if (err) {
            console.log(err)
        }
    })
}
//setTimeout(wellTestingView, 1500);
module.exports.writeGet = writeGet;
module.exports.writePost = writePost;
