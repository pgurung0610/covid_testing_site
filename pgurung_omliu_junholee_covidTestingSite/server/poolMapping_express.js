const path = require('path');
const conn = require('../connection.js');

function writeGet(req, res) {
    if ((req.session.user != null && req.session.user != {} && req.session.user.type == "labEmployee")) {
        poolMappingView(res)
    } else {
        res.redirect('/labtech');
    }
}

function writePost(req, res) {
    if ((req.session.user != null && req.session.user != {} && req.session.user.type == "labEmployee")) {
        submitPool(req, res)
        poolMappingView(res)
    } else {
        res.redirect('/labtech');
    }
}

function submitPool (req) {
    let body = req.body
    let poolBarcode = body.poolBarcode
    let testBarcodes = Object.values(body).filter(val => val != null && val != poolBarcode && val != '')
    conn.query(`INSERT INTO Pool VALUES ('${poolBarcode}');`, (err, result) => {
        if (err) {
            console.log(err)
        }
    })
    //inserting poolmaps into database
    testBarcodes.forEach(tb => 
        conn.query(`INSERT INTO PoolMap VALUES ('${poolBarcode}', '${tb}');`, (err, result) => {
            if (err) {
                console.log(err)
            }
        }
    ))
}

function poolMappingView(res){
    conn.query(`SELECT * FROM poolmap`, (error, result) => {
        if (error){
            console.log(error)
            res.render(path.resolve('./public/views/poolMapping.html'), {poolmap: ''})
        }
        let tableData = []
        for(i = 0; i < result.length; i++){
            let found = false
            for(j = 0; j < tableData.length; j++){
                if(result[i].poolBarcode == tableData[j].poolBarcode){
                    tableData[j].testBarcodes.push(result[i].testBarcode)
                    found = true
                    break
                }
            }
            if(!found){
                tableData.push({
                    poolBarcode: result[i].poolBarcode,
                    testBarcodes: [result[i].testBarcode]
                })
            }
        }
        res.render(path.resolve('./public/views/poolMapping.html'), {poolmap: tableData})
    })
}

module.exports.writeGet = writeGet;
module.exports.writePost = writePost;