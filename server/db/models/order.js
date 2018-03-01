const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  completed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  shippingAddress: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Order;
