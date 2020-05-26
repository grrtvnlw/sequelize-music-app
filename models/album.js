'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    Album_Name: DataTypes.STRING,
    Year: DataTypes.STRING,
    Artist_ID: DataTypes.STRING
  }, {});
  Album.associate = function(models) {
    Album.belongsTo(models.Artist);
    Album.hasMany(models.Track);
  };
  return Album;
};