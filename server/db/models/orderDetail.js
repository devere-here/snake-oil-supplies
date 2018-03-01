const Sequelize = require('sequelize')
const db = require('../db')
//const {Order, Product} = require('./index')

const OrderDetail = db.define('orderDetail', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
  }
});

module.exports = OrderDetail;
