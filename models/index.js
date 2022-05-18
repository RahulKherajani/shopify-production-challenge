const { DataTypes } = require('sequelize');
const DBConnection = require('../config/dbConfig');

const Product = require('./itemModel.js');
const City = require('./cityModel.js');
const Comment = require('./commentModel.js');

const ProductModel = Product(DBConnection, DataTypes);
const CityModel = City(DBConnection, DataTypes);
const CommentModel = Comment(DBConnection, DataTypes);



EventsModel.hasMany(EventBookingsModel, {
  foreignKey: 'event_id',
  as: 'eventBookings',
});
EventBookingsModel.belongsTo(EventsModel, { as: 'event' });

OrderHeaderModel.hasMany(OrderLineModel, {
  as: 'order_line',
  foreignKey: 'order_header_id',
});

OrderLineModel.belongsTo(OrderHeaderModel, {
  foreignKey: 'order_header_id',
});

OrderLineModel.belongsTo(ProductModel, {
  foreignKey: 'order_product_id',
  targetKey: 'product_id',
});

ProductModel.hasOne(OrderLineModel, {
  foreignKey: 'order_product_id',
  sourceKey: 'product_id',
});

ProductModel.hasMany(ProductSizeModel, {
  as: 'product_size',
  foreignKey: 'product_id',
});
ProductSizeModel.belongsTo(ProductModel, {
  foreignKey: 'product_id',
});

ProductModel.hasMany(ProductColorModel, {
  as: 'product_color',
  foreignKey: 'product_id',
});
ProductColorModel.belongsTo(ProductModel, {
  foreignKey: 'product_id',
});

CareersModel.hasMany(JobApplicationsModel, {
  foreignKey: 'job_id'
});
JobApplicationsModel.belongsTo(CareersModel, {
  foreignKey: 'job_id'
});

module.exports = {
  ItemModel,
  CityModel,
  CommentModel,
};