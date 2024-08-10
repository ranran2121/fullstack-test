module.exports = {
  createTransaction: {
    $id: 'createTransaction',
    type: 'object',
    properties: {
      amount: { type: 'number' },
      description: { type: 'string' },
      type: { type: 'string', enum: ['income', 'expense'] },
      date: { type: 'string', format: 'date-time' }
    },
    required: ['amount', 'type', 'date'],
    additionalProperties: false
  },
  updateTransaction: {
    $id: 'updateTransaction',
    type: 'object',
    properties: {
      amount: { type: 'number' },
      description: { type: 'string' },
      type: { type: 'string', enum: ['income', 'expense'] },
      date: { type: 'string', format: 'date-time' }
    },
    additionalProperties: false
  },
  transaction: {
    $id: 'transaction', // ID for the full transaction schema
    type: 'object',
    properties: {
      amount: { type: 'number' },
      description: { type: 'string' },
      type: { type: 'string', enum: ['income', 'expense'] },
      date: { type: 'string', format: 'date-time' },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
      isDeleted: { type: 'boolean', default: false },
      deletedAt: { type: 'string', format: 'date-time' }
    },
    required: ['amount', 'type', 'date'],
    additionalProperties: false
  }
};
