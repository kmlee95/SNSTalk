import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { useSelector } from 'react-redux';

import UserProfile from '../UserProfile';
import SignInForm from '../SignInForm';
import Header from './Header';
import Footer from './footer';
import { Section } from './styled';

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);

  return (
    <div>
      <Header userInfo={me} />
      <Section>
        <Row gutter={8}>
          <Col xs={24} md={24}>
            {children}
          </Col>
        </Row>
      </Section>
      <Footer />
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
