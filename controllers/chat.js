const express = require('express');
const router = express.Router();
const db = require('../models');
const chatHistory = require('./chatHistory');

router.get('/:name', async(req, res) => {
    // this chat is with a particular bot

    // find the bot in the database
    db.user.findOne({
        where: { name: req.params.name }
    }).then(async(response) => {
        // console.log(response);
        let lastChat = await chatHistory.getChatRecord(req.user.id, response.id);
        console.log(`🍺`);
        console.log(lastChat);
        if (lastChat == null) {
            res.render('chat', { currentPartner: response, lastChat: "" });
        } else {
            res.render('chat', { currentPartner: response, lastChat: lastChat.content });
        }
    });
});

router.get('/*', (req, res) => {
    res.render('chat');
});

// function updateChatRecord(textObj) {
//     console.log(textObj);
// }

module.exports = router;