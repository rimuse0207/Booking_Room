import React from 'react';
import styled from 'styled-components';
import NavigationMainPage from '../Navigation/NavigationMainPage';
import FloorLayoutContainer from './FloorLayoutContainer/FloorLayoutContainer';

const FloorLayoutMainPageMainDivBox = styled.div`
    border: 1px solid black;
    overflow-x: auto;
`;

const FloorLayoutMainPage = () => {
    return (
        <FloorLayoutMainPageMainDivBox>
            <NavigationMainPage TitleName="자리배치도"></NavigationMainPage>
            <FloorLayoutContainer></FloorLayoutContainer>
        </FloorLayoutMainPageMainDivBox>
    );
};

export default FloorLayoutMainPage;
