import React from 'react';
import { Divider, List, Typography, Tooltip } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faArrowTrendUp, faArrowTrendDown } from '@fortawesome/free-solid-svg-icons';

const { Title } = Typography;

const TransactionsList = ({ data, loadMoreData }) => {
  if (!data) {
    return <Title className="mb-0 text-center text-lg font-bold lg:text-xl">No results</Title>;
  }

  return (
    <div
      id="scrollableDiv"
      style={{
        height: 400,
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
        <List
          dataSource={data}
          renderItem={item => (
            <Tooltip
              title={
                <>
                  <p>Details: {item.description}</p>
                  <p>Amount: {item.amount}$</p>
                  <p>Date: {new Date(item.date).toLocaleDateString()}</p>
                </>
              }
            >
              <List.Item
                className={`${item.type === 'income' ? 'bg-green-200' : 'bg-orange-200'} mb-1 rounded-md px-4`}
                key={item.type}
                actions={[
                  <a key="list-loadmore-edit" href={`/transactions\${item.id}`}>
                    edit
                  </a>,
                  <button type="button" key="list-loadmore-delete" onClick={() => console.log('Delete item', item)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                ]}
              >
                <div className="flex gap-2 align-middle">
                  <span>
                    {item.type === 'income' ? (
                      <FontAwesomeIcon icon={faArrowTrendUp} />
                    ) : (
                      <FontAwesomeIcon icon={faArrowTrendDown} />
                    )}
                  </span>
                  <span className="font-extrabold">{item.amount}$</span>{' '}
                </div>
                <div>
                  {new Date(item.date).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </List.Item>
            </Tooltip>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};

export default TransactionsList;
