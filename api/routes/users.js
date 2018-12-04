const express = require('express');
const router = express.Router();
const fs = require('fs');
const dataBase = require('../../model/mysql_pool');
const createPdf = require('../../util/util');


router.patch('/firstName=:name', (req, res, next) => {
	const name = req.params.name;
	dataBase.getByName(name, function(err, rows, fields) {
		if (err) {
            res.json({"result": false}); 
            return;
        }
        let result = (JSON.parse(JSON.stringify(rows))[0]);
        if(result){
        	createPdf(result);
        	return;
        }
    });

    fs.readFile(appRoot + '/pdf/file.pdf', (err, pdfBuffer) => {
        dataBase.setPdf(name, pdfBuffer, function(err, rows, fields) {
        	if (err) {
        		res.json({"result": false}); 
        		return;
        	}else {
        		let result = (JSON.parse(JSON.stringify(rows)).affectedRows);
            	if(result){
            		res.json({"result": true});
            	}else {
            		res.json({"result": false});
            	}
        	}
        });   
    });   
});


module.exports = router;