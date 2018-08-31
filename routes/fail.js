const express = require('express'),
    router = express.Router();

/* GET fail page. */
router.get('/fail', function(req, res) {
    res.send('Whoops');
});
 
module.exports = router;
