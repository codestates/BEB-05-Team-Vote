import React from 'react';
import { useRouter } from 'next/router';
import { Col, PageHeader, Row, Space, Table } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
interface DataType {
  key: number;
  no: number;
  title: string;
  author: string;
  created_date: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: '글번호',
    dataIndex: 'no',
    key: 'no',
    render: (text) => <a>{text}</a>,
    width: '10%',
  },
  {
    title: '제목',
    dataIndex: 'title',
    key: 'title',
    render: (text) => <a>{text}</a>,
    width: '50%',
  },
  {
    title: '작성자',
    dataIndex: 'author',
    key: 'author',
    width: '30%',
  },

  {
    title: '작성일',
    key: 'created_date',
    dataIndex: 'created_date',
    width: '10%',
  },
];

const aa = {
  key: 1,
  no: 1,
  title: '개발 질문',
  author: '코린이',
  created_date: '1분전',
};

const data: DataType[] = Array(30)
  .fill(null)
  .map((_, i) => aa);

export default function Ama() {
  const router = useRouter();

  return (
    <>
      <Space style={{ justifyContent: 'space-between', width: '100%' }}>
        <PageHeader
          backIcon={<QuestionCircleOutlined />}
          style={{ paddingLeft: 0, width: '100%' }}
          title={'질의응답'}
          subTitle={'궁금했던 것을 자유롭게 질문해보세요.'}
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
