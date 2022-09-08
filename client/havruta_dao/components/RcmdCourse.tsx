import { Button, Image, Row, Col, Space } from 'antd';
import { CodepenOutlined, ArrowRightOutlined } from '@ant-design/icons';

export default function RcmdCourse() {
  const data = {
    key: '1',
    name: '니콜라스',
    title: '코린이 시절 알았으면 좋았을 것들',
    price: 1,
  };
  return (
    <Space wrap style={{ padding: '0 20px', width: '100%' }}>
      <Row justify="center" align="top" gutter={[8, 16]}>
        <Col xxl={12} lg={24} key={data.key}>
          <Image
            preview={false}
            width={'100%'}
            height={'auto'}
            alt="thumbnail"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
        </Col>
        <Col xxl={12} lg={24}>
          <p style={{ color: 'grey', fontSize: '14px' }}>{data.name}</p>
          <p>{data.title}</p>
          <p>
            <CodepenOutlined />
            &nbsp;{data.price}
          </p>
        </Col>
        <Col span={24}>
          <Button type="primary" block size={'large'} style={{ width: '100%' }}>
            더 많은 강의 들으러 가기 <ArrowRightOutlined />
          </Button>
        </Col>
      </Row>
    </Space>
  );
}
