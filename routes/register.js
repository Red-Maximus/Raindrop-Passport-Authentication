const express = require('express'),
    HydrogenAPI = require('../auth').HydrogenAPI,
    router = express.Router(),
    environments = require('../auth').environments;

/* Initialize passport for this route */

/* Register user. */
router.get('/register', function(req, res) {
    res.render('register', { title: 'Register' , registerMessage: req.session.registerMessage, API: HydrogenAPI, environments: environments });
});

router.post('/register', async function(req, res, next) {
    HydrogenAPI.switchEnv(req.body.environment);

    req.session.registerId = req.body.registerId;

    // Register the user to this application
    let registerRes = await HydrogenAPI.raindrop.partner.registerUser(req.session.registerId).catch(err => err);

    let renderObj = {
        title: 'Register',
        API: HydrogenAPI
    };

    if(!(registerRes instanceof Error)) {
        // Generate a message so the user can verify the registration. Persists in 'session' for the 'confirm' POST
        req.session.registerMessage = HydrogenAPI.raindrop.generateMessage();
        renderObj.registerMessage = req.session.registerMessage;
        res.render('register', renderObj);
    } else {
        next(registerRes);
    }
});

router.post('/confirm', async function(req, res) {
    // Verify that the user has signed with the message
    let verifyRes = await HydrogenAPI.raindrop.partner.verifySignature(req.session.registerId, req.session.registerMessage).catch(err => err);

    // 'registerMessage' no longer needs to persist
    req.session.registerMessage = null;

    verifyRes.verified ? res.redirect('/') : res.redirect('/fail');
});

module.exports = router;