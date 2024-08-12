import React from 'react';
import { Form, Input, Select, DatePicker, Button, InputNumber, notification, App as AntApp } from 'antd';
import { useMutation } from '@tanstack/react-query';
import Api from '../../../helpers/core/Api';

const { Option } = Select;

const createTransaction = async values => {
  await Api.post('transactions', values);
};

const CreateTransactionForm = () => {
  const [form] = Form.useForm();

  const createTransactionMutation = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      form.resetFields();
      notification.success({
        message: 'Transaction Created'
      });
    },
    onError: () => {
      notification.error({
        message: 'Something went wrong',
        description: 'Try again later...'
      });
    }
  });

  const onFinish = values => {
    createTransactionMutation.mutate(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <AntApp>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          type: 'income'
        }}
      >
        <Form.Item
          name="type"
          label="Transaction Type"
          rules={[{ required: true, message: 'Please select a transaction type!' }]}
        >
          <Select>
            <Option value="income">Income</Option>
            <Option value="expense">Expense</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="amount"
          label="Amount"
          rules={[
            { required: true, message: 'Please enter an amount!' },
            { type: 'number', min: 0, message: 'Amount must be a positive number!' }
          ]}
        >
          <InputNumber min={0} placeholder="Enter amount" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please enter a description!' }]}
        >
          <Input placeholder="Enter transaction description" />
        </Form.Item>

        <Form.Item name="date" label="Date" rules={[{ required: true, message: 'Please select a date!' }]}>
          <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item>
          <Button type="default" onClick={onReset} className="mr-4">
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" disabled={createTransactionMutation.isLoading} className="mr-0">
            Create Transaction
          </Button>
        </Form.Item>
      </Form>
    </AntApp>
  );
};

export default CreateTransactionForm;
