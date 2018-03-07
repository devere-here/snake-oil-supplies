const Sequelize = require('sequelize')
const db = require('../db')

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

})

module.exports = Product
