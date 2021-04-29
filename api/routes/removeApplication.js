var express = require('express');
var router = express.Router();
const db = require('../database');

router.post("/", (req, res) => {
    const del = 'DELETE FROM applications WHERE (username = ? AND jobTitle = ? AND company = ?)';
    db.run(del, [req.body.username, req.body.jobTitle, req.body.company]);
    res.send("Application Removed!");
});

module.exports = router;