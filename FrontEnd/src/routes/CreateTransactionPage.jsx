import React from 'react';
import CreateTransactionForm from '../components/core/transaction/CreateTransactionForm';

const CreateTransactionPage = () => (
  <div className="mx-auto p-6 lg:w-[50%]">
    <h1>Create New Transaction</h1>
    <CreateTransactionForm />
  </div>
);

export default CreateTransactionPage;
