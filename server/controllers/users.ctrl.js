var express = require('express');
var passport = require('passport'); //Used because it is requested to login.
var procedures = require('../procedures/users.proc.js');
var auth = require('../middleware/auth.mw.js');  
var utils = require('../utils');

var router = express.Router();

//This us used to login and out.
router.post('/login', function(req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        if (!user) {
            return res.status(401).send(info);
        }
        req.logIn(user, function (err) {
            if (err) {
                return res.sendStatus(500);
            } else {
                return res.send(user);
            }
        });
    })(req, res, next);  //This is always next to the closing of passport.authenticate. 
});

router.all('*', auth.isLoggedIn);  //This will send all the above logged in information through the gate of middleware.


//This will logout the user and remove all cookies assoiciated with the user such as password and user information.
router.get('/logout', function (req, res) {
    req.session.destroy(function () {
        req.logOut();
        res.sendStatus(204);
    });
});

//This protects the route, and checks 
router.get('/me', function (req, res) {
    res.send(req.user);
});

//The actual route to api/users.
router.route('/')
    .get(function (req, res) {
        procedures.all()
            .then(function (users) {
                response.send(users);
            }).catch(function (error) {
                console.log(error);
                response.sendStatus(500);
            });
    })
    //This is used from user.proc.js to post the Insert User created.
    //A post request means that a new user is going to be created.
    //Be an admin to to create a new user.
    .post(auth.isAdmin, function(req, res) {
          utils.encryptPassword(req.body.password) //This creates a promise.  This password called on the frontend to be used.
          .then(function(hash) {
            return procedures.create(req.body.firstname, req.body.lastname, req.body.email, hash)  //Return is used to store this.  Hash the passward with utils.
          }).then(function(id) { //Get the id of the new user.
              res.status(201).send(id);  //Sends the id of new user to database.
          }).catch(function(error) {
              console.log(error);
              res.sendStatus(500);
          });
        
    })

module.exports = router;