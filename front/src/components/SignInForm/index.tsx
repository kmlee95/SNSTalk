import React, { useCallback, useEffect, useMemo } from 'react';
import { Button, message } from 'antd';
import Link from 'next/link';

import { useDispatch, useSelector } from 'react-redux';
import { logInRequest } from '@reducers/user/login';
import useInput from '@hooks/useInput';
import { RootState } from '@reducers/.';
import { FormWarraper } from './styled';
import Input from './Input';

const SignInForm = () => {
  const { logInLoading, logInError } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(logInRequest({ email, password }));
    },
    [email, password],
  );

  const onDisabled = useMemo(() => !(email && email.trim() && password && password.trim()), [email, password]);

  useEffect(() => {
    if (logInError) {
      return message.error(logInError);
    }
  }, [logInError]);

  return (
    <FormWarraper onSubmit={onSubmitForm}>
      <p>Email Address</p>
      <Input placeholder="아이디" value={email} onChange={onChangeEmail} type="email" />
      <p>Password</p>
      <Input placeholder="비밀번호" value={password} onChange={onChangePassword} type="password" />
      <Button type="primary" htmlType="submit" loading={logInLoading} disabled={onDisabled}>
        로그인
      </Button>
      <div>
        <Link href="">
          <a>아이디 찾기</a>
        </Link>
        {'  '}
        <Link href="">
          <a>비밀번호 찾기</a>
        </Link>
      </div>
    </FormWarraper>
  );
};

export default SignInForm;
