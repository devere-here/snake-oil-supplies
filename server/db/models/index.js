const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const OrderDetail = require('./orderDetail')

User.hasMany(Order)
Order.belongsTo(User);

Order.belongsToMany(Product, {through: OrderDetail})
Product.belongsToMany(Order, {through: OrderDetail})

module.exports = {
  User,
  Product,
  Order,
  OrderDetail
}
