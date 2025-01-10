import React from 'react';
import styled from 'styled-components';
import ListContainer from './Team_List_Container/TeamListContainer';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Axios_Get_Moduls, request } from '../../../API';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from '../../ToasMessage/ToastManager';
import VideoPlayer from './VideoPlayer';

const TeamRoomListMainPageMainDivBox = styled.div`
    padding: 10px;
`;

const headerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'blue',
};

const titleStyle = {
    color: 'blue', // h1의 색깔을 파란색으로 설정
    textDecoration: 'none',
};

const TeamRoomListMainPage = () => {
    return (
        <TeamRoomListMainPageMainDivBox>
            <header style={headerStyle}>
                <a href="http://192.168.2.241:3001/overseas/a_sk.mp4" style={titleStyle}>
                    <h1>통신비 정산 (SKT)</h1>
                </a>
            </header>
            <header style={headerStyle}>
                <a href="http://192.168.2.241:3001/overseas/a_kt.mp4" style={titleStyle}>
                    <h1>통신비 정산 (KT)</h1>
                </a>
            </header>
            <header style={headerStyle}>
                <a href="http://192.168.2.241:3001/overseas/meal.mp4" style={titleStyle}>
                    <h1>식대정산</h1>
                </a>
            </header>
            <header style={headerStyle}>
                <a href="http://192.168.2.241:3001/overseas/card.mp4" style={titleStyle}>
                    <h1>출장 정산 - 해외 ( 법인카드 사용 시 )</h1>
                </a>
            </header>
            <header style={headerStyle}>
                <a href="http://192.168.2.241:3001/overseas/nocard.mp4" style={titleStyle}>
                    <h1>출장 정산 - 해외 ( 법인카드 미 사용 시 )</h1>
                </a>
            </header>
            <header style={headerStyle}>
                <a href="http://192.168.2.241:3001/overseas/japan.mp4" style={titleStyle}>
                    <h1>일본어 교육비 정산</h1>
                </a>
            </header>
            <header style={headerStyle}>
                <a href="http://192.168.2.241:3001/overseas/copy.mp4" style={titleStyle}>
                    <h1>기타- 전표 복사하여 붙여 넣는 법</h1>
                </a>
            </header>
            <header style={headerStyle}>
                <a href="http://192.168.2.241:3001/overseas/err.mp4" style={titleStyle}>
                    <h1>기타- 자금계획서에 입출금구분을 할 수 없습니다. 오류</h1>
                </a>
            </header>
        </TeamRoomListMainPageMainDivBox>
    );
};

export default TeamRoomListMainPage;
