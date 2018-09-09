const express = require('express'),
    router = express.Router(),
    HydrogenAPI = require('../auth').HydrogenAPI;

/* GET fail page. */
router.get('/fail', function(req, res) {
    res.render('fail', { title: 'Failure', API: HydrogenAPI });
});
 
module.exports = router;
