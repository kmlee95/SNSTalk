import React, { useCallback } from 'react';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '@reducers/.';
import { followRequest } from '@reducers/user/follow';
import { unFollowRequest } from '@reducers/user/unfollow';
import { SinglePostData } from '@src/types/post';

interface FollowButtonProps {
  post: SinglePostData;
}

const FollowButton = ({ post }: FollowButtonProps) => {
  const dispatch = useDispatch();
  const { me, followLoading, unfollowLoading } = useSelector((state: RootState) => state.user);

  const isFollowing = me?.Followings.find((v) => v.id === post.User.id);
  const onClickButton = useCallback(() => {
    if (isFollowing) {
      dispatch(unFollowRequest(post.User.id));
    } else {
      dispatch(followRequest(post.User.id));
    }
  }, [isFollowing]);

  if (post.User.id === me.id) {
    return null;
  }
  return (
    <Button loading={followLoading || unfollowLoading} onClick={onClickButton}>
      {isFollowing ? '친구삭제' : '친구신청'}
    </Button>
  );
};

export default FollowButton;
