exports.isLoggedIn = function (req, res, next) {
    if (req.user) {  //This is set by the passport.js and links it to a logged in user in the database.
        next();
    } else {
        res.sendStatus(401);  //Doesn't recoginze and must use the create log in information.
    }
}

exports.isAdmin = function (req, res, next) {
    if (req.user.role === 'admin') {
        next();
    } else {
        res.sendStatus(403);  //This let the user log in however, you are not the admin, so access denied.
    }
}

//This is used from the user.ctrl.js file for the logged in/out information.
//