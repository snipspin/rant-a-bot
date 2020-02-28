const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require('../config/ppConfig');

// router.get('/signup', (req, res) => {
//     res.render('auth/signup');
// });

router.post('/signup', (req, res) => {
    console.log(req.body);
    db.user.findOrCreate({
        where: {
            email: req.body.email
        },
        defaults: {
            name: req.body.user_name,
            password: req.body.password,
            bot: 0
        }
    }).then(([user, created]) => {
        if (created) {
            console.log('User was created');
            passport.authenticate('local', {
                successRedirect: '/',
                successFlash: 'Thanks for signing up!'
            })(req, res);
            // res.redirect('/');
        } else {
            console.log('email already exist');
            req.flash('error', 'Email already exists');
            res.redirect('/');
        }
    }).catch(err => {
        console.log('💥 Error occured finding or creating the user');
        console.log(err);
        req.flash('error', err);
        res.redirect('/')
    });
});

// router.get('/login', (req, res) => {
//     res.render('auth/login');
// });

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    successFlash: 'Welcome!',
    failureFlash: 'Invalid credentials'
}));

router.get('/logout', (req, res) => {
    req.logOut();
    req.flash('success', 'logged out');
    res.redirect('/');
});

module.exports = router;