import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import NavigationMainPage from '../Navigation/NavigationMainPage';
import FloorLayoutContainer from './FloorLayoutContainer/FloorLayoutContainer';
import FloorLayoutUserMainPage from './User/FloorLayoutUserMainPage';
import { BrowserView, MobileView } from 'react-device-detect';

const FloorLayoutMainPageMainDivBox = styled.div`
    overflow: auto;
    height: 100vh;
    width: 100%;
    background-color: #fff;
`;

const FloorLayoutMainPage = () => {
    return (
        <FloorLayoutMainPageMainDivBox>
            <NavigationMainPage TitleName="자리배치도"></NavigationMainPage>

            {/* <FloorLayoutContainer></FloorLayoutContainer> */}

            {/* PC환경 시작*/}
            {/* <BrowserView>
                <FloorLayoutUserMainPage></FloorLayoutUserMainPage>
            </BrowserView> */}
            {/* PC환경 끝*/}

            {/* 모바일 환경 시작 */}
            {/* <MobileView>모바일 환경에서 지원하지 않습니다.</MobileView> */}

            <FloorLayoutUserMainPage></FloorLayoutUserMainPage>
            {/* 모바일 환경 끝 */}
        </FloorLayoutMainPageMainDivBox>
    );
};

export default FloorLayoutMainPage;
