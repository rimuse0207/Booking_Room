import React from 'react';
import styled from 'styled-components';
import NavigationMainPage from '../Navigation/NavigationMainPage';
import Container from './Container/Container';
import { BrowserView, MobileView } from 'react-device-detect';

const overseasMainPage = () => {
    return (
        <overseasMainPageMainDivBox>
            <NavigationMainPage TitleName="해외출장 업무 신청"></NavigationMainPage>
            <BrowserView>
                <Container></Container>
            </BrowserView>
            <MobileView>
                <h3>죄송합니다.</h3>
                <h3>모바일에서는 지원하지 않습니다.</h3>
            </MobileView>
        </overseasMainPageMainDivBox>
    );
};

export default overseasMainPage;
