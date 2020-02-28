const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/:name', (req, res) => {
    console.log(`Someone wants to talk with ${req.params.name}`);
    // check if name exists
    db.user.findOne({
        where: { name: req.params.name }
    }).then((response) => {
        console.log(response);
        res.render('chat', { currentPartner: response });
    });
    // render chat with some user information

});

router.get('/*', (req, res) => {
    res.render('chat');
});

module.exports = router;