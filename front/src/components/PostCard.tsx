import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Popover, Button, Avatar, List, Comment } from 'antd';
import {
  ShareAltOutlined,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined,
  HeartTwoTone,
  UserOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import moment from 'moment';
import Swal from 'sweetalert2';

import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import FollowButton from './FollowButton';

import { RootState } from '@reducers/.';

import { likePostRequest } from '@reducers/post/likePost';
import { removePostRequest } from '@reducers/post/removePost';
import { unLikePostRequest } from '@reducers/post/unlikePost';
import { retweetRequest } from '@reducers/post/retweet';
import { SinglePostData } from '@src/types/post';

moment.locale('ko');

interface PostCardProps {
  post: SinglePostData;
}

const PostCard = ({ post }: PostCardProps) => {
  const dispatch = useDispatch();
  const { removePostLoading } = useSelector((state: RootState) => state.post);
  const [commentFormOpened, setCommentFormOpened] = useState<boolean>(false);
  const id = useSelector((state: RootState) => state.user.me?.id);

  const onLike = useCallback(() => {
    if (!id) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '로그인이 필요합니다.',
      });
      return id;
    }
    return dispatch(likePostRequest(post.id));
  }, [id]);

  const onUnlike = useCallback(() => {
    if (!id) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '로그인이 필요합니다.',
      });
      return id;
    }

    return dispatch(unLikePostRequest(post.id));
  }, [id]);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  const onRemovePost = useCallback(() => {
    if (!id) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '로그인이 필요합니다.',
      });
      return id;
    }
    return dispatch(removePostRequest(post.id));
  }, [id]);

  const onRetweet = useCallback(() => {
    if (!id) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '로그인이 필요합니다.',
      });
      return id;
    }
    return dispatch(retweetRequest(post.id));
  }, [id]);

  const liked = post.Likers.find((v) => v.id === id);
  return (
    <div style={{ marginBottom: 20 }}>
      <Card
        cover={post.Images && <PostImages images={post.Images} />}
        actions={[
          liked ? (
            <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onUnlike} />
          ) : (
            <HeartOutlined key="heart" onClick={onLike} />
          ),
          <ShareAltOutlined key="share" onClick={onRetweet} />,
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    <Button>수정</Button>
                    <Button type="primary" loading={removePostLoading} onClick={onRemovePost}>
                      삭제
                    </Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        title={
          <>
            <Link href={`/user/${post.User.id}`}>
              <a>
                {post.RetweetId ? <Avatar>{post.User.nickname[0]}</Avatar> : <Avatar icon={<UserOutlined />} />}
                {'  '}
                {`${post.User.nickname}${post.RetweetId ? '님이 공유한 게시글 입니다.' : ''}`}
              </a>
            </Link>
          </>
        }
        extra={id && <FollowButton post={post} />}
      >
        {post.RetweetId && post.Retweet ? (
          <Card cover={post.Retweet.Images && <PostImages images={post.Retweet.Images} />}>
            <span style={{ float: 'right' }}>{moment(post.createdAt).format('YYYY.MM.DD.')}</span>
            <Card.Meta
              avatar={
                <Link href={`/user/${post.Retweet.User.id}`}>
                  <a>
                    <Avatar>{post.Retweet.User.nickname[0]}</Avatar>
                  </a>
                </Link>
              }
              title={post.Retweet.User.nickname}
              description={<PostCardContent postData={post.Retweet.content} />}
            />
          </Card>
        ) : (
          <>
            <span style={{ float: 'right' }}>{moment(post.createdAt).format('YYYY.MM.DD.')}</span>
            <Card.Meta
              avatar={
                <Link href={`/user/${post.User.id}`}>
                  <a>
                    <Avatar>{post.User.nickname[0]}</Avatar>
                  </a>
                </Link>
              }
              title={post.User.nickname}
              description={<PostCardContent postData={post.content} />}
            />
          </>
        )}
      </Card>
      {commentFormOpened && (
        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.nickname}
                  avatar={
                    <Link href={`/user/${item.id}`}>
                      <a>
                        <Avatar>{item.nickname[0]}</Avatar>
                      </a>
                    </Link>
                  }
                  content={item.content}
                />
              </li>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default PostCard;
