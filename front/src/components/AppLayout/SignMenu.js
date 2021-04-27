import React, { memo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { MenuOutlined } from '@ant-design/icons';
import { Avatar, Menu, Drawer, Button } from 'antd';
import { HeaderMenu, SignLink } from './styled';
import { logoutRequestAction } from '../../reducers/user';

const SignInMenu = memo(({ info }) => {
  const dispatch = useDispatch();
  const { logOutLoading } = useSelector((state) => state.user);

  const onLogout = useCallback(() => {
    dispatch(logoutRequestAction());
  }, [dispatch]);

  return (
    <HeaderMenu mode="horizontal" overflowedIndicator={<MenuOutlined />}>
      <SignLink key="profile">
        <Link href="/profile">
          <span>내 프로필</span>
        </Link>
      </SignLink>
      <SignLink key="edit">
        <Link href="/edit">
          <span>회원정보 변경</span>
        </Link>
      </SignLink>
      <SignLink key="logout">
        <Button onClick={onLogout} loading={logOutLoading}>
          <span>로그아웃</span>
        </Button>
      </SignLink>
    </HeaderMenu>
  );
});

export default SignInMenu;
