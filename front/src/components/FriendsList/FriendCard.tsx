import React, { useCallback, memo } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Link from 'next/link';

import { FriendCardWrapper } from './styled';
import { UserFriends } from '@reducers/user';
import { deleteFriendRequest } from '@reducers/user/deleteFriend';

interface Props {
  data: UserFriends;
}

const FriendCard = memo(({ data }: Props) => {
  const dispatch = useDispatch();

  const onDeleteFriend = useCallback(
    (id: number) => () => {
      dispatch(deleteFriendRequest(id));
    },
    [],
  );

  return (
    <FriendCardWrapper>
      <Link href={`/user/${data.id}`}>
        <a>
          {data.profilePhoto ? (
            <Avatar size={60} src={`http://localhost:3065/${data.profilePhoto}`} />
          ) : (
            <Avatar size={60} icon={<UserOutlined />} />
          )}
        </a>
      </Link>
      <div>{`${data.familyName}${data.firstName}`}</div>
      <Button onClick={onDeleteFriend(data.Friend.FriendId)}>언팔로우</Button>
    </FriendCardWrapper>
  );
});

export default FriendCard;
