import React from 'react';
import styled from 'styled-components';
import { AdminPrePareContainerMainDivBox } from '../PimRoomPrePare/AdminPrePare/AdminPrePareContainer';
import BasicFinishMainPage from './BasicFinish/BasicFinishMainPage';

const PimRoomFinishContainerMainDivBox = styled.div`
    border: 1px solid black;
`;

const PimRoomFinishContainer = () => {
    return (
        <AdminPrePareContainerMainDivBox>
            <BasicFinishMainPage></BasicFinishMainPage>
        </AdminPrePareContainerMainDivBox>
    );
};

export default PimRoomFinishContainer;
