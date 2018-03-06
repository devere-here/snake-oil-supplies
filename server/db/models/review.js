const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 5
    }
  },
  reviewText: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  emailAddress: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Review;
