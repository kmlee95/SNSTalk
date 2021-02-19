import { Button, Form, Input } from 'antd';
import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import { useSelector, useDispatch } from 'react-redux';
import { addComment } from '../reducers/post';

const CommentForm = ({ post }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id);
  const { addCommentLoading, addCommentDone } = useSelector((state) => state.post);
  const [commentText, onChangeCommentText, setCommentText] = useInput('');

  const onSubmitComment = useCallback(() => {
    const { id: postId } = post;
    dispatch(addComment({ commentText, postId, id })); //comment내용, post.id, me.id
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
          삐약
        </Button>
      </Form.Item>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
