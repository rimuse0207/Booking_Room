import React from 'react';
import styled from 'styled-components';
import { BrowserView, MobileView } from 'react-device-detect';
import Container from './Container/Container';

const PartyPostMainPageMainDivBox = styled.div`
    background-color: oldlace;
`;

const PartyPostMainPage = () => {
    return (
        <PartyPostMainPageMainDivBox>
            <BrowserView>
                <Container></Container>
            </BrowserView>
            <MobileView>
                <h3>죄송합니다.</h3>
                <h3>모바일에서는 지원하지 않습니다.</h3>
            </MobileView>
        </PartyPostMainPageMainDivBox>
    );
};

export default PartyPostMainPage;
