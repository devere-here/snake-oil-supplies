const Sequelize = require('sequelize')
const db = require('../db')
//const {Order, OrderDetail} = require('./index')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'https://placeimg.com/640/480/animals',
  },
  rating: {
    type: Sequelize.DECIMAL,
    //NOTE eventually we want to pull data from the reviews table and calculate this field using a virtual getter
    validate: {
      min: 0,
      max: 5
    }
  },
  review: {
    type: Sequelize.TEXT,
  }

})

module.exports = Product
