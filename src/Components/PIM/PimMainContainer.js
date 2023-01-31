import React from 'react';
import styled from 'styled-components';
import NavigationMainPage from '../Navigation/NavigationMainPage';
import PimRoomList from './PimRoomList/PimRoomList';

const PimMainContainerMainDivBox = styled.div`
    border: 1px solid black;
    .Container {
        max-width: 80%;
        margin: 0 auto;
        @media only screen and (max-width: 800px) {
            max-width: 100%;
            margin: 0;
        }
    }
`;

const PimMainContainer = () => {
    return (
        <PimMainContainerMainDivBox>
            <NavigationMainPage TitleName="PIM 로컬전"></NavigationMainPage>
            <div className="Container">
                <PimRoomList></PimRoomList>
            </div>
        </PimMainContainerMainDivBox>
    );
};

export default PimMainContainer;
