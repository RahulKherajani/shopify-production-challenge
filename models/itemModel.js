// @Author: Rahul Kherajani
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define(
    'item',
    {
      item_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      item_name: {
        type: DataTypes.STRING,
      },

      item_description: {
        type: DataTypes.STRING(1000),
      },
      
      product_quantity: {
        type: DataTypes.INTEGER,
      },
      product_isactive: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      timestamps: true,
    }
  );

  return Item;
};