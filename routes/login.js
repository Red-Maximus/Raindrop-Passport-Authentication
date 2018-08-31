const express = require('express'),
    router = express.Router(),
    userDB = require('../auth').userDB,
    HydrogenAPI = require('../auth').HydrogenAPI;

/* If user found, redirect to the hydro page for authentication */
router.post('/login', function(req, res, next) {
    // Switch the Hydrogen API to the correct environment
    HydrogenAPI.switchEnv(req.body.environment);

    // Find a user with the given username and password
    let loggedInUser = userDB.find(user => user.username === req.body.username && user.password === req.body.password);

    //Store the user in the session if found
    if(loggedInUser) { req.session.user = loggedInUser;}

    res.redirect(loggedInUser ? '/hydro' : '/fail');
});

module.exports = router;