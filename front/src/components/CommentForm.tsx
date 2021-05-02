import React, { useCallback, useEffect } from 'react';
import { Button, Form, Input, message } from 'antd';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';

import useInput from '@hooks/useInput';
import { addCommentRequest } from '@reducers/post/addComment';
import { RootState } from '@reducers/.';
import { SinglePostData } from '@src/types/post';

interface CommentProps {
  post: SinglePostData;
}

const CommentForm = ({ post }: CommentProps) => {
  const dispatch = useDispatch();
  const id = useSelector((state: RootState) => state.user.me?.id);
  const { addCommentLoading, addCommentDone } = useSelector((state: RootState) => state.post);
  const [commentText, onChangeCommentText, setCommentText] = useInput('');

  const onSubmitComment = useCallback(() => {
    if (!id) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '로그인이 필요합니다.',
      });
    }

    if (!commentText || !commentText.trim()) {
      return message.error('댓글의 내용을 입력해주세요!');
    }

    dispatch(addCommentRequest({ content: commentText, postId: post.id, userId: id }));
  }, [commentText, id]);

  useEffect(() => {
    if (addCommentDone) {
      setCommentText('');
    }
  }, [addCommentDone]);

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item style={{ position: 'relative', margin: 0 }}>
        <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4} />
        <Button
          style={{ position: 'absolute', right: 0, bottom: -40, zIndex: 1 }}
          type="primary"
          htmlType="submit"
          loading={addCommentLoading}
        >
          덧글달기
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CommentForm;
