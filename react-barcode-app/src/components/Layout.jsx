import React from 'react';
import styled from 'styled-components';
import ProgressTracker from './ProgressTracker';
import TopBar from './Topbar';
import LeftSection from './Leftsection';
const Container = styled.div`
  display: grid;
  grid-template-areas:
    "header"
    "main";
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr;
  height: 100vh;
  background-color: #121212; /* Dark background theme */
  width: 100vw; /* Full width */
  overflow: hidden; /* Prevent horizontal scroll */
`;

const Header = styled.header`
  grid-area: header;
  background: #1e1e1e;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #333; /* Subtle border for separation */
`;

const Main = styled.main`
  grid-area: main;
  display: grid;
  grid-template-areas:
    "left center right";
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: 1fr;
  height: calc(100vh - 4rem); /* Adjust based on the header height */
  overflow: auto; /* Allow scrolling if content overflows */
`;




const CenterSection = styled.section`
  grid-area: center;
  background: #1e1e1e;
  padding: 1rem;
`;

const Layout = ({ children, formData }) => {
  return (
    <Container>
      <Header>
        <TopBar />
      </Header>
      <Main>
        <LeftSection />
        <CenterSection>{children}</CenterSection>
        <ProgressTracker formData={formData} />
      </Main>
    </Container>
  );
};

export default Layout;
