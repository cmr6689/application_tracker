var sqlite3 = require('sqlite3').verbose();
var md5 = require('md5');
var db = new sqlite3.Database(":memory:");

db.serialize(() => {
    db.run("CREATE TABLE user (id INTEGER PRIMARY KEY AUTOINCREMENT, name text, email text UNIQUE, password text, CONSTRAINT email_unique UNIQUE (email))");
    var stmt = db.prepare('INSERT INTO user (name, email, password) VALUES (?, ?, ?)');
    stmt.run(['admin', 'admin@exampole.com', md5('admin123')]);
});

db.close();

/*const DBSOURCE = 'db.sqlite';

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.log(err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite DB.');
        db.run("CREATE TABLE user (id INTEGER PRIMARY KEY AUTOINCREMENT, name text, email text UNIQUE, password text, CONSTRAINT email_unique UNIQUE (email))",
          (err) => {
            if (err) {
                //table already created
            } else {
                //table just created, create some rows
                var insert = 'INSERT INTO user (name, email, password) VALUES (?, ?, ?)';
                db.run(insert, ['admin', 'admin@example.com', md5('admin123456')]);
                db.run(insert, ['user', 'user@example.com', md5('user12456')]);
            }
          });
    }
});*/

module.exports = db;
