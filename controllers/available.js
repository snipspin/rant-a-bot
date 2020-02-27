const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/list', async(req,res) => {
    
    db.user.findAll({where:{bot: 1}}).then(
        (response)=> {    
            let bots = [];        
            response.forEach(user => {
                bots.push(
                    {
                        name: user.name,
                        img: user.image,
                        advice: user.advice
                    }
                    );
            });
            return bots;
        }
        
    ).then((response) => {
        res.render('available/list', {bots: response});
    }).catch((err) => {
        res.render('404');
    });
    
});

router.get('/*', (req,res) => {
    res.render('404');
});

module.exports = router;