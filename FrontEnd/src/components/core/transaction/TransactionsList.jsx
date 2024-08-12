import React, { useMemo } from 'react';
import { Button, Divider, List, Typography } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown, faArrowTrendUp, faArrowTrendDown } from '@fortawesome/free-solid-svg-icons';

import TransactionCard from './TransactionCard';

const { Title } = Typography;

const TransactionsList = ({ data, loadMoreData, sort, onSortClick }) => {
  if (!data || data.length === 0) {
    return <Title className="mb-0 text-center text-lg font-bold lg:text-xl">No results</Title>;
  }

  const balance = useMemo(
    () => data.reduce((acc, item) => (item.type === 'income' ? acc + item.amount : acc - item.amount), 0),
    [data]
  );

  return (
    <>
      <RecapLine sort={sort} balance={balance} onSortClick={onSortClick} />
      <div
        id="scrollableDiv"
        style={{
          height: 'auto',
          overflow: 'auto'
        }}
      >
        <InfiniteScroll
          dataLength={data.length}
          next={loadMoreData}
          hasMore={loadMoreData !== undefined}
          endMessage={
            <Divider plain className="italic">
              It is all, nothing more{' '}
            </Divider>
          }
          scrollableTarget="scrollableDiv"
        >
          <List dataSource={data} renderItem={item => <TransactionCard item={item} />} />
        </InfiniteScroll>
      </div>
    </>
  );
};

export default TransactionsList;

const RecapLine = ({ sort, balance, onSortClick }) => (
  <div className="flex justify-between">
    <div className="flex gap-2">
      <Title level={4}>
        Balance{' '}
        <span className={`${balance >= 0 ? 'bg-green-200' : 'bg-orange-200'} rounded-md p-1`}>
          {' '}
          {Math.abs(balance)}$
        </span>
      </Title>
      <FontAwesomeIcon
        icon={balance >= 0 ? faArrowTrendDown : faArrowTrendUp}
        size="lg"
        className={`${balance >= 0 ? 'bg-green-200' : 'bg-orange-200'} rounded-md p-1`}
      />
    </div>
    <div className="flex gap-2">
      <Title level={4}>Sort:</Title>
      <Button type="button" onClick={onSortClick} className="border-1 border-black p-2">
        <FontAwesomeIcon
          icon={sort === 'asc' ? faSortUp : faSortDown}
          size="lg"
          className={`${sort === 'asc' ? 'mt-2' : '-mt-2'}`}
        />
      </Button>
    </div>
  </div>
);
