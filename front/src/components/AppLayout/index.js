import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Header from './Header';
import Footer from './footer';
import { Section, MainContents } from './styled';

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);

  return (
    <div>
      <Header userInfo={me} />
      <Section>
        <MainContents> {children}</MainContents>
      </Section>
      <Footer />
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
