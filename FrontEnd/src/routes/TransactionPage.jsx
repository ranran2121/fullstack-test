import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Result } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import ContentPanel from '../components/core/layout/ContentPanel';
import SingleTransaction from '../components/core/transaction/SingleTransaction';
import Api from '../helpers/core/Api';

const TransactionPage = () => {
  const [loading, setLoading] = useState(true);
  const [transaction, setTransaction] = useState(null);
  const [error, setError] = useState(false);
  const { id } = useParams();

  const loadData = () => {
    setLoading(true);
    Api.get(`/transactions/${id}`)
      .then(res => {
        if (res.data) {
          setTransaction(res.data);
        }
      })
      .catch(_ => {
        setError(true);
      })
      .finally(setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <ContentPanel
      title="Transaction"
      loading={loading}
      icon={<FontAwesomeIcon icon={faBook} size="1x" className="text-primary ml-2" />}
    >
      {error ? (
        <Result status="warning" title="There are some problems with the operation." />
      ) : (
        <div className="mx-auto p-6 lg:w-[50%]">
          <SingleTransaction transaction={transaction} />
        </div>
      )}
    </ContentPanel>
  );
};

export default TransactionPage;
