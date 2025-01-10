import React from 'react';
import styled from 'styled-components';
import NavigationMainPage from '../../Navigation/NavigationMainPage';
import ContentContainer from '../Content/ContentContainer';
import { BrowserView, MobileView } from 'react-device-detect';

const ContainerMainDivBox = styled.div`
    padding-bottom: 50px;
`;

const Container = () => {
    return (
        <ContainerMainDivBox>
            <ContentContainer></ContentContainer>
        </ContainerMainDivBox>
    );
};

export default Container;
