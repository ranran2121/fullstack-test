import { useInfiniteQuery } from '@tanstack/react-query';
import { Result } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faCirclePlus } from '@fortawesome/free-solid-svg-icons';

import Api from '../helpers/core/Api';
import ContentPanel from '../components/core/layout/ContentPanel';
import TransactionsList from '../components/core/transaction/TransactionsList';

const fetchTransactions = async ({ pageParam = 1 }) => {
  const { data } = await Api.get(`/transactions?page=${pageParam}`);
  return data;
};

const Home = () => {
  const { data, error, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions,
    getNextPageParam: (lastPage, allPages) => (lastPage.length > 0 ? allPages.length + 1 : undefined)
  });

  // Flatten the data from pages
  const transactions = data?.pages.flat() || [];

  return (
    <ContentPanel
      title="Expense and Income Diary"
      loading={isLoading}
      icon={<FontAwesomeIcon icon={faBook} size="1x" className="text-primary ml-2" />}
      titleAction="Add"
      actionIcon={<FontAwesomeIcon icon={faCirclePlus} size="1x" className="text-primary ml-2" />}
    >
      {error ? (
        <Result status="warning" title="There are some problems with the operation." />
      ) : (
        <TransactionsList data={transactions} loadMoreData={hasNextPage ? fetchNextPage : undefined} />
      )}
    </ContentPanel>
  );
};

export default Home;
