const mongoose = require('mongoose');
const softDelete = require('../helpers/softDelete');

const { Schema } = mongoose;

const transactionSchema = new Schema(
  {
    amount: {
      type: Number,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    description: {
      type: String,
      maxlength: 255,
      trim: true
    },
    type: {
      type: String,
      enum: ['income', 'expense'],
      required: true,
      index: true
    },
    date: {
      type: Date,
      default: Date.now,
      required: true
    }
  },
  {
    timestamps: true
  }
);

transactionSchema.plugin(softDelete);

module.exports = mongoose.model('Transaction', transactionSchema);
