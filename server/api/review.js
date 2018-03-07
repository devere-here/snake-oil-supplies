const router = require('express').Router()
const { Review } = require('../db/models')
const asyncHandler = require('express-async-handler')


module.exports = router


router.get('/', asyncHandler(async (req, res, next) => {
  const reviews = await Review.findAll()
  res.json(reviews)
}));

router.post('/', asyncHandler(async (req, res, next) => {
  const newReview = await Review.create(req.body)
  res.json(newReview)
}))

router.put('/:id', asyncHandler(async (req, res, next) => {
  const reviews = await Review.update(req.body, {
    where: {
      productId: req.body.productId,
      userId: req.body.userId
    }
  })
  res.json(reviews)
}));
