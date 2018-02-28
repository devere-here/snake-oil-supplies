const Sequelize = require('sequelize')
const db = require('../db')
const {User} = require('./index')

const CreditCard = db.define('creditCard', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  number: {
    type: Sequelize.NUMBER,
    unique: true,
    allowNull: false,
    validate: {
      isCreditCard: true,
    },
  },
  securityCode: {
    type: Sequelize.NUMBER,
    allowNull: false,
    validate: {
      len: [3, 4],
    },
  },
  expiration: {
    type: Sequelize.DATE,
    allowNull: false,
  }
});

CreditCard.belongsTo(User);

module.exports = CreditCard;
