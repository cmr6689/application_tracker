var express = require('express');
var router = express.Router();
const db = require('../database');

router.post("/", (req, res, next) => {
    const insert = 'INSERT INTO user (username, email, password) VALUES (?, ?, ?)';
    db.run(insert, [req.body.username, req.body.email, req.body.password]);
    console.log("POST /api/addUser");
});

module.exports = router;