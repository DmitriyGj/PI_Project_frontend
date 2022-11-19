import { Layout } from 'antd';
import React from 'react';

const { Header, Footer, Sider, Content } = Layout;

import HeaderApp from "@components/header/Header";
import FooterApp from "@components/footer/Footer";
import MeetingCard from '@components/meetingCard/MeetingCard';
import Style from "@utils/withLayout/withLayout.module.scss";


const Layout1: React.FC = ({children}) => (
  <>
      <div className={Style.container}>
      <Layout>
          <Header>{<HeaderApp/>}</Header>
          <MeetingCard/>
          <Layout>
              <Sider>Sider</Sider>
              <Content>{children}</Content>
          </Layout>
          <Footer>{<FooterApp/>}</Footer>
      </Layout>
      </div>
  </>
);

export default Layout1;