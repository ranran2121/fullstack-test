import { useState, useEffect } from 'react';
import { Result } from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faCirclePlus } from '@fortawesome/free-solid-svg-icons';

import Api from '../helpers/core/Api';

import ContentPanel from '../components/core/layout/ContentPanel';
import TransactionsList from '../components/core/transaction/TransactionsList';

const trans = [
  {
    _id: '66b7d75d56937a5e3be0268d',
    amount: 100,
    userId: '66b7d75d56937a5e3be02686',
    description: 'Test Income',
    type: 'income',
    date: '2024-08-10T21:10:53.768Z',
    deleted: false,
    createdAt: '2024-08-10T21:10:53.769Z',
    updatedAt: '2024-08-10T21:10:53.769Z',
    __v: 0
  },
  {
    _id: '66b7d75d56937a5e3be0268y',
    amount: 100,
    userId: '66b7d75d56937a5e3be02686',
    description: 'Test Income',
    type: 'income',
    date: '2024-08-10T21:10:53.768Z',
    deleted: false,
    createdAt: '2024-08-10T21:10:53.769Z',
    updatedAt: '2024-08-10T21:10:53.769Z',
    __v: 0
  },
  {
    _id: '66b7d75d56937a5e3be0268d',
    amount: 200,
    userId: '66b7d75d56937a5e3be026863',
    description: 'Test Income',
    type: 'expense',
    date: '2024-08-10T21:10:53.768Z',
    deleted: false,
    createdAt: '2024-08-10T21:10:53.769Z',
    updatedAt: '2024-08-10T21:10:53.769Z',
    __v: 0
  },
  {
    _id: '66b7d75d56937a5e3be0268y3',
    amount: 100,
    userId: '66b7d75d56937a5e3be02686',
    description: 'Test Income',
    type: 'income',
    date: '2024-08-10T21:10:53.768Z',
    deleted: false,
    createdAt: '2024-08-10T21:10:53.769Z',
    updatedAt: '2024-08-10T21:10:53.769Z',
    __v: 0
  }
];

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState(null);
  const [error, setError] = useState(false);

  const loadMoreData = () => {
    setLoading(true);
    Api.get('/transactions')
      .then(res => {
        console.log('RES', res);
        if (res.data.length > 0) {
          setTransactions(res.data);
        }

        setTransactions(trans);
      })
      .catch(e => {
        setError(true);
      })
      .finally(setLoading(false));
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <ContentPanel
      title="Expense and Income Diary"
      loading={loading}
      icon={<FontAwesomeIcon icon={faBook} size="1x" className="text-primary ml-2" />}
      titleAction="Add"
      actionIcon={<FontAwesomeIcon icon={faCirclePlus} size="1x" className="text-primary ml-2" />}
    >
      {error ? (
        <Result status="warning" title="There are some problems with the operation." />
      ) : (
        <TransactionsList data={transactions} loadMoreData={loadMoreData} />
      )}
    </ContentPanel>
  );
};

export default Home;
