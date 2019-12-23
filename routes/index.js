const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index')
 //   res.redirect('/entries');
});

module.exports = router;