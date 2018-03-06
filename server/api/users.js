const router = require('express').Router();
const { User } = require('../db/models');
const asyncHandler = require('express-async-handler');
const { isAdmin, isSelf, isLoggedIn } = require('../permissions');

module.exports = router;

router.param('id', asyncHandler(async (req, res, next, id) => {
    const user = await User.findById(id, {
      attributes: ['id', 'email', 'isAdmin']
    });
    if (!user) {
      const err = new Error('NOT FOUND');
      err.status = 401;
      next(err);
    } else {
      req.requestedUser = user;
      next();
    }
  })
);

router.get('/admin', isAdmin, asyncHandler(async (req, res, next) => {
    const users = await User.findAll();
    res.json(users);
  })
);

router.get('/admin/:id', isAdmin, (req, res, next) => {
  res.json(req.requestedUser);
});

router.put('/admin/:id', isAdmin, asyncHandler(async (req, res, next) => {
    await User.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.sendStatus(201);
  })
);

router.delete('/admin/:id', isAdmin, (req, res, next) => {
  req.requestedUser
    .destroy()
    .then(() => res.sendStatus(204))
    .catch(next);
});

router.get('/', asyncHandler(async (req, res, next) => {
    const users = await User.findAll({
      attributes: ['id', 'email']
    });
    res.json(users);
  })
);

router.get('/:id', isSelf, (req, res, next) => {
  res.json(req.requestedUser);
});

router.put('/:id', isSelf, asyncHandler(async (req, res, next) => {
    await User.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.sendStatus(201);
  })
);
