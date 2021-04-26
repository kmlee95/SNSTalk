import React, { useCallback, memo } from 'react';
import Link from 'next/link';
import { Menu, Input } from 'antd';
import styled from 'styled-components';
import Router from 'next/router';
import { message } from 'antd';

import useInput from '../../hooks/useInput';

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const Header = memo(({ userInfo }) => {
  const [searchInput, onChangeSearchInput] = useInput('');

  const onSearch = useCallback(() => {
    if (!searchInput || !searchInput.trim()) {
      return message.error('검색어를 입력해주세요!');
    }

    Router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item>
          <Link href="/">
            <a>홈</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <SearchInput enterButton value={searchInput} onChange={onChangeSearchInput} onSearch={onSearch} />
        </Menu.Item>
        <Menu.Item>
          {userInfo ? (
            <Link href="/profile">
              <a>프로필</a>
            </Link>
          ) : (
            '로그인'
          )}
        </Menu.Item>
      </Menu>
    </div>
  );
});

export default Header;
