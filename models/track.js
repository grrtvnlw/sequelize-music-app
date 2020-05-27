'use strict';
module.exports = (sequelize, DataTypes) => {
  const Track = sequelize.define('Track', {
    Track_Name: DataTypes.STRING,
    Track_Duration: DataTypes.NUMBER,
    Album_ID: DataTypes.NUMBER
  }, {});
  Track.associate = function(models) {
    Track.belongsTo(models.Album, { foreignKey: 'Album_ID' });
  };
  return Track;
};