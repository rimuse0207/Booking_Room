import React from 'react';
import styled from 'styled-components';
import BasicPrePareContainer from './BasicPrePare/BasicPrePareContainer';
import { FaArrowLeft } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import RoomNav from '../../PimNav/RoomNav';

const PimRoomPrePareContainerMainDivBox = styled.div``;

const PimRoomPrePareContainer = ({ Room_Keys }) => {
    const [Attention, setAttention] = useState([
        { title: '게임당 투표는 최대 3만Will까지 투표가 가능합니다.' },
        { title: '자신에게 한 투표는 결과합계에 반영되지 않습니다.' },
        { title: '투표금액은 자기자신밖에 볼 수 없습니다.' },
    ]);

    return (
        <PimRoomPrePareContainerMainDivBox>
            <RoomNav Attention={Attention}></RoomNav>
            <BasicPrePareContainer Room_Keys={Room_Keys}></BasicPrePareContainer>
        </PimRoomPrePareContainerMainDivBox>
    );
};

export default PimRoomPrePareContainer;
