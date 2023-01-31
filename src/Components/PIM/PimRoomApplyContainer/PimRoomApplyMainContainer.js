import React from 'react';
import styled from 'styled-components';
import NavigationMainPage from '../../Navigation/NavigationMainPage';
import PimRoomApply from './PimRoomApply/PimRoomApply';

const PimRoomAppyMainDivBox = styled.div`
    .Container {
        max-width: 80%;
        margin: 0 auto;
    }
`;

const PimRoomApplyMainContainer = () => {
    return (
        <PimRoomAppyMainDivBox>
            <NavigationMainPage TitleName="PIM로컬전 방생성"></NavigationMainPage>
            <div className="Container">
                <PimRoomApply></PimRoomApply>
            </div>
        </PimRoomAppyMainDivBox>
    );
};

export default PimRoomApplyMainContainer;
