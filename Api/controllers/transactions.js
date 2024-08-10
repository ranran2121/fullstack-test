const Transaction = require('../models/transaction');
const { SendData, ServerError, NotFound, Unauthorized } = require('../helpers/response');

// Get all transactions for the authenticated user
module.exports.getAll = async (_, { locals: { user } }, next) => {
  try {
    const transactions = await Transaction.find({ userId: user.id });

    return next(SendData(transactions));
  } catch (error) {
    return next(ServerError(error));
  }
};

// Get a specific transaction by ID
module.exports.getById = async (req, { locals: { user } }, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return next(NotFound());
    }
    if (transaction.userId.toString() !== user.id.toString()) {
      return next(Unauthorized());
    }

    return next(SendData(transaction));
  } catch (error) {
    return next(ServerError(error));
  }
};

// Create a new transaction
module.exports.create = async (req, { locals: { user } }, next) => {
  try {
    const transaction = new Transaction({ ...req.body, userId: user.id });
    await transaction.save();
    return next(SendData(transaction, 201));
  } catch (error) {
    return next(ServerError(error));
  }
};

// Update a transaction by ID
module.exports.update = async (req, { locals: { user } }, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return next(NotFound());
    }
    if (transaction.userId.toString() !== user.id.toString()) {
      return next(Unauthorized());
    }

    Object.assign(transaction, req.body);
    await transaction.save();
    return next(SendData(transaction));
  } catch (error) {
    return next(ServerError(error));
  }
};

// Delete a transaction by ID
module.exports.delete = async (req, { locals: { user } }, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return next(NotFound());
    }
    if (transaction.userId.toString() !== user.id.toString()) {
      return next(Unauthorized());
    }

    await transaction.deleteOne();

    return next(SendData(null, 204));
  } catch (error) {
    return next(ServerError(error));
  }
};
