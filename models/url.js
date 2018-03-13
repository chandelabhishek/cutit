module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Url', {
    id: {
      type: DataTypes.INTEGER,      
      primaryKey: true,
      autoIncrement: true,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
};