const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const OrderDetail = require('./orderDetail')
const Review = require('./review')


User.hasMany(Order)
Order.belongsTo(User);

Order.belongsToMany(Product, {through: OrderDetail})
Product.belongsToMany(Order, {through: OrderDetail})
User.belongsToMany(Product, {through: Review})
Product.belongsToMany(User, {through: Review})

module.exports = {
  User,
  Product,
  Order,
  OrderDetail,
  Review
}
