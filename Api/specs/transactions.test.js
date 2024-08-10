const supertest = require('supertest');

const app = require('../app');
const db = require('../db/connect-test');
const Transaction = require('../models/transaction');
const User = require('../models/user');
const Company = require('../models/company');
const { genereteAuthToken } = require('../helpers/auth');

const agent = supertest.agent(app);

let company;
let user;
let userToken;
let transactionId;

beforeAll(async () => await db.connect());
beforeEach(async () => {
  await db.clear();

  // Create and save a company with a valid ObjectId
  company = await new Company({
    name: 'Company1',
    pic: 'companypic',
    lang: 'EN',
    zipcode: '12345',
    country: 'IT',
    address: 'Via XYZ 123',
    phone: { prefix: '+39', number: '1234567890', country: 'IT' },
    type: 'type1',
    vatNumber: 'IT1234567890'
  }).save();

  // Create and save a user with the valid company ObjectId
  user = await new User({
    email: 'user@company1.com',
    password: 'testtest',
    name: 'User',
    lastname: 'User',
    phone: { prefix: '+02', number: '7894561230', country: 'IT' },
    lang: 'EN',
    active: true,
    roles: ['user'],
    company: {
      id: company._id,
      name: 'Company1',
      type: 'type1',
      roles: ['user']
    }
  }).save();

  userToken = genereteAuthToken(user).token;

  // Create a transaction for the user
  const transaction = await new Transaction({
    amount: 100,
    userId: user._id,
    description: 'Test Income',
    type: 'income',
    date: new Date()
  }).save();

  transactionId = transaction._id;
});

afterEach(() => jest.clearAllMocks());
afterAll(async () => await db.close());

describe('Transaction CRUD Operations', () => {
  test('Get all transactions for the user', async () => {
    const transactions = [
      { amount: 100, description: 'Income 1', type: 'income', date: new Date() },
      { amount: 200, description: 'Expense 1', type: 'expense', date: new Date() },
      { amount: 300, description: 'Income 2', type: 'income', date: new Date() }
    ];

    const savedTransactions = await Promise.all(
      transactions.map(t => new Transaction({ ...t, userId: user._id }).save())
    );

    await agent
      .get('/transactions')
      .set('Cookie', `accessToken=${userToken}`)
      .expect(200)
      .then(res => {
        expect(res.body).toHaveLength(4);
      });
  });

  test('Create transaction', async () => {
    const newTransaction = {
      amount: 200,
      description: 'New Expense',
      type: 'expense',
      date: new Date()
    };

    await agent
      .post('/transactions')
      .set('Cookie', `accessToken=${userToken}`)
      .send(newTransaction)
      .expect(201)
      .then(res => {
        expect(res.body).toHaveProperty('_id');
        expect(res.body.amount).toBe(newTransaction.amount);
        expect(res.body.description).toBe(newTransaction.description);
      });
  });

  test('Get transaction by ID', async () => {
    await agent
      .get(`/transactions/${transactionId}`)
      .set('Cookie', `accessToken=${userToken}`)
      .expect(200)
      .then(res => {
        expect(res.body._id).toBe(transactionId.toString());
        expect(res.body.amount).toBe(100);
      });
  });

  test('Update transaction', async () => {
    const updatedData = { amount: 150, description: 'Updated Income', type: 'income', date: new Date() };

    await agent
      .patch(`/transactions/${transactionId}`)
      .send(updatedData)
      .set('Cookie', `accessToken=${userToken}`)
      .expect(200)
      .then(res => {
        expect(res.body.amount).toBe(updatedData.amount);
        expect(res.body.description).toBe(updatedData.description);
      });
  });

  test('Delete transaction', async () => {
    await agent.delete(`/transactions/${transactionId}`).set('Cookie', `accessToken=${userToken}`).expect(204);
  });

  test('Unauthorized access to another user’s transaction', async () => {
    // Create another user to simulate unauthorized access
    const otherUser = await new User({
      email: 'otheruser@company1.com',
      password: 'testtest',
      name: 'Other User',
      lastname: 'User',
      phone: { prefix: '+02', number: '9876543210', country: 'IT' },
      lang: 'EN',
      active: true,
      company: {
        id: company._id,
        name: 'Company1',
        type: 'type1',
        roles: ['user']
      }
    }).save();

    const otherUserToken = genereteAuthToken(otherUser).token;

    const updatedData = { amount: 150, description: 'Updated Income', type: 'income', date: new Date() };

    await agent.get(`/transactions/${transactionId}`).set('Cookie', `accessToken=${otherUserToken}`).expect(401);
    await agent
      .patch(`/transactions/${transactionId}`)
      .send(updatedData)
      .set('Cookie', `accessToken=${otherUserToken}`)
      .expect(401);
    await agent.delete(`/transactions/${transactionId}`).set('Cookie', `accessToken=${otherUserToken}`).expect(401);
  });
});
