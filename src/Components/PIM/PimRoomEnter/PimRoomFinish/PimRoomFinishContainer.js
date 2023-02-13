import React from 'react';
import styled from 'styled-components';
import { AdminPrePareContainerMainDivBox } from '../PimRoomPrePare/AdminPrePare/AdminPrePareContainer';
import BasicFinishMainPage from './BasicFinish/BasicFinishMainPage';

const PimRoomFinishContainerMainDivBox = styled.div`
    border: 1px solid black;
`;

const PimRoomFinishContainer = ({ Room_Keys }) => {
    return (
        <AdminPrePareContainerMainDivBox>
            <BasicFinishMainPage Room_Keys={Room_Keys}></BasicFinishMainPage>
        </AdminPrePareContainerMainDivBox>
    );
};

export default PimRoomFinishContainer;
