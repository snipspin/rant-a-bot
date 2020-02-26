require('dotenv').config({ path: require('find-config')('.env') })
const express = require('express');
const app = express();

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

app.all('/*', function (req, res) {
    let message = {message: `Page Not Found`};
    res.status(404).send(message);
})

app.listen((process.env.BOT_CREATOR_MICROSERVICE_PORT || 3000), ()=> console.log(`bot-creator 🎧 on port ${(process.env.BOT_CREATOR_MICROSERVICE_PORT || 3000)}`));
module.exports = app;