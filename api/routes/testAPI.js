var express = require('express');
var router = express.Router();
const db = require('../database.js');

router.get("/api/users", (req, res, next) => {
    var sql = "select * from user";
    var params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return 0;
        }
        /*res.json({
            "message":"success",
            "data":rows
        });*/
        rows.forEach((row) => {
            console.log(row.name);
        })
    });
});

module.exports = router;