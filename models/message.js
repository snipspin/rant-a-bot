'use strict';
module.exports = (sequelize, DataTypes) => {
  const message = sequelize.define('message', {
    sender: DataTypes.INTEGER,
    receiver: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    timestamp: DataTypes.STRING
  }, {});
  message.associate = function(models) {
    // associations can be defined here
  };
  return message;
};