    const passport = require('passport');
    const LocalStrategy= require('passport-local').Strategy;
    const db = require('../models');
    passport.serializeUser((user,cb)=>{
        cb(null, user.id);
    });

    passport.deserializeUser((id, cb)=>{
        db.user.findByPk(id).then(user => {
            cb(null,user);
        }).catch(err => { // catch(cb)
            cb(err,null);
        });
    });

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function(email, password, cb) {
        db.user.findOne({
            where: {
                email: email
            }
        }).then(
            (user) => {
                if (!user || !user.validPassword(password)) {
                    cb(null,false);
                } else {
                    cb(null, user);
                }
            }
        ).catch(cb);
    }
    ));

    module.exports = passport;