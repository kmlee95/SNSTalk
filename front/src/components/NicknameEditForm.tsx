import { Form, Input } from 'antd';
import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useInput from '@hooks/useInput';
import { RootState } from '@reducers/.';
import { changeNicknameRequest } from '@reducers/user/updateUserInfo';

const NicknameEditForm = () => {
  const { me } = useSelector((state: RootState) => state.user);
  const [nickname, onChangeNickname] = useInput<string>(me?.nickname || '');
  const dispatch = useDispatch();

  const onSubmit = useCallback(() => {
    dispatch(changeNicknameRequest(nickname));
  }, [nickname]);

  return (
    <Form style={{ marginBottom: '20px', border: '1px solid #d9d9d9', padding: '20px' }}>
      <Input.Search
        value={nickname}
        onChange={onChangeNickname}
        addonBefore="닉네임"
        enterButton="수정"
        onSearch={onSubmit}
      />
    </Form>
  );
};

export default NicknameEditForm;
