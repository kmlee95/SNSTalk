import React, { useCallback, memo } from 'react';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';

import RequestWrapper from './styled';
import { friendRequestRequest } from '@reducers/user/friendRequest';

interface Props {
  id: number;
}

const FriendRequestForm = memo(({ id }: Props) => {
  const dispatch = useDispatch();

  const onFriendRequest = useCallback(() => {
    dispatch(friendRequestRequest(id));
  }, []);

  return (
    <RequestWrapper>
      <Button type="primary" onClick={onFriendRequest}>
        팔로잉
      </Button>
    </RequestWrapper>
  );
});

export default FriendRequestForm;
