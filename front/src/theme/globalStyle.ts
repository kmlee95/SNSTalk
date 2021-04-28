import { createGlobalStyle } from 'styled-components';

export const GolbalStyle = createGlobalStyle`
  html {
    height: 100%;
  }
  body {
    @import url('https://fonts.googleapis.com/css?family=Nanum+Gothic&display=swap');
    background-color: #f0f2f5;
    height: 100%;
    font-weight: 900;
    & > #__next {
      height: 100%;
    }
    &  * {
      font-family: 'Nanum Gothic', sans-serif;
    }
  }

  /* a-style */
  a {color: #000000; text-decoration: none; outline: none}
  a:hover, a:active {text-decoration: none; color:#000000;}

  .slick-slide {
    display: inline-block;
  }
  .ant-card-cover {
    transform: none !important; //transform 안에 fixed가 들어가면 잡지를 못한다. 그래서 해제시켜준다.
  }
`;
