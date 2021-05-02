import React from 'react';
import { List, Button, Card } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

import { unFollowRequest } from '@reducers/user/unfollow';
import { removeFollowRequest } from '@reducers/user/removeFollow';

interface FollowListProps {
  header: string;
  data: string[];
  onClickMore: (e: React.MouseEvent<HTMLElement>) => void;
  loading: boolean;
}

const FollowList = ({ header, data, onClickMore, loading }: FollowListProps) => {
  const dispatch = useDispatch();
  const onCancel = (id) => () => {
    if (header === '팔로잉') {
      dispatch(unFollowRequest(id));
    }
    dispatch(removeFollowRequest(id));
  };

  return (
    <List
      style={{ marginBottom: 20 }}
      grid={{ gutter: 4, xs: 2, md: 3 }}
      size="small"
      header={<div>{header}</div>}
      loadMore={
        <div style={{ textAlign: 'center', margin: '10px 0' }}>
          <Button onClick={onClickMore} loading={loading}>
            더 보기
          </Button>
        </div>
      }
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={{ marginTop: 20 }}>
          <Card actions={[<StopOutlined key="stop" onClick={onCancel(item)} />]}>
            <Card.Meta description={item} />
          </Card>
        </List.Item>
      )}
    />
  );
};

export default FollowList;
