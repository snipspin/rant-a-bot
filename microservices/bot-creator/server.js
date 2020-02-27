require('dotenv').config({ path: require('find-config')('.env') })
const cloudinary = require('cloudinary');
const express = require('express');
const app = express();
const axios = require('axios');
const db = require('../../models');

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

app.post('/create', (req,res) => {
    // send status code 200 
    res.status(200).send();
    createNewBotUser();
});

app.post('/create/bulk/:amount', (req,res) => {
    // send status code 200 
    res.status(200).send();
    let amount = req.params.amount;
    if (amount > 0 && !isNaN(amount)) {
        bulkCreateNewBotUser(amount);
    }
});

app.all('/*', function (req, res) {
    let message = {message: `Page Not Found`};
    res.status(404).send(message);
})

async function bulkCreateNewBotUser(nums) {
    for (let num = 0; num < nums; num++) {
        await createNewBotUser();
    }
};

async function createNewBotUser() {
    await getNewUserData().then((response) => 
    {
        console.log(`sup`);
        console.log(response);
        // add user to database
        
        db.user.findOrCreate(
            {
                where: {
                    name: response.userName
                },
                defaults: {
                    email: response.userEmail,
                    password: response.userPassword,
                    image: response.userImage,
                    advice: response.userAdvice,
                    bot: 1
                }
            }
        )
        .then(([user, created]) => {
            if (created) {
                console.log('👍 User was created');
            }
            else {
                console.log('🔥 User can not be created');
            }
        });
        
    })
};

async function getNewUserData() {
    let newUserName = await getNewUserName();
    let newUserImage = await getNewUserImage(newUserName);
    let newUserAdvice = await getNewUserAdvice();
    console.log('advice is');
    console.log(newUserAdvice.data.slip);
    return {
        userName: newUserName,
        userEmail: `${newUserName}+rant-a-bot@example.com`,
        userIsBot: 1,
        userPassword: 'thisisabot',
        userImage: newUserImage,
        userAdvice: newUserAdvice.data.slip.advice
    }
}

async function getNewUserAdvice() {
    const response = await axios.get(`${process.env.ADVICE_SLIP_URL}`)
    .then(response => {
        return response;
    }).catch(()=> { console.log('🔥 error'); return false; });
    return response;
};

async function getNewUserName() {
    const response = await axios.get(`${process.env.DRYCODES_URL}`).then(
        (response) => {
            return response.data[0];
        }
    ).catch(()=>{return false});
    return response;
};

function getNewUserImage(newUserName) {
    return new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload(process.env.GAN_IMAGE_URL,{ folder: "GAN/", 
      public_id: newUserName }, (err, url) => {
        if (err) return reject(err);
        return resolve(url.url);
      })
    });
  }

app.listen((process.env.BOT_CREATOR_MICROSERVICE_PORT || 3002), ()=> console.log(`bot-creator 🎧 on port ${(process.env.BOT_CREATOR_MICROSERVICE_PORT || 3002)}`));
module.exports = app;