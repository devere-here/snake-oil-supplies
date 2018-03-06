const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  completed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  shippingStreet: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  shippingCity: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  shippingState: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  shippingCountry: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  shippingZipCode: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  shipped: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  canceled: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },


});

module.exports = Order;
