const express = require('express');
const router = express.Router();

router.get('/list', (req,res) => {
    let bots = [
        {img_url: `/img/image.jpg`},
        {img_url: `/img/img_1582578142554.jpg`},
        {img_url: `/img/img_1582578205131.jpg`},
        {img_url: `/img/img_Allergies_Settings.jpg`},
        {img_url: `/img/img_Body_Nuclear.jpg`},
        {img_url: `/img/img_Elevator_YouTube.jpg`}
    ];
    res.render('available/list', {bots: bots});
});

router.get('/*', (req,res) => {
    res.render('404');
});

module.exports = router;