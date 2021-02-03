import React from 'react';
import { Card, Avatar, Button } from 'antd';

const UserProfile = () => {
  return (
    <Card
      actions={[
        <div key="twit">
          짹짹
          <br />0
        </div>,
        <div key="followings">
          팔로잉
          <br />0
        </div>,
        <div key="twit">
          팔로워
          <br />0
        </div>,
      ]}
    >
      <Card.Meta avatar={<Avatar>ZC</Avatar>} title="Kyungmin" />
      <Button>로그아웃</Button>
    </Card>
  );
};

export default UserProfile;
