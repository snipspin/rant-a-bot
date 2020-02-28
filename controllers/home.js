const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home/home');
});

router.get('/faq', (req, res) => {
    res.render('faq');
});

router.post('/*', (req, res) => {
    console.log('posted');

    console.log(req.body);

    res.render('home/home');
})

module.exports = router;