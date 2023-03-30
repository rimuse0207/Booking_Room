import React from 'react';
import styled from 'styled-components';
import NavigationMainPage from '../Navigation/NavigationMainPage';
import FloorLayoutContainer from './FloorLayoutContainer/FloorLayoutContainer';
import { BrowserView, MobileView } from 'react-device-detect';

const FloorLayoutAdminMinPageMainDivBox = styled.div``;

const FloorLayoutAdminMinPage = () => {
    return (
        <FloorLayoutAdminMinPageMainDivBox>
            <NavigationMainPage TitleName="자리배치도"></NavigationMainPage>

            {/* PC환경 시작*/}
            <BrowserView>
                <FloorLayoutContainer></FloorLayoutContainer>
            </BrowserView>
            {/* PC환경 끝*/}

            {/* 모바일환경 시작*/}
            <MobileView>모바일 환경에서 지원하지 않습니다.</MobileView>
            {/* 모바일환경 끝*/}
        </FloorLayoutAdminMinPageMainDivBox>
    );
};

export default FloorLayoutAdminMinPage;
