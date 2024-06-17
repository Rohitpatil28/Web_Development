import React from 'react';
import styled from 'styled-components';

const FooterDiv = styled.div`
  display: flex;
  justify-content: center;
  background-color: #e0e0e0;
  padding: 8px;
`;

function Footer() {
  return (
    <footer className='footer' style={{ backgroundColor: 'white' }}>
      <FooterDiv>
        Copyright © Shoppers Stop. All rights reserved.
      </FooterDiv>
    </footer>
  );
};

export default Footer;