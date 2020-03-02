'use strict';
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        name: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [1, 99],
                    msg: 'Name must be between 1 and 99 characters'
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: {
                    msg: 'Invalid email address'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [8, 99],
                    msg: 'Password must be between 8 and 99 characters'
                }
            }
        },
        image: DataTypes.STRING,
        advice: DataTypes.STRING,
        bot: DataTypes.INTEGER
    }, {
        hooks: {
            beforeCreate: (createdUser, options) => {
                if (createdUser && createdUser.password) {
                    // hash the password
                    let hash = bcrypt.hashSync(createdUser.password, 10);
                    // store the hash as the users password
                    createdUser.password = hash;
                }
            },
            beforeUpdate: (user) => {
                console.log(user)
                console.log(user.password);
                if (user.password) {
                    // hash the password
                    let hash = bcrypt.hashSync(user.password, 10);
                    // store the hash as the users password
                    user.password = hash;
                }
            }
        }
    });
    user.associate = function(models) {
        // associations can be defined here
    };
    // compares entered password to hashed password
    user.prototype.validPassword = function(passwordTyped) {
        return bcrypt.compareSync(passwordTyped, this.password);
    };

    // remove the password before serializing
    user.prototype.toJSON = function() {
        let userData = this.get();
        delete userData.password;
        return userData;
    }
    return user;
};