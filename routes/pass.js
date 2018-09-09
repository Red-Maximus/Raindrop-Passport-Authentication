let express = require('express'),
    router = express.Router(),
    HydrogenAPI = require('../auth').HydrogenAPI;

/* GET users listing. */
router.get('/pass', function(req, res) {
    res.render('pass', { title: 'Success', API: HydrogenAPI });
});
 
module.exports = router;
