import React, { useState } from 'react';
import { Form, Input, Select, DatePicker, Button, InputNumber, notification, App as AntApp } from 'antd';
import Api from '../../../helpers/core/Api';

const { Option } = Select;

const CreateTransactionForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async values => {
    try {
      setIsSubmitting(true);
      await Api.post('transactions', values);
      notification.success({
        message: 'Transaction Created',
        description: `Transaction of type ${values.type} with amount $${values.amount} created successfully.`
      });
    } catch (_) {
      notification.error({
        message: 'Something went wrong',
        description: 'Try again later...'
      });
    } finally {
      setIsSubmitting(false);
      form.resetFields();
    }
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
          <Button type="primary" htmlType="submit" disabled={isSubmitting} className="mr-0">
            Create Transaction
          </Button>
        </Form.Item>
      </Form>
    </AntApp>
  );
};

export default CreateTransactionForm;
