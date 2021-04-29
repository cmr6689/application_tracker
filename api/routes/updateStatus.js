var express = require('express');
var router = express.Router();
const db = require('../database');

router.post("/", (req, res) => {
    const insert = 'UPDATE applications SET status = ? WHERE (username = ? AND jobTitle = ? and company = ?)';
    db.run(insert, [req.body.status, req.body.username, req.body.jobTitle, req.body.company]);
    res.send("Status Updated!");
});

module.exports = router;