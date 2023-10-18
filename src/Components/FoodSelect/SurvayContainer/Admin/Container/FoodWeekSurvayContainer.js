import React from 'react';
import FoodWeekSurvayContent from '../Content/FoodWeekSurvayContent';
import { useState } from 'react';
import { AdminBreakFastMainPageMainDivBox } from '../../../../BreakFast/AdminBreakFast/AdminBreakFastMainPage';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import moment from 'moment';
import { UserApplySelectMainPageMainDivBox } from '../../../../BreakFast/AdminBreakFast/UserApplySelect/UserApplySelectMainPage';
import FoodImageUploadContent from '../Content/FoodImageUploadContent';
const FoodWeekSurvayContainer = () => {
    const [Admin_Nav_Menu, setAdmin_Nav_Menu] = useState([
        {
            Nav_Menu: '식단 설문조사',
            Nav_Access: true,
        },
        {
            Nav_Menu: '잔반 이미지 업로드',
            Nav_Access: false,
        },
    ]);
    const [NowDates, setNowDates] = useState(moment());

    const handleMoveToMenu = data => {
        setAdmin_Nav_Menu(
            Admin_Nav_Menu.map(list => (list.Nav_Menu === data.Nav_Menu ? { ...list, Nav_Access: true } : { ...list, Nav_Access: false }))
        );
    };

    return (
        <AdminBreakFastMainPageMainDivBox>
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
            <UserApplySelectMainPageMainDivBox>
                <div className="DateClickContainer">
                    <div onClick={() => setNowDates(moment(NowDates).subtract(1, 'month').format('YYYY-MM'))}>
                        <IoIosArrowBack></IoIosArrowBack>
                    </div>
                    <div>{moment(NowDates).format('YYYY-MM')}</div>
                    <div onClick={() => setNowDates(moment(NowDates).add(1, 'month').format('YYYY-MM'))}>
                        <IoIosArrowForward></IoIosArrowForward>
                    </div>
                </div>
            </UserApplySelectMainPageMainDivBox>
            {Admin_Nav_Menu.map((list, i) => {
                return list.Nav_Access && list.Nav_Menu === '식단 설문조사' ? (
                    <FoodWeekSurvayContent key={list.Nav_Menu} NowDates={NowDates}></FoodWeekSurvayContent>
                ) : list.Nav_Access && list.Nav_Menu === '잔반 이미지 업로드' ? (
                    <FoodImageUploadContent key={list.Nav_Menu} NowDates={NowDates}></FoodImageUploadContent>
                ) : (
                    <div key={list.Nav_Menu}></div>
                );
            })}
        </AdminBreakFastMainPageMainDivBox>
    );
};

export default FoodWeekSurvayContainer;
