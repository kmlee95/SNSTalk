import React, { useCallback, memo } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { message } from 'antd';

import useInput from '@hooks/useInput';
import UnSignInMenu from './UnSignInMenu';
import SignMenu from './SignMenu';
import { HeaderWrapper, SearchInput, MenuWrapper } from './styled';
import { MeInfo } from '@src/types/user';

interface HeaderProps {
  userInfo: MeInfo;
}

const Header = memo(({ userInfo }: HeaderProps) => {
  const [searchInput, onChangeSearchInput] = useInput('');

  const onSearch = useCallback(() => {
    if (!searchInput || !searchInput.trim()) {
      return message.error('검색어를 입력해주세요!');
    }

    Router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

  return (
    <HeaderWrapper>
      <div>
        <MenuWrapper>
          <Link href="/">
            <a>
              <img src="/favicon.ico" alt="logo" />
            </a>
          </Link>
          <SearchInput enterButton value={searchInput} onChange={onChangeSearchInput} onSearch={onSearch} />
        </MenuWrapper>
        {userInfo ? <SignMenu info={userInfo} /> : <UnSignInMenu />}
      </div>
    </HeaderWrapper>
  );
});

export default Header;
