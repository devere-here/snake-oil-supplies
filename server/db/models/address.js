const Sequelize = require('sequelize')
const db = require('../db')
const {User} = require('./index')

const Address = db.define('address', {
  nickname: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  street: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  state: {
    type: Sequelize.STRING,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  zipCode: {
    type: Sequelize.NUMBER,
    validate: {
      len: [5, 5],
    },
  },
  country: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone: {
    type: Sequelize.NUMBER,
    validate: {
      len: [10, 10],
    },
    get () {
      const phoneNumber = this.getDataValue('phone');
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
    }
  }

});

Address.belongsMany(User, {through: 'ShippingOrBilling'});
User.belongsMany(Address, {through: 'ShippingOrBilling'});

module.exports = Address;
