import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import Manage from '../Content/Manage/Manage';
import Registered from '../Content/Registered/Registered';
import PartyPostList from '../Content/PartyPostList/PartyPostList';

const ContainerMainPageMainDivBox = styled.div`
    .Nav_Menu_Container {
        display: flex;
        min-height: 50px;
        justify-content: start;
        align-items: center;
        padding-left: 10px;
        padding-right: 10px;

        .Not_Checked_Show {
            opacity: 0.5;
        }

        li {
            width: 300px;
            border-bottom: 2px solid #368;
            text-align: center;
            padding: 10px;
            font-size: 1.1em;
            margin-right: 10px;
            :hover {
                cursor: pointer;
            }
        }
    }
`;

const ContainerMainPage = () => {
    const [Admin_Nav_Menu, setAdmin_Nav_Menu] = useState([
        {
            Nav_Menu: '회의실 등록 정보',
            Nav_Access: true,
        },
        {
            Nav_Menu: '회의실 등록',
            Nav_Access: false,
        },
        {
            Nav_Menu: '당직근무 메일 및 메시지 전송 추가',
            Nav_Access: false,
        },
    ]);

    const handleMoveToMenu = data => {
        setAdmin_Nav_Menu(
            Admin_Nav_Menu.map(list => (list.Nav_Menu === data.Nav_Menu ? { ...list, Nav_Access: true } : { ...list, Nav_Access: false }))
        );
    };
    return (
        <ContainerMainPageMainDivBox>
            <ul className="Nav_Menu_Container">
                {Admin_Nav_Menu.map(list => {
                    return (
                        <li
                            key={list.Nav_Menu}
                            className={list.Nav_Access ? '' : 'Not_Checked_Show'}
                            onClick={() => handleMoveToMenu(list)}
                        >
                            <div>{list.Nav_Menu}</div>
                        </li>
                    );
                })}
            </ul>
            {Admin_Nav_Menu.map((list, i) => {
                return list.Nav_Access && list.Nav_Menu === '회의실 등록 정보' ? (
                    <Manage key={list.Nav_Menu}></Manage>
                ) : list.Nav_Access && list.Nav_Menu === '회의실 등록' ? (
                    <Registered></Registered>
                ) : list.Nav_Access && list.Nav_Menu === '당직근무 메일 및 메시지 전송 추가' ? (
                    <PartyPostList></PartyPostList>
                ) : (
                    <div key={list.Nav_Menu}></div>
                );
            })}
        </ContainerMainPageMainDivBox>
    );
};

export default ContainerMainPage;
