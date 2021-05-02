import React, { memo } from 'react';

import { FooterWrapper } from './styled';

const Footer = memo(() => (
  <FooterWrapper>
    <div>
      <div>
        <span>이경민</span>
        <span>mail kmlee95@naver.com</span>
        <span>github kmlee95</span>
      </div>
      <div>CopyRight 2021. 이경민. All rights reserved.</div>
    </div>
  </FooterWrapper>
));

export default Footer;
