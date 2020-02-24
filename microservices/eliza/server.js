require('dotenv').config();
const express = require('express');
const app = express();
const eliza = require('./elizaWrapper');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());
app.use(express.json({ type: 'application/json'})); 

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.post('/v1/conversations', (req,res) => {
    // Create a new conversation
    let elizaId = eliza.createInstance();
        if (elizaId >= 0) {
        res.status(201);
        // set header Location to conversation
        res.set('Location', `/v1/conversations/${elizaId}`);
        res.send();
    } else {
        res.status(500).send();
    }
});

app.get('/v1/conversations/:conversationID', (req,res) => {
    // Retrieve messages from a current conversation
    let id = req.params.conversationID;
    if (eliza.hasInstance(id)) {
        res.set('Content-Type', 'application/json');
        res.status(200);
        res.send({ messages_endpoint: `/v1/conversations/${id}/messages`, messages: eliza.getMessagesForConversation(id)});
    }
    else {
        res.status(404).send();
    }
});

app.get('/v1/conversations/:conversationID/messages', (req,res) => {
    // Retrieve messages from a current conversation
    let id = req.params.conversationID;
    if (eliza.hasInstance(id)) {
        res.set('Content-Type', 'application/json');
        res.status(200);
        res.send({ messages_endpoint: `/v1/conversations/${id}/messages`, messages: eliza.getMessagesForConversation(id)});
    }
    else {
        res.status(404).send();
    }
});

app.post('/v1/conversations/:conversationID/messages', (req,res) => {
    // Create a new message
    let id = req.params.conversationID;
    let body = JSON.parse(req.body);
    let msg = body.message;
    if (eliza.hasInstance(id)) {
        eliza.sendMessage(id,msg);
        res.status(201);
        res.send();
    }
    else {
        res.status(404).send();
    }
});


app.get('/*', function (req, res) {
    let message = {message: `Page Not Found`};
    res.status(404).send(message);
})
app.listen(process.env.PORT || 3001);
module.exports = app;