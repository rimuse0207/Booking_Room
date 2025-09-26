import React, { useEffect, useState } from 'react';
import HomeCalendarContainer from './HomeCalendar/HomeCalendarContainer';
import NavigationMainPage from '../../Navigation/NavigationMainPage';
import styled from 'styled-components';
import SelectTableMainPage from './SelectTable/SelectTableMainPage';
import { Request_Get_Axios } from '../../../API';
import { useSelector } from 'react-redux';
import { AdminBreakFastMainPageMainDivBox } from '../../BreakFast/AdminBreakFast/AdminBreakFastMainPage';
import ApplyPimsMainPage from './ApplyPims/ApplyPimsMainPage';

const DailyPimsMainPageMainDivBox = styled.div`
    .Content_Container {
        display: flex;
        flex-flow: wrap;
        .Calendar_Container {
            width: 50%;
            padding: 10px;
            background-color: #fff;
            border: 1px solid lightgray;
            height: calc(100vh - 60px);
        }
    }

    @media only screen and (max-width: 800px) {
        .Content_Container {
            display: block;
            height: 100%;

            > :first-child {
                display: none;
            }
            .Calendar_Container {
                width: 100%;
                border: none;
                height: 100%;
                padding-bottom: 30px;
                select {
                    width: 100%;
                }
            }
        }
    }
`;
const DailyPimsMainPage = () => {
    const Login_Info = useSelector(state => state.LoginInfoDataRedux.Infomation);
    const now = new Date();
    const [year, setYear] = useState(now.getFullYear());
    const [month, setMonth] = useState(now.getMonth());
    const [PimsLists, setPimsLists] = useState([]);
    const [Admin_Nav_Menu, setAdmin_Nav_Menu] = useState([
        {
            Nav_Menu: '일정 등록',
            Nav_Access: true,
            Mode: 'apply',
        },
        {
            Nav_Menu: '일정 등록 현황',
            Nav_Access: false,
            Mode: 'select',
        },
    ]);
    const [Choose_Menu, setChoose_Menu] = useState('apply');
    const Getting_pims_Lists_From_Date = async () => {
        const Getting_pims_Lists_From_Date_Axios = await Request_Get_Axios('/users/Getting_pims_Lists_From_Date', {
            date: `${year}-${month + 1}`,
            userId: Login_Info.Login_id,
        });
        if (Getting_pims_Lists_From_Date_Axios.status) {
            setPimsLists(Getting_pims_Lists_From_Date_Axios.data);
        }
    };
    useEffect(() => {
        Getting_pims_Lists_From_Date();
    }, [year, month]);
    return (
        <DailyPimsMainPageMainDivBox>
            <NavigationMainPage TitleName="나의 일정"></NavigationMainPage>
            <div className="Content_Container">
                <div className="Calendar_Container">
                    <HomeCalendarContainer
                        year={year}
                        month={month}
                        setYear={data => setYear(data)}
                        setMonth={data => setMonth(data)}
                        Getting_pims_Lists_From_Date={() => Getting_pims_Lists_From_Date()}
                        PimsLists={PimsLists}
                    ></HomeCalendarContainer>
                </div>
                <div className="Calendar_Container">
                    <AdminBreakFastMainPageMainDivBox>
                        <ul className="Nav_Menu_Container">
                            {Admin_Nav_Menu.map(list => {
                                return (
                                    <li
                                        key={list.Nav_Menu}
                                        className={list.Nav_Access ? '' : 'Not_Checked_Show'}
                                        onClick={() => {
                                            setAdmin_Nav_Menu(
                                                Admin_Nav_Menu.map(item => {
                                                    return item.Nav_Menu === list.Nav_Menu
                                                        ? { ...item, Nav_Access: true }
                                                        : { ...item, Nav_Access: false };
                                                })
                                            );
                                            setChoose_Menu(list.Mode);
                                        }}
                                    >
                                        <div style={{ fontWeight: 'bolder' }}>{list.Nav_Menu}</div>
                                    </li>
                                );
                            })}
                        </ul>
                    </AdminBreakFastMainPageMainDivBox>

                    {Choose_Menu === 'select' ? (
                        <SelectTableMainPage
                            PimsLists={PimsLists}
                            ChooseDate={`${year}-${month + 1}`}
                            Getting_pims_Lists_From_Date={() => Getting_pims_Lists_From_Date()}
                            year={year}
                            month={month}
                            setYear={data => setYear(data)}
                            setMonth={data => setMonth(data)}
                        ></SelectTableMainPage>
                    ) : (
                        <ApplyPimsMainPage
                            Getting_pims_Lists_From_Date={() => Getting_pims_Lists_From_Date()}
                            ChooseDate={`${year}-${month + 1}`}
                        ></ApplyPimsMainPage>
                    )}
                </div>
            </div>
        </DailyPimsMainPageMainDivBox>
    );
};

export default DailyPimsMainPage;
