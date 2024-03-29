import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { Avatar, Row, Col, Statistic } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { RootState } from '@reducers/.';
import UserInfoWrapper from './styled';

const UserInfo = memo(() => {
  const { familyName } = useSelector((state: RootState) => state.user.otherUserInfo);
  const { firstName } = useSelector((state: RootState) => state.user.otherUserInfo);
  const { Posts } = useSelector((state: RootState) => state.user.otherUserInfo);
  const { Friends } = useSelector((state: RootState) => state.user.otherUserInfo);
  const { profilePhoto } = useSelector((state: RootState) => state.user.otherUserInfo);

  return (
    <UserInfoWrapper>
      <div>
        <Row>
          <Col span={24}>
            <Statistic title="이름" value={`${familyName}${firstName}`} />
          </Col>
          <Col span={8}>
            <Statistic title="게시글" value={`${Posts}개`} />
          </Col>
          <Col span={8}>
            <Statistic title="팔로잉" value={`${Friends}명`} />
          </Col>
          <Col span={8}>
            <Statistic title="팔로워" value={`${Friends + 1}명`} />
          </Col>
        </Row>
      </div>
      <div>
        {profilePhoto ? (
          <Avatar size={120} src={`http://localhost:3065/${profilePhoto}`} />
        ) : (
          <Avatar size={120} icon={<UserOutlined />} />
        )}
      </div>
    </UserInfoWrapper>
  );
});

export default UserInfo;
