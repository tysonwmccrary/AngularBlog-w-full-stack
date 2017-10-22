var express = require('express');
var passport = require('passport');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var LocalStrategy = require('passport-local').Strategy;
var userProc = require('../procedures/users.proc');
var pool = require('./db').pool;
var utils = require('../utils');

function configurePassport(app) {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, function (email, password, done) {
        var loginError = 'Password Invalid Please Try Again';
        userProc.readByEmail(email).then(function (user) {
            if (!user) {
                return done(null, false, { message: loginError });
            }

            return utils.checkPassword(password, user.password)
                .then(function (matches) {
                    if (matches) {
                        // if the password they are using to log in matches the hash in the database after hashing/salting
                        delete user.password;  //This is deleted so it want be avaiable in the front end.  Deleting from the user variable.
                        return done(null, user);
                    } else {
                        // if the password they are using to log in does not match the hash in the database after hashing/salting
                        return done(null, false, { message: loginError });
                    }
                });
        }).catch(function (err) {
            return done(err);
        });
    }));

    //This specifies the specific user that matches above password, and notify by the user id.
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    //When the id is selected it will return to useProc.js and run the GetUser stored procedure and use that id and provide the user.
    passport.deserializeUser(function (id, done) {
        userProc.read(id).then(function (user) {
            done(null, user);
        }, function (err) {
            done(err);
        });
    });

    //The code below has to be in order to operate correctly.
    //This is make a table of the user email and password.
    var sessionStore = new MySQLStore({
        createDatabaseTable: true
    }, pool);

    app.use(session({
        secret: 'random string!',
        store: sessionStore,
        resave: false,
        saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());
}

module.exports = configurePassport;