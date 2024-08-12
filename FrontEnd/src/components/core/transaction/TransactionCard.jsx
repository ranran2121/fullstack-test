import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { List, Tooltip, Popconfirm } from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faArrowTrendUp, faArrowTrendDown } from '@fortawesome/free-solid-svg-icons';
import Api from '../../../helpers/core/Api';

const deleteTransaction = async id => {
  await Api.delete(`/transactions/${id}`);
};

const TransactionCard = ({ item }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries(['transactions']);
    }
  });

  const handleItemClick = id => {
    navigate(`/transactions/${id}`);
  };

  const handleItemDelete = (e, id) => {
    e.stopPropagation();
    mutation.mutate(id);
  };

  return (
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
        onClick={() => handleItemClick(item._id)}
        actions={[
          <a key="list-loadmore-edit" href={`/transactions/${item._id}`}>
            edit
          </a>,
          <Popconfirm
            title="Are you sure you want to delete this item?"
            onConfirm={e => handleItemDelete(e, item._id)}
            onCancel={e => e.stopPropagation()}
            okText="Yes"
            cancelText="No"
            key="list-loadmore-delete"
          >
            <button type="button" onClick={e => e.stopPropagation()}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </Popconfirm>
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
          <span className="font-extrabold">{item.amount}$</span>
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
};

export default TransactionCard;
