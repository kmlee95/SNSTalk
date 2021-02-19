import React, { useCallback, useState, useRef, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { addPost } from '../reducers/post';
import useInput from '../hooks/useInput';

const PostForm = () => {
  const { imagePaths, addPostDone } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [text, onChangeText, setText] = useInput('');

  const onSubmit = useCallback(() => {
    dispatch(addPost(text));
    //setText(''); //dispatch 되었는데 서버에서 에러가 났을 경우 지워지면 안되므로 useEffect로 뺀다.
  }, [text]);

  const imageInput = useRef();
  const onclickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);

  return (
    <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onFinish={onSubmit}>
      <Input.TextArea value={text} onChange={onChangeText} maxLength={140} placeholder="어떤 신기한 일이 있었나요?" />
      <div>
        <input type="file" multiple hidden ref={imageInput} />
        <Button onClick={onclickImageUpload}>이미지 업로드</Button>
        <Button type="primary" style={{ float: 'right' }} htmlType="submit">
          올리기
        </Button>
      </div>
      <div>
        {imagePaths &&
          imagePaths.map((v) => (
            <div key={v} style={{ display: 'inline-block' }}>
              <img src={v} style={{ width: '200px' }} alt={v} />
              <div>
                <Button>제거</Button>
              </div>
            </div>
          ))}
      </div>
    </Form>
  );
};

export default PostForm;
