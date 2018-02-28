/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db')
const { User, Product } = require('../server/db/models')

const arrUsers = [
  { email: 'marko@lis.com', password: '123' },
  { email: 'esteve@dev.com', password: '123'},
  { email: 'mike@sam.com', password: '123', isAdmin: true },
  { email: 'johnny@ara.com', password: '123', isAdmin: true},
]

const arrProducts = [
  {
    name: 'shoes',
    category: 'apparel',
    description: "it's shoes",
    price: 60,
    imageUrl: 'https://bluebananastatic-ooxqkrt4ejgeg.stackpathdns.com/shopimages/products/normal/79279.jpg',
    rating: 5,
  },
  {
    name: 'wig',
    category: 'apparel',
    description: 'a wig',
    price: 300,
    imageUrl: 'http://www.freakingnews.com/pictures/105500/Snake-with-a-Mohawk-105660.jpg',
    rating: 5,
  },
  {
    name: 'jacket',
    category: 'apparel',
    description: 'a jacket',
    price: 100,
    imageUrl: 'https://cdn.shopify.com/s/files/1/2253/1121/products/snake-skin-jacket-blazer_146c0d52-7c9e-47a7-b47a-82adfe201ac4_580x.jpg?v=1506925944',
    rating: 3,
  },
  {
    name: 'hat',
    category: 'apparel',
    description: 'a hat',
    price: 50,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/71ychBCRYqL._UX425_.jpg',
    rating: 4,
  },
  {
    name: 'socks',
    category: 'apparel',
    description: 'some socks',
    price: 5,
    imageUrl: 'http://scene7.zumiez.com/is/image/zumiez/pdp_hero/Magnum-Snake-Skin-Sublimated-Crew-Socks-_227164-front.jpg',
    rating: 4,
  },
  {
    name: 'watch',
    category: 'apparel',
    description: 'a watch',
    price: 500,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/71ychBCRYqL._UX425_.jpg',
    rating: 3,
  },
  {
    name: 'hoodie',
    category: 'apparel',
    description: 'a luke cage hoodie',
    price: 120,
    imageUrl: 'https://cdnd.lystit.com/photos/f8b9-2014/06/06/christopher-kane-blue-snakeskin-hoodie-product-1-20608812-4-078779323-normal.jpeg',
    rating: 4.5,
  },


  // ******************************** health
  {
    name: 'shoes 2',
    category: 'health',
    description: "it's shoes 2",
    price: 60,
    imageUrl: 'https://bluebananastatic-ooxqkrt4ejgeg.stackpathdns.com/shopimages/products/normal/79279.jpg',
    rating: 5,
  },
  {
    name: 'wig 2',
    category: 'health',
    description: 'a wig 2',
    price: 300,
    imageUrl: 'http://www.freakingnews.com/pictures/105500/Snake-with-a-Mohawk-105660.jpg',
    rating: 5,
  },
  {
    name: 'jacket 2',
    category: 'health',
    description: 'a jacket 2',
    price: 100,
    imageUrl: 'https://cdn.shopify.com/s/files/1/2253/1121/products/snake-skin-jacket-blazer_146c0d52-7c9e-47a7-b47a-82adfe201ac4_580x.jpg?v=1506925944',
    rating: 3,
  },
  {
    name: 'hat 2',
    category: 'health',
    description: 'a hat 2',
    price: 50,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/71ychBCRYqL._UX425_.jpg',
    rating: 4,
  },
  {
    name: 'socks 2',
    category: 'health',
    description: 'some socks 2',
    price: 5,
    imageUrl: 'http://scene7.zumiez.com/is/image/zumiez/pdp_hero/Magnum-Snake-Skin-Sublimated-Crew-Socks-_227164-front.jpg',
    rating: 4,
  },
  {
    name: 'watch 2',
    category: 'health',
    description: 'a watch 2',
    price: 500,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/71ychBCRYqL._UX425_.jpg',
    rating: 3,
  },
  {
    name: 'hoodie 2',
    category: 'health',
    description: 'a luke cage hoodie 2',
    price: 120,
    imageUrl: 'https://cdnd.lystit.com/photos/f8b9-2014/06/06/christopher-kane-blue-snakeskin-hoodie-product-1-20608812-4-078779323-normal.jpeg',
    rating: 4.5,
  },
// ******************* MISC
  {
    name: 'shoes 3.0',
    category: 'misc',
    description: "it's shoes 3.0",
    price: 60,
    imageUrl: 'https://bluebananastatic-ooxqkrt4ejgeg.stackpathdns.com/shopimages/products/normal/79279.jpg',
    rating: 5,
  },
  {
    name: 'wig 3.0',
    category: 'misc',
    description: 'a wig 3.0',
    price: 300,
    imageUrl: 'http://www.freakingnews.com/pictures/105500/Snake-with-a-Mohawk-105660.jpg',
    rating: 5  },
  {
    name: 'jacket 3.O',
    category: 'misc',
    description: 'a jacket 3.O',
    price: 100,
    imageUrl: 'https://cdn.shopify.com/s/files/1/2253/1121/products/snake-skin-jacket-blazer_146c0d52-7c9e-47a7-b47a-82adfe201ac4_580x.jpg?v=1506925944',
    rating: 3,
  },
  {
    name: 'hat 3.0',
    category: 'misc',
    description: 'a hat 3.0',
    price: 50,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/71ychBCRYqL._UX425_.jpg',
    rating: 4,
  },
  {
    name: 'socks 3.0',
    category: 'misc',
    description: 'some socks 3.0',
    price: 5,
    imageUrl: 'http://scene7.zumiez.com/is/image/zumiez/pdp_hero/Magnum-Snake-Skin-Sublimated-Crew-Socks-_227164-front.jpg',
    rating: 4,
  },
  {
    name: 'watch 3.0',
    category: 'misc',
    description: 'a watch 3.0',
    price: 50,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/71ychBCRYqL._UX425_.jpg',
    rating: 3,
  },
  {
    name: 'hoodie 3.0',
    category: 'misc',
    description: 'a luke cage hoodie 3.0',
    price: 120,
    imageUrl: 'https://cdnd.lystit.com/photos/f8b9-2014/06/06/christopher-kane-blue-snakeskin-hoodie-product-1-20608812-4-078779323-normal.jpeg',
    rating: 4.5,
  }
]

async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const tables = await Promise.all([
    User.bulkCreate(arrUsers),
    Product.bulkCreate(arrProducts)
  ])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${tables[0].length} users`)
  console.log(`seeded ${tables[1].length} products`)
  console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
