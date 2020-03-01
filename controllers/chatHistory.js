const db = require('../models');

async function getChatRecord(userId, botId) {
    //let botId = getBotData(bot);
    console.log(`Bot id: ${botId}`);
    return await db.chat.findOne({
        where: {
            humanId: userId,
            botId: botId
        }
    });
}

async function updateChatRecord(text, userId, bot) {
    console.log(`Update chat record between: ${userId} and: ${bot}`);
    console.log(text);
    let botId = -1;
    let contentJSON = JSON.stringify(text);

    let botData = await getBotData(bot).then((response) => {
        botId = response.id;
        db.chat.findOrCreate({
                where: {
                    humanId: userId,
                    botId: botId
                },
                defaults: {
                    content: contentJSON
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .then(([chat, created]) => {
                if (!created) {
                    db.chat.update({
                        content: contentJSON
                    }, {
                        where: {
                            humanId: userId,
                            botId: botId
                        }
                    })
                }
            }).catch((err) => {
                console.log(err);
            })
    });
}

async function getBotData(bot) {
    return db.user.findOne({
        where: {
            name: bot,
            bot: 1
        }
    });
}

module.exports.updateChatRecord = updateChatRecord;
module.exports.getChatRecord = getChatRecord;