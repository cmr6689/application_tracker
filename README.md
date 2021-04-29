# Application Tracker

This full-stack web application is used for tracking job applications.

---

## Installation and Run

- ```git clone https://github.com/cmr6689/application_tracker.git```
- ```git checkout main```
- ```cd application_tracker/api/```
- ```npm install```
- ```npm start```
- ```cd ../client/```
- ```npm install```
- ```npm start```
- Open http://localhost:3000/ in any browser.

---

## Functionality
### Registration
:warning: **User data is not secure or encrypted, avoid using personal data.**

Create an account to create new applications and access past applications.

### Login
Once an account has been created, it will be stored in a local SQLite database allowing users to login and access their data.

### Adding Applications
Applications can be added to an account after logging in by using the "Add Application button". Fill in the fields and choose the current status of your application.

### Updating Application Status
Click on the status button located on your application and choose a new status to update the application to.