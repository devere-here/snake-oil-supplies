const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')
const User = db.model('user')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    const productShoes = {
      name: 'shoes',
      category: 'apparel',
      price: 600,
      imageUrl: 'https://bluebananastatic-ooxqkrt4ejgeg.stackpathdns.com/shopimages/products/normal/79279.jpg',
      rating: 5,
      description: `it's shoes...`
    }
    const productSocks = {
      name: 'socks',
      category: 'apparel',
      price: 60,
      imageUrl: 'http://scene7.zumiez.com/is/image/zumiez/pdp_hero/Magnum-Snake-Skin-Sublimated-Crew-Socks-_227164-front.jpg',
      rating: 5,
      description: `it's socks...`
    }
    const normalUser = {
      email: 'norm@al.com',
      password: 'normal',
    }
    const adminUser = {
      email: 'ad@min.com',
      password: 'password',
      isAdmin: true,
    }

    beforeEach(() => {

      return (
        Product.create(productShoes)
        .then(
          Product.create(productSocks)
        )
        .then(
          User.create(normalUser)
        )
        .then(
          User.create(adminUser)
        )
      )
    })

    it('fetches all products from the database - GET /api/products', () => {
      return request(app)
        .get('/api/products')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(2)
          expect(+res.body[0].rating).to.be.equal(productShoes.rating)
          expect(res.body[0].category).to.be.equal(productShoes.category)
        })
    })
    it('fetches one product from the database - GET /api/products/1', () => {
      return request(app)
        .get('/api/products/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          //expect(res.body.description).to.be.equal(productShoes.description)
          //expect(res.body[0].category).to.be.equal(aProduct.category)
        })
    })
    
  }) // end describe('/api/products')
}) // end describe('Products routes')
