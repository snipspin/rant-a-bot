const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log(res.locals.currentUser);
    res.render('home/home');
});

router.get('/faq', (req, res) => {
    res.render('faq');
});

router.get('/profile', (req, res) => {
    res.render('profile');
});

module.exports = router;