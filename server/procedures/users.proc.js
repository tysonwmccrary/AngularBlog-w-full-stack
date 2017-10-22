var db = require('../config/db.js');

exports.all = function () {
    return db.rows('GetAllUsers');
}

//This is used by passport.js to find the particular user.
exports.read = function(id) {  //Returns the id from the stored procedure.
    return db.row('GetUser', [id]);
}

exports.readByEmail = function(email) {
    return db.row('GetUserByEmail', [email]);
}

exports.create = function(firstName, lastName, email, hash) {
    return db.row('InsertNewUser', [firstName, lastName, email, hash]);  //The reason why row is uesed to because it is getting the LAST_INSERT_ID() from this stored procedure.
}