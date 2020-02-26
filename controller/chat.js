const express = require('express');
const router = express.Router();

router.get('/*', (req,res) => {
    console.log('Serving');
    res.render('chat');
});

module.exports = router;