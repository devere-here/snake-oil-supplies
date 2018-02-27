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
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  rating: {
    type: Sequelize.DECIMAL,
    //NOTE eventually we want to pull data from the reviews table and calculate this field using a virtual getter
    validate: {
      min: 0,
      max: 5
    }
  },
  
})

module.exports = Product
