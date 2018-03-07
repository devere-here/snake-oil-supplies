const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')
const User = db.model('user')
const Order = db.model('order')

describe('Order routes', () => {
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

  const users = [
    {
      email: 'admin@admin.com',
      password: '1234',
      isAdmin: true,
      isGuest: false
    },
    {
      email: 'marko@johnny.com',
      password: '666',
      isAdmin: false,
      isGuest: false
    }
  ]

  before( async () => {
    const synced = await db.sync({force: true})
    Product.bulkCreate(products)
    User.bulkCreate(users)
    Order.create({userId: 1, completed: false})

  })

  xit('creates a session if none exist - GET /api/orders', async () => {
    const agent = request.agent(app)
    const res1 = await agent
    .post('/auth/login')
    .send({email: 'admin@admin.com',
    password: '1234'})
    .expect(200)

    const res2 = await agent
    .get('/api/orders')
    .expect(200)
    console.log('agent', agent.jar.CookieJar)
    expect(res2.body).to.be.an('object')
    expect(res2.body.id).to.be.equal(agent.getCookie)

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

   // end describe('/api/products')
}) // end describe('Products routes')
