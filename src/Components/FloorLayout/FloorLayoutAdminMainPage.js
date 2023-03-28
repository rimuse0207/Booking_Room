import React from 'react';
import styled from 'styled-components';
import NavigationMainPage from '../Navigation/NavigationMainPage';
import FloorLayoutContainer from './FloorLayoutContainer/FloorLayoutContainer';

const FloorLayoutAdminMinPageMainDivBox = styled.div``;

const FloorLayoutAdminMinPage = () => {
    return (
        <FloorLayoutAdminMinPageMainDivBox>
            <NavigationMainPage TitleName="자리배치도"></NavigationMainPage>
            <FloorLayoutContainer></FloorLayoutContainer>
        </FloorLayoutAdminMinPageMainDivBox>
    );
};

export default FloorLayoutAdminMinPage;
