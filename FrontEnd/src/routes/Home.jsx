import { useLocation, useNavigate } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Result } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faCirclePlus } from '@fortawesome/free-solid-svg-icons';

import Api from '../helpers/core/Api';
import ContentPanel from '../components/core/layout/ContentPanel';
import TransactionsList from '../components/core/transaction/TransactionsList';

const fetchTransactions = async ({ pageParam = 1, type, sort }) => {
  let url = `/transactions?page=${pageParam}`;
  if (type) {
    url += '&type=' + type;
  }
  if (sort) {
    url += '&sort=' + sort;
  }

  const { data } = await Api.get(url);
  return data;
};

const useQuery = () => new URLSearchParams(useLocation().search);

const Home = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const type = query.get('type');
  const sort = query.get('sort') || 'desc';

  const { data, error, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['transactions', type, sort],
    queryFn: context => fetchTransactions({ pageParam: context.pageParam, type, sort }),
    getNextPageParam: lastPage => (lastPage.hasMore ? lastPage.nextPage : undefined)
  });

  // Flatten the data from pages
  const transactions = data?.pages.flat() || [];

  const onSortClick = () => {
    const newSort = sort === 'asc' ? 'desc' : 'asc';
    const searchParams = new URLSearchParams();

    if (type) {
      searchParams.set('type', type);
    }

    searchParams.set('sort', newSort);

    navigate(`?${searchParams.toString()}`);
  };

  return (
    <ContentPanel
      title={type ? `${type}s Diary` : 'Expense and Income Diary'}
      loading={isLoading}
      icon={<FontAwesomeIcon icon={faBook} size="1x" className="text-primary ml-2" />}
      titleAction="Add"
      actionIcon={<FontAwesomeIcon icon={faCirclePlus} size="1x" className="text-primary ml-2" />}
    >
      {error ? (
        <Result status="warning" title="There are some problems with the operation." />
      ) : (
        <TransactionsList
          data={transactions}
          loadMoreData={hasNextPage ? fetchNextPage : undefined}
          onSortClick={onSortClick}
          sort={sort || 'desc'}
        />
      )}
    </ContentPanel>
  );
};

export default Home;
