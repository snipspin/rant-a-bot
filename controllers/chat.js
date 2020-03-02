const express = require('express');
const router = express.Router();
const db = require('../models');
const chatHistory = require('./chatHistory');

router.get('/:name', async(req, res) => {
    // this chat is with a particular bot
    let messages = [];
    // find the bot in the database
    db.user.findOne({
        where: { name: req.params.name }
    }).then(async(response) => {
        if (req.user) {
            // if the client is logged in, check for message history
            chatHistory.getChatHistory(req.params.name, req.user.id).then((data) => {
                    data.forEach(element => {
                        messages.push({ text: element.content, timestamp: element.timestamp, from_server: (element.sender === req.user.id) ? false : true })
                    });
                }).then(() => {
                    res.render('chat', { currentPartner: response, lastChat: JSON.stringify(messages) });
                })
                .catch((err) => {
                    console.log(`🔥`);
                    console.log(err);
                    res.render('chat', { currentPartner: response, lastChat: "" });
                });
        } else {
            res.render('chat', { currentPartner: response, lastChat: "" });
        }
    });
});

router.get('/*', (req, res) => {
    res.render('chat');
});

module.exports = router;