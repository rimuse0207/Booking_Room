import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import NavigationMainPage from '../../Navigation/NavigationMainPage';
import StockSelectMainPage from './StockSelect/StockSelectMainPage';
import UserApplySelectMainPage from './UserApplySelect/UserApplySelectMainPage';
import ExcelDownloadMainPage from './ExcelDownload/ExcelDownloadMainPage';
import AdminFoodDataInsertPage from './AdminFoodDataInsertPage';

const AdminBreakFastMainPageMainDivBox = styled.div`
    .Nav_Menu_Container {
        display: flex;
        max-width: 400px;
        min-height: 50px;
        justify-content: space-between;
        align-items: center;
        padding-left: 10px;
        padding-right: 10px;

        .Not_Checked_Show {
            opacity: 0.5;
        }

        li {
            width: 45%;
            border-bottom: 2px solid #368;
            text-align: center;
            padding: 10px;
            font-size: 1.1em;
            :hover {
                cursor: pointer;
            }
        }
    }
`;

const AdminBreakFastMainPage = () => {
    const [Admin_Nav_Menu, setAdmin_Nav_Menu] = useState([
        {
            Nav_Menu: '신청현황',
            Nav_Access: true,
        },
        {
            Nav_Menu: '재고현황',
            Nav_Access: false,
        },
        {
            Nav_Menu: '식단표입력',
            Nav_Access: false,
        },
    ]);

    const handleMoveToMenu = data => {
        setAdmin_Nav_Menu(
            Admin_Nav_Menu.map(list => (list.Nav_Menu === data.Nav_Menu ? { ...list, Nav_Access: true } : { ...list, Nav_Access: false }))
        );
    };

    return (
        <AdminBreakFastMainPageMainDivBox>
            <NavigationMainPage TitleName="조식현황"></NavigationMainPage>
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
                return list.Nav_Access && list.Nav_Menu === '신청현황' ? (
                    <UserApplySelectMainPage key={list.Nav_Menu}></UserApplySelectMainPage>
                ) : list.Nav_Access && list.Nav_Menu === '재고현황' ? (
                    <StockSelectMainPage key={list.Nav_Menu}></StockSelectMainPage>
                ) : list.Nav_Access && list.Nav_Menu === '식단표입력' ? (
                    <AdminFoodDataInsertPage key={list.Nav_Menu}></AdminFoodDataInsertPage>
                ) : (
                    <div key={list.Nav_Menu}></div>
                );
            })}
        </AdminBreakFastMainPageMainDivBox>
    );
};

export default AdminBreakFastMainPage;
