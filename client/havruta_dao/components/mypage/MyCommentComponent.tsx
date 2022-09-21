import { EnterOutlined, UserOutlined } from '@ant-design/icons';
import { Card, Popconfirm, Space, Typography, List, Comment, Tooltip } from 'antd';
import Paragraph from 'antd/lib/skeleton/Paragraph';

export default function MyCommentComponent() {
  const { Text, Paragraph } = Typography;

  // 댓글 목록을 여기서 불러와서 아래 삽입

  const data = [
    {
      //   actions: [<span key="comment-list-reply-to-0">Reply to</span>],
      author: 'Han Solo',
      //   avatar: 'https://joeschmoe.io/api/v1/random',
      content: (
        <p>
          We supply a series of design principles, practical patterns and high quality design
          resources (Sketch and Axure), to help people create their product prototypes beautifully
          and efficiently.
        </p>
      ),
      datetime: (
        <Tooltip title="2016-11-22 11:22:33">
          <span>8 hours ago</span>
        </Tooltip>
      ),
    },
    {
      //   actions: [<span key="comment-list-reply-to-0">Reply to</span>],
      author: 'Han Solo',
      //   avatar: 'https://joeschmoe.io/api/v1/random',
      content: (
        <p>
          We supply a series of design principles, practical patterns and high quality design
          resources (Sketch and Axure), to help people create their product prototypes beautifully
          and efficiently.
        </p>
      ),
      datetime: (
        <Tooltip title="2016-11-22 10:22:33">
          <span>9 hours ago</span>
        </Tooltip>
      ),
    },
  ];

  return (
    <Space
      direction="vertical"
      style={{
        width: '100%',
        border: '1px solid grey',
        padding: '16px',
        borderRadius: '8px',
      }}
    >
      <List
        className="comment-list"
        header={`${data.length} replies`}
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <li>
            <Comment
              //   actions={item.actions}
              author={item.author}
              //   avatar={item.avatar}
              content={item.content}
              datetime={item.datetime}
              style={{ borderBottom: '1px solid #434343' }}
            />
          </li>
        )}
      />
    </Space>
  );
}
