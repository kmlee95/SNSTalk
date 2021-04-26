import styled from 'styled-components';
import { Input, Menu } from 'antd';

export const HeaderWrapper = styled.header`
  position: fixed;
  background-color: ${(props) => props.theme.PRIMARY_COLOR};
  width: 100%;
  height: 50px;
  z-index: 1001;
  & > div {
    margin: 0 auto;
    display: flex;
    width: 1200px;
  }
  @media (max-width: ${(props) => props.theme.BREAK_POINT.HDPC}px) {
    & > div {
      padding: 0 10px;
      width: 100%;
    }
  }
`;

export const FooterWrapper = styled.footer`
  position: fixed;
  display: flex;
  bottom: 0;
  width: 100%;
  height: 100px;
  justify-content: center;
  align-items: center;

  background-color: ${(props) => props.theme.PRIMARY_COLOR};
  & > div {
    width: 1200px;
    height: 60px;
    color: ${(props) => props.theme.BACKGROUND_COLOR};
    & > div:first-child {
      & > span:nth-child(-n + 2)::after {
        content: '|';
        color: ${(props) => props.theme.LIGHT_GREY};
        margin: 0 10px;
      }
      & > span:nth-child(n + 2) {
        color: ${(props) => props.theme.LIGHT_GREY};
      }
    }
    @media (max-width: ${(props) => props.theme.BREAK_POINT.HDPC}px) {
      padding: 0 10px;
    }
    @media (max-width: ${(props) => props.theme.BREAK_POINT.TABLET}px) {
      text-align: center;
    }
  }
`;

export const Section = styled.section`
  display: flex;
  justify-content: center;
  flex-grow: 1;
  padding-bottom: 100px;
  padding-top: 70px;
  width: 1200px;
  margin: 0 auto;
  & > div {
    width: 80%;
    display: flex;
    justify-content: center;
  }
  @media (max-width: ${(props) => props.theme.BREAK_POINT.HDPC}px) {
    width: 100%;
    & > div {
      width: 90%;
    }
  }
  @media (max-width: ${(props) => props.theme.BREAK_POINT.TABLET}px) {
    & > div {
      flex-wrap: wrap-reverse;
    }
  }
`;

export const HeaderMenu = styled(Menu)`
  background-color: inherit;
`;

export const SignLink = styled(Menu.Item)`
  text-align: center;
  font-weight: 900;
  width: 100px;
  @media (max-width: ${(props) => props.theme.BREAK_POINT.TABLET}px) {
    width: 80px;
  }
  @media (max-width: ${(props) => props.theme.BREAK_POINT.MOBILE}px) {
    width: 100%;
  }
`;

export const SearchInput = styled(Input.Search)`
  margin-left: 10px;
  height: 30px;
  width: 500px;
  & input {
    color: black;
  }
  @media (max-width: ${(props) => props.theme.BREAK_POINT.PC}px) {
    width: 400px;
  }
  @media (max-width: ${(props) => props.theme.BREAK_POINT.TABLET}px) {
    width: 200px;
  }
  @media (max-width: ${(props) => props.theme.BREAK_POINT.MOBILE}px) {
    flex: 1;
  }
`;

export const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  & img {
    height: 32px;
  }
`;
