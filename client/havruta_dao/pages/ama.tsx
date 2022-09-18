import React from 'react';
import { useRouter } from 'next/router';
import { Col, PageHeader, Row, Space, Table, Tag } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: '제목',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },

  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

export default function Ama() {
  const router = useRouter();

  return (
    <>
      <Space style={{ justifyContent: 'space-between', width: '100%' }}>
        <PageHeader
          backIcon={<QuestionCircleOutlined />}
          style={{ paddingLeft: 0, width: '100%' }}
          title={'질의응답'}
        />
      </Space>
      <Row gutter={16}>
        <Col span={24}>
          <Table columns={columns} dataSource={data} />
        </Col>
      </Row>
    </>
  );
}
