// @Author: Rahul Kherajani
module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define(
    'city',
    {
      city_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      city_name: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
    }
  );

  return City;
};