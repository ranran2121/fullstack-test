import React from 'react';
import { Divider, List, Typography } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

import TransactionCard from './TransactionCard';

const { Title } = Typography;

const TransactionsList = ({ data, loadMoreData }) => {
  if (!data) {
    return <Title className="mb-0 text-center text-lg font-bold lg:text-xl">No results</Title>;
  }

  return (
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
        hasMore={data.length < 2}
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
  );
};

export default TransactionsList;
