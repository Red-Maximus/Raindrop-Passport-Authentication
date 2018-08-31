const express = require('express'),
    router = express.Router(),
    HydrogenAPI = require('../auth').HydrogenAPI,
    userDB = require('../auth').userDB,
    environments = require('../auth').environments;

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Express', API: HydrogenAPI, users: userDB, environments: environments });
});

module.exports = router;