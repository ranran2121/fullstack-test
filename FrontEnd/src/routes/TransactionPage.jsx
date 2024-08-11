import React from 'react';
import { useParams } from 'react-router-dom';
import { Result } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@tanstack/react-query'; // Import useQuery from React Query
import ContentPanel from '../components/core/layout/ContentPanel';
import SingleTransaction from '../components/core/transaction/SingleTransaction';
import Api from '../helpers/core/Api';

const fetchTransaction = async id => {
  const response = await Api.get(`/transactions/${id}`);
  return response.data;
};

const TransactionPage = () => {
  const { id } = useParams();

  const {
    data: transaction,
    error,
    isLoading
  } = useQuery({
    queryKey: ['transaction', id],
    queryFn: () => fetchTransaction(id),
    enabled: !!id // Ensure the query only runs if id is available
  });

  return (
    <ContentPanel
      title="Transaction"
      loading={isLoading}
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
