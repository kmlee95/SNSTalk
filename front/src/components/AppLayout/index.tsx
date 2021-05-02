import React from 'react';
import { useSelector } from 'react-redux';

import Header from './Header';
import Footer from './Footer';
import { Section, MainContents } from './styled';
import { RootState } from '@reducers/.';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const { me } = useSelector((state: RootState) => state.user);

  return (
    <div>
      <Header userInfo={me} />
      <Section>
        <MainContents>{children}</MainContents>
      </Section>
      <Footer />
    </div>
  );
};

export default AppLayout;
