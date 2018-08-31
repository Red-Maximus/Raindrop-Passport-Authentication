const express = require('express'),
    HydrogenAPI = require('../auth').HydrogenAPI,
    router = express.Router();

/* Initialize passport for this route */

/* Register user. */
router.post('/register', async function(req, res) {
    // Switch the Hydrogen API to the correct environment
    HydrogenAPI.switchEnv(req.body.environment);

    // Preserve the 'registerId' in the session
    req.session.registerId = req.body.registerId;

    // Register the user to this application
    await HydrogenAPI.raindrop.partner.registerUser(req.session.registerId).catch(err => err);

    // Generate a message so the user can verify the registration
    req.session.registerMessage = HydrogenAPI.raindrop.generateMessage();

    res.render('register', { title: 'Express' , registerMessage: req.session.registerMessage });
});

router.post('/confirm', async function(req, res) {
    // Verify that the user has signed with the message
    let verifyRes = await HydrogenAPI.raindrop.partner.verifySignature(req.session.registerId, req.session.registerMessage).catch(err => err);

    verifyRes.verified ? res.redirect('/') : res.redirect('/fail');
});

module.exports = router;