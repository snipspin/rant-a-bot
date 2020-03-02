const express = require('express');
const router = express.Router();
const db = require('../models');
const { Op } = require("sequelize");

router.get('/', (req, res) => {
    if (!req.user) {
        res.render('profile/guest_profile');
    } else {
        if (!req.user) {
            res.render('profile/guest_profile');
        }
        db.user.findOne({
            where: {
                id: req.user.id
            }
        }).then(
            (data) => {
                res.render('profile/user_profile', { data });
            }
        ).catch(() => {
            res.render('404');
        });
    }
});

// list all users
router.get('/all', async(req, res) => {
    if (!req.user) {
        res.render('profile/guest_profile');
    } else {
        db.user.findAll({}).then(
            (response) => {
                let users = [];
                response.forEach(user => {
                    users.push({
                        id: user.id,
                        name: user.name,
                        img: user.image,
                        advice: user.advice,
                        bot: user.bot
                    });
                });
                return users;
            }

        ).then((response) => {
            res.render('profile/list', { bots: response });
        }).catch((err) => {
            res.render('404');
        });
    }
});

router.get('/:id', (req, res) => {
    if (!req.user) {
        res.render('profile/guest_profile');
    }
    db.user.findOne({
        where: {
            id: req.params.id
        }
    }).then(
        (data) => {
            res.render('profile/show_profile', { data });
        }
    ).catch(() => {
        res.render('404');
    });
});

// User wants to edit their profile
router.get('/:id/edit', (req, res) => {
    if (!req.user) {
        res.render('profile/guest_profile');
    } else if (req.params.id != req.user.id) {
        res.redirect(`/profile/${req.params.id}`);
    } else if (req.params.id == req.user.id) {
        db.user.findOne({
            where: {
                id: req.params.id
            }
        }).then(
            (data) => {
                res.render('profile/edit_profile.ejs', { data });
            }
        ).catch(() => {
            res.render('404');
        })

    }
});

router.post('/:id/edit', async(req, res) => {
    let result = {};
    if (req.params.id != req.user.id) {
        res.status(400).send();
    }
    // update username but first check if in use
    let userRecord = await db.user.findOne({
        where: {
            name: req.body.user_name
        }
    });

    let emailRecord = await db.user.findOne({
        where: {
            email: req.body.email
        }
    });

    if (userRecord == null) {
        await db.user.update({
            name: req.body.user_name
        }, {
            where: {
                id: req.user.id
            }
        }).then(result['user_name'] = `ok`);
    }

    if (req.body.password.length >= 9 && req.body.password === req.body.password_repeated) {
        await db.user.update({
            password: req.body.password
        }, {
            where: {
                id: req.user.id
            },
            individualHooks: true
        }).then(result['user_password'] = `ok`).catch(err => console.log(err));
    }

    if (req.body.edit_image_url) {
        await db.user.update({
            image: req.body.edit_image_url
        }, {
            where: {
                id: req.user.id
            }
        }).then(result['user_image'] = `ok`);

    };

    if (emailRecord == null) {
        await db.user.update({
            email: req.body.email
        }, {
            where: {
                id: req.user.id
            }
        }).then(result['user_email'] = `ok`);
    };
    res.send(result);
});

router.post('/delete', (req, res) => {
    if (req.user) {
        // delete all messages
        db.message.destroy({
                where: {
                    [Op.or]: [{
                            receiver: req.user.id
                        },
                        {
                            sender: req.user.id
                        }
                    ]
                }
            })
            .then(() => {
                db.user.destroy({
                    where: {
                        id: req.user.id
                    }
                })
            }).then(() => {
                // log out
                req.logOut();
                res.redirect('/');
            })
            .catch(
                (err) => {
                    console.log(`💥 KABOOM ${err}`);
                }
            );


    } else {
        res.redirect('/');
    }
});


module.exports = router;