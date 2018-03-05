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
const NUM_PRODUCTS = 30; // number of random products per category. 30 products X 3 categories = 90 total
const NUM_USERS = 30; // we make 4 users, then an additional 30 users for a total of 34

var randArrayEl = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getFakeFirstName = function () {
  var fakeFirsts = ['Nimit', 'Dave', 'Shanna', 'Ashi', 'Gabriel', 'Emily', 'Ashley', 'Kimber', 'Ani'];

  return randArrayEl(fakeFirsts)
};

var getFakeLastName = function () {

  var fakeLasts = ['Hashington', 'Hopperson', 'McQueue', 'OLogn', 'Ternary', 'Claujure', 'Dunderproto', 'Binder', 'Docsreader', 'Ecma'];

  return randArrayEl(fakeLasts);
};

let arrUsers = [
  { email: 'marko@lis.com', password: '123' },
  { email: 'esteve@dev.com', password: '123' },
  { email: 'mike@sam.com', password: '123', isAdmin: true },
  { email: 'johnny@ara.com', password: '123', isAdmin: true },
]
for (let i = 0; i < NUM_USERS; i++) {
  let fakeFirstName = getFakeFirstName();
  let fakeLastName = getFakeLastName();
  let user = {
    email: `${fakeFirstName}${fakeLastName}${i}@email.com`,
    password: '123',
    addressStreet: `${Math.random().toString(36).substring(2, 15)} street`,
    addressCity: `${Math.random().toString(36).substring(2, 15)} city`,
    addressState: `${Math.random().toString(36).substring(2, 15)} state`,
    addressCountry: `${Math.random().toString(36).substring(2, 15)} country`,
    addressZipCode: Math.floor(Math.random() * 90000) + 10000,
    creditCardName: `${fakeFirstName} ${fakeLastName} ${i}`,
    creditNumber: Math.floor(Math.random() * 9000000000000000) + 1000000000000000,
    creditSecurityCode: Math.floor(Math.random() * 900) + 100,
    creditExpirationDate: Date.now() + Math.floor(Math.random() * 90000000000) + 10000000000,
    billingStreet: `${Math.random().toString(36).substring(2, 15)} street`,
    billingCity: `${Math.random().toString(36).substring(2, 15)} city`,
    billingState: `${Math.random().toString(36).substring(2, 15)} state`,
    billingCountry: `${Math.random().toString(36).substring(2, 15)} country`,
    billingZipCode: Math.floor(Math.random() * 90000) + 10000,
  }
  arrUsers.push(user);
}

let arrProducts = []
let categories = {
  apparel: NUM_PRODUCTS,
  health: NUM_PRODUCTS,
  miscellaneous: NUM_PRODUCTS,
}
for (let key in categories) {
  let randomProduct = {}
  for (let i = 0; i < categories[key]; i++) {
    let randomImageNumber = Math.floor(Math.random() * Math.floor(200))
    randomProduct = {
      name: `${key} ${i}`,
      category: `${key}`,
      description: `description ${i}`,
      price: Math.floor(Math.random() * Math.floor(100)),
      imageUrl: `https://picsum.photos/500/400?image=${randomImageNumber}`,
      rating: Math.floor(Math.random() * Math.floor(5)),
      review: `${Math.random().toString(36).substring(2, 15)} review`,
    }
    arrProducts.push(randomProduct);
  }
}

let arrOrders = [];
for (let userId = 1; userId <= arrUsers.length; userId++) { // for each user ...
  let num = Math.floor(Math.random() * 5) + 1 // generate between 1 and 5 orders
  for (let orderIndex = 1; orderIndex <= num; orderIndex++) {
    let orderInstance = {
      userId: userId,
      completed: true,
      shippingStreet: `${Math.random().toString(36).substring(2, 15)} street`,
      shippingCity: `${Math.random().toString(36).substring(2, 15)} city`,
      shippingState: `${Math.random().toString(36).substring(2, 15)} state`,
      shippingCountry: `${Math.random().toString(36).substring(2, 15)} country`,
      shippingZipCode: Math.floor(Math.random() * 90000) + 10000,
    }
    arrOrders.push(orderInstance);
  }
}

let arrOrderDetails = [];

for (let orderIdx = 1; orderIdx <= arrOrders.length; orderIdx++) {  // for each unique order and product pair ...
  for (let productIndex = 1; productIndex <= arrProducts.length; productIndex++) {

    let randomQuantity = Math.floor(Math.random() * 5) + 1

    let orderDetailInstance = {
      orderId: orderIdx,
      productId: productIndex,
      quantity: randomQuantity,
    }
    arrOrderDetails.push(orderDetailInstance)
  }
}

// }
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

  await User.bulkCreate(arrUsers)
    .then(() => {
      console.log(`seeded ${arrUsers.length} users`);
      Product.bulkCreate(arrProducts);
    })
    .then(() => {
      console.log(`seeded ${arrProducts.length} products`);
      Order.bulkCreate(arrOrders);
    })
    .then(() => {
      console.log(`seeded ${arrOrders.length} orders`);
      OrderDetail.bulkCreate(arrOrderDetails);
    })
    .then(() => {
      console.log(`seeded ${arrOrderDetails.length} orderDetails`);
    })
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
