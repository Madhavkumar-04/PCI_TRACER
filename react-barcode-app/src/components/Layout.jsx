import React, { useState } from 'react';
import styled from 'styled-components';
import ProgressTracker from './ProgressTracker';
import TopBar from './TopBar';
import LeftSection from './LeftSection';
import { useLocation } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #121212; /* Dark background theme */
  width: 100vw; /* Full width */
  overflow-x: hidden; /* Prevent horizontal scroll */
`;

const Header = styled.header`
  background: #1e1e1e;
  padding: 1rem;
  display: flex;
  border-bottom: 1px solid #333; /* Subtle border for separation */
`;

const Content = styled.div`
  display: flex;
  flex: 1;
`;

const CenterProgressWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row; /* Default to row layout */
  overflow-x: hidden; /* Prevent overflow */
  height: fit-content;

  @media (max-width: 1380px) {
    flex-direction: column; /* Stack elements vertically on smaller screens */
  }
`;

const CenterSection = styled.section`
  flex: 3; /* Takes up more space */
  background: #1e1e1e;
  padding: 1rem;
  margin-right: 1rem; /* Space between center and progress sections */
  overflow: auto; /* Allow vertical scrolling if content overflows */
  height: auto; /* Adjust height based on content */
  max-height: calc(100vh - 80px); /* Limit height to prevent overflow beyond viewport */
  
  @media (max-width: 1380px) {
    margin-right: 0; /* Remove margin on smaller screens */
  }
`;

const ProgressSection = styled.div`
  flex: 1; /* Takes up less space */
  background: #1e1e1e;
  padding: 1rem;
  overflow: auto; /* Allow vertical scrolling if content overflows */

  @media (max-width: 1380px) {
    margin-top: 1rem; /* Space between center and progress sections */
  }
`;

const Layout = ({ children, formData }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Define which routes should show the ProgressTracker
  const showProgress = ['/form1', '/form2', '/form3', '/form4'].includes(location.pathname);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Container>
      <Header>
        <TopBar toggleSidebar={toggleSidebar} />
      </Header>
      <Content>
        <LeftSection isOpen={isSidebarOpen} />
        <CenterProgressWrapper>
          <CenterSection>{children}</CenterSection>
          {showProgress && (
            <ProgressSection>
              <ProgressTracker formData={formData} />
            </ProgressSection>
          )}
        </CenterProgressWrapper>
      </Content>
    </Container>
  );
};

export default Layout;
