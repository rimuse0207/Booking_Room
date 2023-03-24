import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import NavigationMainPage from '../Navigation/NavigationMainPage';
import FloorLayoutContainer from './FloorLayoutContainer/FloorLayoutContainer';
import FloorLayoutUserMainPage from './User/FloorLayoutUserMainPage';

const FloorLayoutMainPageMainDivBox = styled.div`
    border: 1px solid black;
    overflow: auto;
    height: 100vh;
    width: 100%;
    background-color: #fff;
`;

const FloorLayoutMainPage = () => {
    const LoginInfo = useSelector(state => state.LoginInfoDataRedux.Infomation);
    return (
        <FloorLayoutMainPageMainDivBox>
            <NavigationMainPage TitleName="자리배치도"></NavigationMainPage>
            {/* <FloorLayoutContainer></FloorLayoutContainer> */}
            <FloorLayoutUserMainPage></FloorLayoutUserMainPage>
        </FloorLayoutMainPageMainDivBox>
    );
};

export default FloorLayoutMainPage;
