const express = require('express'),
    passport = require('../auth').passport(),
    HydrogenAPI = require('../auth').HydrogenAPI;

let hydro = express();

/* Initialize passport for this route */
hydro.use(passport.initialize());
hydro.use(passport.session());

/* GET hydro page. */
hydro.get('/hydro', function(req, res) {
    // Generate the message to display
    req.session.hydroMessage = HydrogenAPI.raindrop.generateMessage();
    res.render('hydro', { title: 'Express' , hydroMessage: req.session.hydroMessage, API: HydrogenAPI });
});

/* Authenticate User */
hydro.post('/hydro', function(req, res, next) {
    passport.authenticate('raindrop', {
        successRedirect: '/pass',
        failureRedirect: '/fail'
    })(req, res, next);
});

module.exports = hydro;