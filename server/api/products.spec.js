const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  const products = [
    {
      name: 'shoes',
      category: 'apparel',
      price: 600,
      imageUrl: 'https://bluebananastatic-ooxqkrt4ejgeg.stackpathdns.com/shopimages/products/normal/79279.jpg',
      rating: 5,
      description: `it's shoes...`
    },
    {
      name: 'socks',
      category: 'apparel',
      price: 60,
      imageUrl: 'http://scene7.zumiez.com/is/image/zumiez/pdp_hero/Magnum-Snake-Skin-Sublimated-Crew-Socks-_227164-front.jpg',
      rating: 5,
      description: `it's socks...`
    }
  ]

  before( async () => {
    await db.sync({force: true})
    Product.bulkCreate(products)
  })

  it('fetches all products from the database - GET /api/products', async () => {

    const res = await request(app)
    .get('/api/products')
    .expect(200)

    expect(res.body).to.be.an('array')
    expect(res.body.length).to.be.equal(products.length)
    expect(res.body[0].category).to.be.equal(products[0].category)
  })

  // xit('fetches one product from the database - GET /api/products/1', async () => {
  //   const res = await request(app)
  //     .get('/api/products/1')
  //     .expect(200)

  //     expect(res.body).to.be.an('object')
  //     expect(res.body.description).to.be.equal(productShoes.description)
  //     expect(res.body[0].category).to.be.equal(aProduct.category)
  // })

   // end describe('/api/products')
}) // end describe('Products routes')
