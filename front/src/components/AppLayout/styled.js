import styled from 'styled-components';

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
