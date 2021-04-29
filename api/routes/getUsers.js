var express = require('express');
var router = express.Router();
const db = require('../database');

router.get("/", (req, res, next) => {
    var sql = "select * from user";
    var params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return 0;
        }
        res.json({
            "message":"success",
            "data":rows
        });
    });
});

module.exports = router;