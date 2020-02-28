require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');

const session = require('express-session');
const passport = require('./config/ppConfig');
const flash = require('connect-flash');

const app = express();
const expressWs = require('express-ws')(app);
const axios = require('axios');

const helmet = require('helmet');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./models');

const clients = new Map();

app.set('view engine', 'ejs');
app.use(layouts);
app.use(express.static('static'));
app.use(express.urlencoded({ extended: false }));

app.use(helmet());
const sessionStore = new SequelizeStore({
    db: db.sequelize,
    expiration: 1800000
});

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore
}));

sessionStore.sync();

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
    res.locals.alerts = req.flash();
    res.locals.currentUser = req.user;
    next();
});


app.ws('/', (ws, req) => {
    clients.set(ws, { client: ws });
    let client = clients.get(ws);
    getChatSession().then(
        (response) => {
            client.chats = { location: response, messageEndpoint: '' };
        }
    ).then((res) => {
        getChatMessages(clients.get(ws)).then((response) => {
                client.chats.messageEndpoint = response.data.messages_endpoint;
                client.client.send(JSON.stringify(response.data));
            })
            .catch((err) => {
                console.log(err);
            })
    });

    ws.on('message', message => {
        console.log('Received -', message);
        let client = clients.get(ws);
        if (client) {
            sendChatMessage(client, message).then((response) => {
                getChatMessages(client).then((response) => {
                    client.client.send(JSON.stringify(response.data));
                })
            });
        }

    });

    ws.on('close', () => {
        clients.delete(ws);
    });
});

async function sendChatMessage(client, text) {
    try {
        let messageJson = JSON.stringify({ message: text });
        const response = axios({
            method: 'post',
            url: `${process.env.ELIZA_MICROSERVICE_URL}${client.chats.messageEndpoint}`,
            data: {
                message: text
            }
        });
        return response;
    } catch (error) {
        console.error(error);
    }
}

async function getChatSession() {
    try {
        const response = await axios.post(`${process.env.ELIZA_MICROSERVICE_URL}/v1/conversations`);
        return response.headers.location;
    } catch (error) {
        console.error(error);
    }
}

async function getChatMessages(client) {
    const response = await axios.get(`${process.env.ELIZA_MICROSERVICE_URL}${client.chats.location}`);
    return response;
}

app.use('/auth', require('./controllers/auth'));
app.use('/available', require('./controllers/available'));
app.use('/chat', require('./controllers/chat'));
app.use('/home', require('./controllers/home'));
app.use('/', require('./controllers/home'));

app.get('/*', (req, res) => {
    res.render('404');
});

app.post('/*', (req, res) => {
    res.render('404');
});

app.listen((process.env.RANT_A_BOT_SERVER_PORT || 3000), () => console.log(`Rant-a-bot 🎧 on port ${(process.env.RANT_A_BOT_SERVER_PORT || 3000)}`));