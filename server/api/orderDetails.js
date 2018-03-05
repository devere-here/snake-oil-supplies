// import products from '../../client/store/products';

const router = require('express').Router()
const { OrderDetail, Product } = require('../db/models')
const asyncHandler = require('express-async-handler')
const { isSelf } = require('../permissions')

module.exports = router

/****** USER ******/
//When user creates session, return cart details if exists
// got rid of:isSelf
router.get('/:id', asyncHandler(async (req, res, next) => {
  const orderDetails = await OrderDetail.findAll({
    where: { orderId: req.params.id },
  })
  res.json(orderDetails)
}));

//When user adds additional cart items / guest checks out
router.post('/', asyncHandler(async (req, res, next) => {
  const cartProducts = await OrderDetail.bulkCreate(req.body.orderDetailsArray)
  res.json(cartProducts)
}));

