'use strict';
module.exports = (sequelize, DataTypes) => {
  const chat = sequelize.define('chat', {
    humanId: DataTypes.INTEGER,
    botId: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {});
  chat.associate = function(models) {
    // associations can be defined here
  };
  return chat;
};