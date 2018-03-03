const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get () {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: Sequelize.STRING
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  phone: {
    type: Sequelize.INTEGER,
    validate: {
      len: [10, 10]
    },
    // get() {
    //   const number = this.getDataValue('phone');
    //   return `(${number.slice(0, 3)}) ${number.slice(3, 6)} - ${number.slice(6)}`
    // }
  },
  isGuest: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  addressStreet: {
    type: Sequelize.STRING,
  },
  addressCity: {
    type: Sequelize.STRING,
  },
  addressState: {
    type: Sequelize.STRING,
  },
  addressCountry: {
    type: Sequelize.STRING,
  },
  addressZipCode: {
    type: Sequelize.INTEGER,
    validate: {
      len: [5, 5]
    }
  },
  creditCardName: {
    type: Sequelize.STRING,
  },
  creditNumber: {
    type: Sequelize.INTEGER,
    // validate: {
    //   isCreditCard: true
    // }
  },
  creditSecurityCode: {
    type: Sequelize.STRING,
    validate: {
      len: [3, 4]
    }
  },
  creditExpirationDate: {
    type: Sequelize.DATE,
  },
  billingStreet: {
    type: Sequelize.STRING,
  },
  billingCity: {
    type: Sequelize.STRING,
  },
  billingState: {
    type: Sequelize.STRING,
  },
  billingCountry: {
    type: Sequelize.STRING,
  },
  billingZipCode: {
    type: Sequelize.INTEGER,
    validate: {
      len: [5, 5]
    }
  },
})


/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

/**
 * classMethods
 */
User.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function (plainText, salt) {
  return crypto
  .createHash('RSA-SHA256')
  .update(plainText)
  .update(salt)
  .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeBulkCreate(( user ) => user.forEach(setSaltAndPassword))
User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)

module.exports = User
