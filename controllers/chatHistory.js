const db = require('../models');
const { Op } = require("sequelize");

async function storeChatRecordFromBot(text, userId, botName, timestamp) {
    getBotData(botName)
        .then((data) => {
            writeChatRecord(data.id, userId, text, timestamp)
                .catch((err) => {
                    console.log(`🔥 error inserting chat history: `)
                    console.log(err);
                });
        }).catch((err) => {
            console.log(`🔥failed to write chat record from bot`);
            console.log(err);
        })
}

async function writeChatRecord(sender, receiver, content, timestamp) {
    db.message.create({
        sender: sender,
        receiver: receiver,
        content: content,
        timestamp: timestamp
    }).catch((err) => {
        console.log(`🔥 Error storing chat record: ${err}`);
        console.log(err);
    });
}

async function storeChatRecordFromUser(text, userId, botName, timestamp) {
    getBotData(botName).then((data) => writeChatRecord(userId, data.id, text, timestamp))
        .catch((err) => {
            console.log(`🔥 error inserting chat history: `)
            console.log(err);
        });

}

async function getChatHistory(botName, userId) {
    let botData = await getBotData(botName);
    return db.message.findAll({
        limit: 50,
        order: [
            ['timestamp']
        ],
        where: {
            [Op.or]: [{
                    receiver: botData.id,
                    sender: userId
                },
                {
                    receiver: userId,
                    sender: botData.id
                }
            ]
        }
    })

}

async function getBotData(bot) {
    return db.user.findOne({
        where: {
            name: bot,
            bot: 1
        }
    });
}

module.exports.getBotData = getBotData;
module.exports.storeChatRecordFromBot = storeChatRecordFromBot;
module.exports.storeChatRecordFromUser = storeChatRecordFromUser;
module.exports.getChatHistory = getChatHistory;