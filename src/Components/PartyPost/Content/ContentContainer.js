import React from 'react';
import styled from 'styled-components';
import NaviBar from './NaviBar/NaviBar';
import InfoBoxMainPage from './InfoBox/InfoBoxMainPage';
import PatrolBox from './PatrolBox/PatrolBox';
import ArgumentsBox from './ArgumentsBox/ArgumentsBox';
import SiginificantBox from './SignificantBox/SiginificantBox';
import InspectionBox from './InspectionBox/InspectionBox';

const ContentContainerMainDivBox = styled.div`
    .Main_Body_Container {
        margin: 40px;
    }
`;

const ContentContainer = () => {
    return (
        <ContentContainerMainDivBox>
            <NaviBar></NaviBar>
            <div className="Main_Body_Container">
                <InfoBoxMainPage></InfoBoxMainPage>
                <PatrolBox></PatrolBox>
                <ArgumentsBox></ArgumentsBox>
                <SiginificantBox></SiginificantBox>
                <InspectionBox></InspectionBox>
            </div>
        </ContentContainerMainDivBox>
    );
};

export default ContentContainer;
