var express = require('express');
var router = express.Router();
const db = require('../database');

router.post("/", (req, res, next) => {
    const insert = 'INSERT INTO applications (username, jobTitle, company, notes, status) VALUES (?, ?, ?, ?, ?)';
    db.run(insert, [req.body.username, req.body.jobTitle, req.body.company, req.body.notes, req.body.status]);
    console.log("POST /api/addApplication");
});

module.exports = router;