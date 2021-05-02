import React, { memo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { MenuOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button } from 'antd';

import { HeaderMenu, SignLink } from './styled';
import { logOutRequest } from '@reducers/user/logout';
import { RootState } from '@reducers/.';
import { MeInfo } from '@src/types/user';

interface SignInMenuProps {
  info: MeInfo;
}

const SignInMenu = memo(({ info }: SignInMenuProps) => {
  const dispatch = useDispatch();
  const { logOutLoading } = useSelector((state: RootState) => state.user);

  const onLogout = useCallback(() => {
    dispatch(logOutRequest());
  }, [dispatch]);

  return (
    <HeaderMenu mode="horizontal" overflowedIndicator={<MenuOutlined />}>
      <SignLink key="profile">
        <Link href="/profile">
          <a>
            {info.nickname ? (
              <Avatar size={30} src={`${info.nickname.substring(0, 1)}`} />
            ) : (
              <Avatar size={30} icon={<UserOutlined />} />
            )}
            <div>`${info.nickname}`</div>
          </a>
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
