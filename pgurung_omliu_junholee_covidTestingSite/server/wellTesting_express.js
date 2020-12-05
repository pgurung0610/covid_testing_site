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
    submitWell(req).then( () => {
        wellTestingView(res)
    }).catch( (err) => {
        console.log("ERROR IN TESTING = 1")
        console.log(err)
    })
}

function writeUpdatePost(req, res) {
    sql = `UPDATE WellTesting SET result = CASE wellBarcode `        
    let wellBarcodes = Object.keys(req.body)
    wellBarcodes.forEach( (wellBarcode) => {
        sql += `WHEN '${wellBarcode}' THEN '${req.body[wellBarcode]}' `
        wellBarcodes.push(`'${wellBarcode}'`);
    });
    sql += `ELSE 'in progress' END WHERE wellBarcode IN (${wellBarcodes.join()});`
    conn.query(sql, (error) => {
        if(error) {
            console.log(error)
        }
        res.redirect("/wellTesting")
    })
}

function makeWell(wellBarcode) {
    return new Promise( (resolve, reject) => {
        conn.query(`INSERT INTO Well VALUES ('${wellBarcode}');`, (err, result) => {
            if (err) {
                console.log(err)
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

function submitWell(req) {
    let body = req.body
    let wellBarcode = body.wellBarcode
    let poolBarcode = body.poolBarcode

    if(wellBarcode == '' || wellBarcode == null || poolBarcode == '' || poolBarcode == null) {
        return new Promise( (resolve, reject) => {
            resolve(null)
        })
    }

    // get time in the form of 'yyyy-mm-dd hh:mm:ss' "2020-11-14 11:21:00";
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1; 
    var day = d.getDate();
    var s = d.getSeconds();
    var m = d.getMinutes();
    var h = d.getHours();
    
    var DATETIME = "'" + year + "-" + month + "-" + day + " " + h + ":" + m + ":" + s + "'";

    return new Promise( (resolve, reject) => {
        makeWell(wellBarcode).then( (success) => {
            let sql = `INSERT INTO WellTesting VALUES ('${wellBarcode}', '${poolBarcode}', ${DATETIME}, ${body.result == "in progress" ? "NULL" : DATETIME}, '${body.result}');`
            conn.query(sql, (err, result) => {
                if (err) {
                    console.log(err)
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        }).catch( (err) => {
            console.log("ERROR IN SUBMIT WELL")
            let sql = `SELECT * FROM WellTesting WHERE wellBarcode = ${wellBarcode}`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                } else if (result.length == 0) {
                    sql = `INSERT INTO WellTesting VALUES ('${wellBarcode}', '${poolBarcode}', ${DATETIME}, ${body.result == "in progress" ? "NULL" : DATETIME}, '${body.result}');`
                    console.log("INSERTING INTO WellTesting")
                    conn.query(sql, (err, result) => {
                        if (err) {
                            console.log(err)
                            reject(err)
                        } else {
                            resolve(result)
                        }
                    })
                } else {
                    sql = `Update WellTesting SET testingEndTime = ${body.result == "in progress" ? "NULL" : DATETIME}, result = '${body.result}' WHERE wellBarcode = '${wellBarcode}';`
                    console.log("UPDATING WellTesting")
                    conn.query(sql, (err, result) => {
                        if (err) {
                            console.log(err)
                            reject(err)
                        } else {
                            resolve(result)
                        }
                    })
                }
            })
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

module.exports.writeGet = writeGet;
module.exports.writePost = writePost;
module.exports.writeUpdatePost = writeUpdatePost;
