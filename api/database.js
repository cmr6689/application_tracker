var sqlite3 = require('sqlite3').verbose();
var md5 = require('md5');

const DBSOURCE = 'db.sqlite';

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.log(err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite DB.');
        db.run("CREATE TABLE user (id INTEGER PRIMARY KEY AUTOINCREMENT, username text, email text, password text)",
          (err) => {
            if (err) {
                //table already created
            } else {
                //table just created, create some rows
                var insert = 'INSERT INTO user (username, email, password) VALUES (?, ?, ?)';
                db.run(insert, ['admin', 'admin@example.com', md5('admin123456')]);
                db.run(insert, ['user', 'user@example.com', md5('user123')]);
            }
          });
    }
});

module.exports = db;
