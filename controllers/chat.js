const express = require('express');
const router = express.Router();

router.get('/:name', (req, res) => {
    console.log(`Someone wants to talk with ${req.params.name}`);
    // check if name exists

    // render chat with some user information
    res.render('chat');
});

router.get('/*', (req, res) => {
    res.render('chat');
});

module.exports = router;