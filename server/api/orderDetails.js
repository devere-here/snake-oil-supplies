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
  console.log('req.body.orderDetailsArray', req.body.orderDetailsArray);
  const cartProducts = await OrderDetail.bulkCreate(req.body.orderDetailsArray)
  res.json(cartProducts)
}));

router.put('/', asyncHandler(async (req, res, next) => {
  const cartProducts = await OrderDetail.bulkCreate(req.body.orderDetailsArray)
  res.json(cartProducts)
}));

router.put('/:id', asyncHandler(async (req, res, next) => {
  console.log('req.body', req.body)
  const orderDetails = await OrderDetail.update(req.body, {
    where: {
      orderId: req.body.orderId,
      productId: req.body.productId
		},
		returning: true
  })

  res.json(orderDetails)
}));


router.delete('/:id', asyncHandler(async (req, res, next) => {
  console.log('req.body in delete', req.body)
  const orderDetails = await OrderDetail.destroy({
    where: {
      orderId: req.body.orderId,
      productId: req.body.productId
    }
  })

  res.json(orderDetails)
}));

