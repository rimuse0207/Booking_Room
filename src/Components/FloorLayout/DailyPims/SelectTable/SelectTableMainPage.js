import moment from 'moment';
import React, { useState } from 'react';
import styled from 'styled-components';
import ScheduleRegistration, { DivideType } from '../HomeCalendar/ScheduleRegistration/ScheduleRegistration';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { toast } from '../../../ToasMessage/ToastManager';
import { Request_Post_Axios } from '../../../../API';
import { Button, CalendarHeader } from '../HomeCalendar/Calendar';

const SelectTableMainPageMainDivBox = styled.div`
    height: calc(100vh - 150px);
    overflow: auto;
    table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.9em;
        overflow: auto;
    }

    th,
    td {
        border: none;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        padding: 5px;
        text-align: center;
        border-left: none;
        border-right: none;
    }

    th {
        color: black;
    }
    .Open_Click_Modal_Container {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        .Button_Container {
            margin-left: 20px;

            button {
                border: none;
                padding: 5px;
                background-color: #fff;
                border: 1px solid lightgray;
                border-radius: 5px;
                &:hover {
                    cursor: pointer;
                    opacity: 0.7;
                }
            }
        }
    }
    thead {
        position: sticky;
        top: -10px;
        height: 30px;
        background-color: #fff;
    }
    tbody {
        button {
            padding: 7px 12px;
            background-color: #fff;
            border: 1px solid lightgray;
            border-radius: 5px;
            margin-right: 10px;
            font-weight: 550;
            &:hover {
                cursor: pointer;
                opacity: 0.7;
            }
        }
    }
    .Mobile_Container {
        display: none;
    }
    @media only screen and (max-width: 800px) {
        .Mobile_Container {
            display: block;
        }
    }
`;

const SelectTableMainPage = ({ PimsLists, ChooseDate, Getting_pims_Lists_From_Date, year, month, setYear, setMonth }) => {
    const [Selected_Data, setSelected_Data] = useState(null);
    const [ScheduleRegistrationIsModalOpen, setScheduleRegistrationIsModalOpen] = useState(false);

    const Delete_Checking = async Select_Key => {
        confirmAlert({
            title: '등록된 일정을 정말 삭제 하시겠습니까?',
            message: `삭제를 원하시면 '삭제' 버튼을, 취소하시려면 '취소'버튼을 선택해 주세요.`,
            buttons: [
                {
                    label: '삭제',
                    onClick: () => {
                        Handle_Deelete_My_Pims_Data(Select_Key);
                    },
                },
                {
                    label: '취소',
                    onClick: () => {},
                },
            ],
        });
    };
    const Handle_Deelete_My_Pims_Data = async Select_Key => {
        const Handle_Deelete_My_Pims_Data_Axios = await Request_Post_Axios('/users/Handle_Deelete_My_Pims_Data', {
            Select_Key,
        });
        if (Handle_Deelete_My_Pims_Data_Axios.status) {
            await Getting_pims_Lists_From_Date();
            toast.show({
                title: `등록된 일정을 삭제처리하였습니다.`,
                successCheck: true,
                duration: 6000,
            });
        } else {
            toast.show({
                title: `삭제에 실패하였습니다. IT팀에 문의바랍니다.`,
                successCheck: false,
                duration: 6000,
            });
        }
    };
    const onMonthChange = offset => {
        let newMonth = month + offset;
        let newYear = year;

        if (newMonth < 0) {
            newMonth = 11;
            newYear -= 1;
        } else if (newMonth > 11) {
            newMonth = 0;
            newYear += 1;
        }

        setYear(newYear);
        setMonth(newMonth);
    };

    return (
        <SelectTableMainPageMainDivBox>
            <div className="Mobile_Container">
                <CalendarHeader>
                    <Button onClick={() => onMonthChange(-1)}>〈 이전 달</Button>
                    <h3>
                        {year}년 {month + 1}월
                    </h3>
                    <Button onClick={() => onMonthChange(1)}>다음 달 〉</Button>
                </CalendarHeader>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>구분</th>
                        <th>일자</th>
                        <th>고객사</th>
                        <th>안건</th>
                        <th>동행자</th>
                        <th>관리</th>
                    </tr>
                </thead>
                <tbody>
                    {PimsLists.map(list => {
                        return (
                            <tr key={list.pimsKey}>
                                <td>{DivideType.find(item => item.title === list.title).name}</td>
                                <td>
                                    {moment(list.start_date).format('YYYY/MM/DD')}{' '}
                                    {moment(list.start_date).format('YYYY/MM/DD') === moment(list.end_date).format('YYYY/MM/DD')
                                        ? ''
                                        : ` ${moment(list.end_date).format('- DD')}`}
                                </td>
                                {['Business_Trip', 'Out_On_Business'].includes(list.title) ? (
                                    <>
                                        <td>{list.custom}</td>
                                        <td>{list.description}</td>
                                        <td>{list.companion}</td>
                                    </>
                                ) : (
                                    <>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                    </>
                                )}

                                <td>
                                    <span>
                                        <button
                                            onClick={() => {
                                                setSelected_Data(list);
                                                setScheduleRegistrationIsModalOpen(true);
                                            }}
                                        >
                                            수정
                                        </button>
                                    </span>
                                    <span>
                                        <button
                                            onClick={() => {
                                                setSelected_Data(list);
                                                Delete_Checking(list.pimsKey);
                                            }}
                                        >
                                            삭제
                                        </button>
                                    </span>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {ScheduleRegistrationIsModalOpen ? (
                <ScheduleRegistration
                    Choose_Start_Date={Selected_Data.start_date}
                    Choose_End_Date={Selected_Data.end_date}
                    ChooseDate={ChooseDate}
                    ScheduleRegistrationIsModalOpen={ScheduleRegistrationIsModalOpen}
                    setScheduleRegistrationIsModalOpen={() => setScheduleRegistrationIsModalOpen(false)}
                    title={Selected_Data.title}
                    name={Selected_Data.name}
                    custom={Selected_Data.custom}
                    description={Selected_Data.description}
                    companion={Selected_Data.companion}
                    pimsKey={Selected_Data.pimsKey}
                    setMode={'updating'}
                    Getting_pims_Lists_From_Date={() => Getting_pims_Lists_From_Date()}
                ></ScheduleRegistration>
            ) : (
                ''
            )}
        </SelectTableMainPageMainDivBox>
    );
};

export default SelectTableMainPage;
