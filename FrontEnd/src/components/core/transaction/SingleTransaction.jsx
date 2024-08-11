import React from 'react';
import { Form, Input, InputNumber, App as AntApp, Typography } from 'antd';

const { Title } = Typography;

const SingleTransaction = ({ transaction }) => {
  const [form] = Form.useForm();

  if (!transaction) {
    return <Title className="mb-0 text-center text-lg font-bold lg:text-xl">No results</Title>;
  }

  return (
    <AntApp>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          type: transaction.type,
          description: transaction.description,
          date: new Date(transaction.date).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          amount: transaction.amount
        }}
      >
        <Form.Item name="type" label="Transaction Type">
          <Input readOnly className={`${transaction.type === 'income' ? 'bg-green-200' : 'bg-orange-200'} `} />
        </Form.Item>

        <Form.Item name="amount" label="Amount $">
          <InputNumber readOnly />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <Input readOnly />
        </Form.Item>

        <Form.Item name="date" label="Date">
          <Input readOnly />
        </Form.Item>
      </Form>
    </AntApp>
  );
};

export default SingleTransaction;
