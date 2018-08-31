let express = require('express'),
    router = express.Router();

/* GET users listing. */
router.get('/pass', function(req, res) {
    res.send('Hooray!');
});
 
module.exports = router;
