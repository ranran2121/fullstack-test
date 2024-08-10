const express = require('express');
const controller = require('../controllers/transactions');
const { isAuth } = require('../middlewares/isAuth');
const rbac = require('../middlewares/rbac');
const { validator } = require('../middlewares/validator');

const router = express.Router();

// Route to get all transactions (both incomes and expenses) for the authenticated user
router
  .route('/')
  .get(isAuth, rbac('transactions', 'read:any'), controller.getAll)
  .post(validator({ body: 'transaction' }), isAuth, rbac('transactions', 'create'), controller.create);

// Route to get, update, or delete a specific transaction by ID
router
  .route('/:id')
  .get(validator({ params: 'id' }), isAuth, rbac('transactions', 'read'), controller.getById)
  .patch(validator({ body: 'transaction', params: 'id' }), isAuth, rbac('transactions', 'update'), controller.update)
  .delete(validator({ params: 'id' }), isAuth, rbac('transactions', 'delete'), controller.delete);

module.exports = router;
