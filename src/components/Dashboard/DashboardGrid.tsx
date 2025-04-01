import React from 'react';
import styled from 'styled-components';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 20px;
  padding: 20px;
`;

const DashboardGrid = ({ children }) => {
    return (
        <GridContainer>
            {children}
        </GridContainer>
    );
};

export default DashboardGrid;