const express = require('express'),
    HydrogenAPI = require('../auth').HydrogenAPI,
    router = express.Router(),
    environments = require('../auth').environments;

/* Initialize passport for this route */

/* Register user. */
router.get('/register', function(req, res) {
    console.log(HydrogenAPI.environment);

    res.render('register', { title: 'Register' , registerMessage: req.session.registerMessage, API: HydrogenAPI, environments: environments });
});

router.post('/register', async function(req, res) {
    HydrogenAPI.switchEnv(req.body.environment);

    // Register the user to this application
    await HydrogenAPI.raindrop.partner.registerUser(req.session.registerId).catch(err => err);

    // Generate a message so the user can verify the registration
    req.session.registerMessage = HydrogenAPI.raindrop.generateMessage();

    res.render('register', { title: 'Register' , registerMessage: req.session.registerMessage, API: HydrogenAPI });
});

router.post('/confirm', async function(req, res) {
    // Verify that the user has signed with the message
    let verifyRes = await HydrogenAPI.raindrop.partner.verifySignature(req.session.registerId, req.session.registerMessage).catch(err => err);

    verifyRes.verified ? res.redirect('/') : res.redirect('/fail');
});

module.exports = router;