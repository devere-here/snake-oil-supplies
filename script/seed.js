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
const { User, Product, Order, OrderDetail } = require('../server/db/models')

const NUM_PRODUCTS = 30;
const NUM_USERS = 30;
const NUM_ORDERS = 100;
const NUM_ORDER_DETAILS = 500;

let arrUsers = [
  { email: 'marko@lis.com', password: '123' },
  { email: 'esteve@dev.com', password: '123'},
  { email: 'mike@sam.com', password: '123', isAdmin: true },
  { email: 'johnny@ara.com', password: '123', isAdmin: true},
]
for (var i = 0; i < NUM_USERS; i++) {
  
  let randomUser = {
    email: `user${i+1}@email.com`,
    password: '123'
  }
  arrUsers.push(randomUser);
}

let arrProducts = []
let categories = {
  apparel: NUM_PRODUCTS,
  health: NUM_PRODUCTS,
  miscellaneous: NUM_PRODUCTS,
}
for (key in categories){
  let randomProduct = {}
  for (var i = 0; i < categories[key]; i++) {
    let randomImageNumber = Math.floor(Math.random() * Math.floor(200))
    randomProduct = {
      name: `${key} ${i}`,
      category: `${key}`,
      description: `description ${i}`,
      price: Math.floor(Math.random() * Math.floor(100)),
      imageUrl: `https://picsum.photos/500/400?image=${randomImageNumber}`,
      rating: Math.floor(Math.random() * Math.floor(5))
    }
    //console.log('randomProduct', randomProduct)
    arrProducts.push(randomProduct);
  }
}

let arrOrders = [];
for (var orderIndex = 0; orderIndex < NUM_ORDERS; orderIndex++) {
  let randomUserId = Math.floor(Math.random() * arrUsers.length) + 1;
  let randomOrder = {
    completed: true,
    shippingAddress: `${orderIndex+1} Hanover Square`,
    //userId: randomUserId,
  }
  arrOrders.push(randomOrder);
}

let arrOrderDetails = [];
for (var i = 0; i < NUM_ORDER_DETAILS; i++) {
    let randomQuantity = Math.floor(Math.random() * Math.floor(5));
    let randomOrderId = Math.floor(Math.random() * Math.floor(arrOrders.length));
    let randomProductId = Math.floor(Math.random() * Math.floor(arrProducts.length));
  let randomOrderDetail = {
    quantity: randomQuantity,
    orderId: randomOrderId,
    productId: randomProductId,
  }
  arrOrderDetails.push(randomOrderDetail);
}

// const arrProducts = [
//   {
//     name: 'shoes',
//     category: 'apparel',
//     description: "it's shoes",
//     price: 60,
//     imageUrl: 'https://bluebananastatic-ooxqkrt4ejgeg.stackpathdns.com/shopimages/products/normal/79279.jpg',
//     rating: 5,
//   },
//   {
//     name: 'wig',
//     category: 'apparel',
//     description: 'a wig',
//     price: 300,
//     imageUrl: 'http://www.freakingnews.com/pictures/105500/Snake-with-a-Mohawk-105660.jpg',
//     rating: 5,
//   },
//   {
//     name: 'jacket',
//     category: 'apparel',
//     description: 'a jacket',
//     price: 100,
//     imageUrl: 'https://cdn.shopify.com/s/files/1/2253/1121/products/snake-skin-jacket-blazer_146c0d52-7c9e-47a7-b47a-82adfe201ac4_580x.jpg?v=1506925944',
//     rating: 3,
//   },
//   {
//     name: 'hat',
//     category: 'apparel',
//     description: 'a hat',
//     price: 50,
//     imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/71ychBCRYqL._UX425_.jpg',
//     rating: 4,
//   },
//   {
//     name: 'socks',
//     category: 'apparel',
//     description: 'some socks',
//     price: 5,
//     imageUrl: 'http://scene7.zumiez.com/is/image/zumiez/pdp_hero/Magnum-Snake-Skin-Sublimated-Crew-Socks-_227164-front.jpg',
//     rating: 4,
//   },
//   {
//     name: 'watch',
//     category: 'apparel',
//     description: 'a watch',
//     price: 500,
//     imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/71ychBCRYqL._UX425_.jpg',
//     rating: 3,
//   },
//   {
//     name: 'hoodie',
//     category: 'apparel',
//     description: 'a luke cage hoodie',
//     price: 120,
//     imageUrl: 'https://cdnd.lystit.com/photos/f8b9-2014/06/06/christopher-kane-blue-snakeskin-hoodie-product-1-20608812-4-078779323-normal.jpeg',
//     rating: 4.5,
//   },


async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const tables = await Promise.all([
    User.bulkCreate(arrUsers),
    Product.bulkCreate(arrProducts),
    Order.bulkCreate(arrOrders),
    OrderDetail.bulkCreate(arrOrderDetails)
  ])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${tables[0].length} users`)
  console.log(`seeded ${tables[1].length} products`)
  console.log(`seeded ${tables[2].length} orders`)
  console.log(`seeded ${tables[3].length} order details`)
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
