var express = require('express');
var path = require("path");
var logger = require('morgan');
var cors = require('cors');
var usersRouter = require('./routes/users');
var getUsers = require("./routes/getUsers");
var addUser = require("./routes/addUser");
var getApplications = require('./routes/getApplications');
var addApplication = require('./routes/addApplication');
var removeApplication = require('./routes/removeApplication');
var updateStatus = require('./routes/updateStatus');
var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use("/api/users", getUsers);
app.use('/api/addUser', addUser);
app.use('/api/applications', getApplications);
app.use('/api/addApplication', addApplication);
app.use('/api/removeApplication', removeApplication);
app.use('/api/updateStatus', updateStatus);

//Default response
app.use(function(req, res) {
    res.status(404);
})

module.exports = app;


