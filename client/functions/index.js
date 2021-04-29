const functions = require("firebase-functions");
const firebase = require('firebase');
require('firebase/firestore');
const firebaseConfig = {
    apiKey: "AIzaSyC01CSvEjPEmhjP7ZW4OHRB2b_QBL0vuus",
    authDomain: "application-tracker-cmr6689.firebaseapp.com",
    databaseURL: "https://application-tracker-cmr6689-default-rtdb.firebaseio.com",
    projectId: "application-tracker-cmr6689",
    storageBucket: "application-tracker-cmr6689.appspot.com",
    messagingSenderId: "226125838970",
    appId: "1:226125838970:web:580cba205a50cebb6fd9c3",
    measurementId: "G-8E8DW0HPTY"
};
firebase.initializeApp(firebaseConfig);

const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors({origin: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

let db = firebase.firestore();
//Get users
app.get("/api/users", async (req, res) => {
    let users = [];
    await db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            users.push(doc.data());
        });
    });
    res.json({
        "message":"success",
        "data":users
    });
});

//Get applications
app.get("/api/applications", async (req, res) => {
    let apps = [];
    await db.collection("applications").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            apps.push(doc.data());
        });
    });
    res.json({
        "message":"success",
        "data":apps
    });
});

//Add a user
app.post("/api/addUser", (req, res) => {
    db.collection("users").doc(req.body.username).set({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        .then(() => {
            console.log("Document successfully written!");
            res.send('User Added!');
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        })
    res.send("User Added!");
});

//Add an application
app.post("/api/addApplication", (req, res) => {
    let docTitle = req.body.username.concat(req.body.jobTitle, req.body.company);
    db.collection("applications").doc(docTitle).set({
        username: req.body.username,
        jobTitle: req.body.jobTitle,
        company: req.body.company,
        notes: req.body.notes,
        status: req.body.status
    })
        .then(() => {
            console.log("Document successfully written!");
            res.send('Application Added!');
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        })
});

//Remove an application
app.post("/api/removeApplication", (req, res) => {
    let docTitle = req.body.username.concat(req.body.jobTitle, req.body.company)
    db.collection("applications").doc(docTitle).delete().then(() => {
        console.log("Document successfully deleted!");
        res.send("Application Removed!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    })
});

//Update application status
app.post("/api/updateStatus", (req, res) => {
    const path = req.body.username.concat(req.body.jobTitle, req.body.company);
    const docRef = db.collection("applications").doc(path);
    return db.runTransaction((transaction) => {
        return transaction.get(docRef).then((doc) => {
            if (!doc.exists) {
                throw "Document does not exist!";
            }
            let newStatus = req.body.status;
            transaction.update(docRef, { status: newStatus });
        });
    }).then(() => {
        console.log("Transaction successfully committed!");
        res.send("Status Updated!");
    }).catch((error) => {
        console.log("Transaction failed: ", error);
    });
});

//Default response
app.use(function(req, res) {
    res.status(404);
})

exports.api = functions.https.onRequest(app);
