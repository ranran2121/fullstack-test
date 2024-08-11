import React from 'react';

import { List, Tooltip } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faArrowTrendUp, faArrowTrendDown } from '@fortawesome/free-solid-svg-icons';

const TransactionCard = ({ item }) => (
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
);

export default TransactionCard;
