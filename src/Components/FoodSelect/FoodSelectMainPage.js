import React, { useCallback, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import NavigationMainPage from '../Navigation/NavigationMainPage';
import FoodSelectContainer from './FoodSelectContainer/FoodSelectContainer';

const FoodSelectMainPageMainDivBox = styled.div`
    border: 1px solid black;
    min-height: 100vh;
`;

const FoodSelectMainPage = () => {
    return (
        <FoodSelectMainPageMainDivBox>
            <NavigationMainPage TitleName="잔반 이미지 업로드"></NavigationMainPage>
            <FoodSelectContainer></FoodSelectContainer>
        </FoodSelectMainPageMainDivBox>
    );
};

export default FoodSelectMainPage;
