import React, { useEffect, useState } from 'react';
import { SurvayContainerMainDivBox } from '../../../FoodSelect/SurvayContainer/SurvayContainer';
import { UserBreakFastMainPageMainDivBox } from '../../../BreakFast/UserBreakFast/UserBreakFastMainPage';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { DivideType, ScheduleRegistrationMainContainerDivBox } from '../HomeCalendar/ScheduleRegistration/ScheduleRegistration';
import moment from 'moment';
import { Request_Post_Axios } from '../../../../API';
import { toast } from '../../../ToasMessage/ToastManager';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import 'moment/locale/ko';
import { ko } from 'date-fns/esm/locale';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ModuleDatePickers from './ModuleDatePickers';

const ApplyPimsMainPageMainDivBox = styled.div`
    @media only screen and (max-width: 800px) {
        .btn_Group {
            display: block !important;
            width: 100%;
            .btn_container {
                width: 50%;
                margin: 0 auto;
            }
        }
    }
    .Survay_Main_Content {
        width: 80%;
        max-width: 700px;
        margin: 0;
        margin-left: 20px;
        input {
            height: 35px;
            padding-left: 10px;
            margin-bottom: 10px;
        }
        select {
            height: 40px;
            padding-left: 10px;
            width: 70%;
        }
        h4 {
            margin-top: 0px;
            margin-bottom: 12px;
        }
        .Selected_Date_Cotainer {
            display: flex;
            justify-content: space-between;

            @media only screen and (max-width: 800px) {
                display: block;

                select {
                    background-color: none;
                }
                .Division_Container {
                    margin-left: 0px;
                    margin-bottom: 20px;
                }
                .Date_Table_Container {
                    height: 100%;
                    margin-left: 0px;
                    margin-bottom: 10px;
                }

                input {
                    width: 40%;
                }

                input[type='date'] {
                    border: none; // 테두리 설정은 본인 맘대로
                    position: relative; // 캘린더 아이콘을 클릭해야만 달력이 보이기 때문에 이 영역 자체를 제어하기 위해 설정
                    width: 40%;
                    padding: 8px;
                    /* box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2); */
                    border-radius: 5px;
                    text-align: center;
                    border: 1px solid lightgray;
                }

                // 실제 캘린더 아이콘을 클릭하는 영역을 의미하는 선택자
                // 이 영역을 확장해서 input의 어떤 곳을 클릭해도 캘린더를 클릭한 것과 같은 효과를 만들자!
                input[type='date']::-webkit-calendar-picker-indicator {
                    position: absolute; // 이를 설정하기 위해 사전에 relative를 설정한 것이다.
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    background: transparent; // 배경은 투명하게,
                    color: transparent; // 글자도 투명하게! 이 두 설정을 통해 캘린더 아이콘을 사라지게 만든다.
                    cursor: pointer;
                }

                // input에 어떠한 유효값이 입력된 상태인지 확인하는 선택자
                // 날짜를 선택하면 유효값이 입력된다.
                // 이 속성을 활용하고자 한다면 반드시 태그에 required 속성을 달아줘야한다.
                input[type='date']:valid::before {
                    /* display: none; // 유효값이 입력된 경우 before에 있는 것을 사라지게 한다. 즉, placeholder를 사라지게 한다. */
                }
            }
        }
        .Division_Container {
            margin-left: 30px;
        }
        .Date_Table_Container {
            height: 200px;
            overflow: auto;
            overflow-x: hidden;
            table {
                width: 200px;
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

            .Delete_Date {
                color: red;
                &:hover {
                    cursor: pointer;
                    opacity: 0.8;
                }
            }
            th {
                color: black;
            }
        }
    }
`;

const ApplyPimsMainPage = ({
    setMode,
    title,
    name,
    Choose_Start_Date,
    Choose_End_Date,
    custom,
    description,
    companion,
    pimsKey,
    Getting_pims_Lists_From_Date,
    ChooseDate,
}) => {
    const Login_Info = useSelector(state => state.LoginInfoDataRedux.Infomation);
    const [ScheduleTitle, setScheduleTitle] = useState({
        setMode: setMode,
        title: title ? title : 'Out_On_Business',
        name: name ? name : '외근',
        start_date: moment(Choose_Start_Date).format('YYYY-MM-DD'),
        end_date: moment(Choose_End_Date).format('YYYY-MM-DD'),
        custom: custom ? custom : '',
        description: description ? description : '',
        companion: companion ? companion : '',
        pimsKey: pimsKey ? pimsKey : null,
    });
    const [selectedDates, setSelectedDates] = useState([]);

    const HandleRegiSchedule = async () => {
        if (['Business_Trip', 'Out_On_Business'].includes(ScheduleTitle.title)) {
            if (!ScheduleTitle.custom) {
                toast.show({
                    title: `고객사를 작성 해 주세요.`,
                    successCheck: false,
                    duration: 6000,
                });
                return;
            }
        }
        if (selectedDates.length === 0) {
            toast.show({
                title: `일정을 선택 해 주세요.`,
                successCheck: false,
                duration: 6000,
            });
            return;
        }
        const Send_Submit_Schedule = await Request_Post_Axios('/users/pims_legistrator', {
            ScheduleTitle,
            Login_Info,
            ChooseDate,
            selectedDates,
        });
        if (Send_Submit_Schedule.status) {
            await Getting_pims_Lists_From_Date();
            toast.show({
                title: `일정 등록이 완료되었습니다.`,
                successCheck: true,
                duration: 6000,
            });
            setScheduleTitle({
                setMode: setMode,
                title: title ? title : 'Out_On_Business',
                name: name ? name : '외근',
                start_date: moment(Choose_Start_Date).format('YYYY-MM-DD'),
                end_date: moment(Choose_End_Date).format('YYYY-MM-DD'),
                custom: custom ? custom : '',
                description: description ? description : '',
                companion: companion ? companion : '',
                pimsKey: pimsKey ? pimsKey : null,
            });
            setSelectedDates([new Date()]);
        } else {
            toast.show({
                title: `일정 등록에 실패하였습니다. IT팀에 문의바랍니다.`,
                successCheck: false,
                duration: 6000,
            });
        }
    };

    return (
        <ApplyPimsMainPageMainDivBox>
            <UserBreakFastMainPageMainDivBox>
                <SurvayContainerMainDivBox style={{ minHeight: '100%' }}>
                    <div className="Survay_Main_Content">
                        <div>
                            <h4>이름</h4>
                            <input value={Login_Info.Login_name} readOnly></input>
                        </div>
                        <div>
                            <h4 style={{ color: 'red' }}>구분</h4>
                            {/* <input value={Login_Info.team} readOnly></input> */}
                            <select
                                value={ScheduleTitle.title}
                                onChange={e =>
                                    setScheduleTitle({
                                        ...ScheduleTitle,
                                        title: e.target.value,
                                    })
                                }
                            >
                                {DivideType.map(list => {
                                    return (
                                        <option value={list.title} key={list.title}>
                                            {list.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>

                        <div>
                            <h4 style={{ color: 'red' }}>일정</h4>
                            <div className="Selected_Date_Cotainer" style={{ justifyContent: 'start' }}>
                                <ModuleDatePickers
                                    selectedDates={selectedDates}
                                    setSelectedDates={data => setSelectedDates(data)}
                                ></ModuleDatePickers>
                                <div className="Division_Container">
                                    <h5>선택된 일정</h5>
                                    <div className="Date_Table_Container">
                                        <table>
                                            <tbody>
                                                {selectedDates
                                                    .sort((a, b) => moment(a).format('MMDD') - moment(b).format('MMDD'))
                                                    .map((item, j) => {
                                                        return (
                                                            <tr>
                                                                <td>{j + 1}.</td>
                                                                <td>{moment(item).format('YYYY-MM-DD')}</td>
                                                                <td
                                                                    className="Delete_Date"
                                                                    onClick={() => {
                                                                        setSelectedDates(
                                                                            selectedDates.filter(
                                                                                list => list.toDateString() !== item.toDateString()
                                                                            )
                                                                        );
                                                                    }}
                                                                >
                                                                    X
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {['Business_Trip', 'Out_On_Business'].includes(ScheduleTitle.title) ? (
                            <>
                                <div style={{ marginTop: '10px' }}>
                                    <h4 style={{ color: 'red' }}>고객사</h4>
                                    <input
                                        value={ScheduleTitle.custom}
                                        placeholder="Ex. 삼성 온양, SK하이닉스 이천"
                                        onChange={e => setScheduleTitle({ ...ScheduleTitle, custom: e.target.value })}
                                    ></input>
                                </div>
                                <div>
                                    <h4>안건</h4>
                                    <input
                                        value={ScheduleTitle.description}
                                        onChange={e => setScheduleTitle({ ...ScheduleTitle, description: e.target.value })}
                                        placeholder="Ex. PO 스펙 미팅, 샘플 전달, 신규장비 셋업"
                                    ></input>
                                </div>
                                <div>
                                    <h4>동행자</h4>
                                    <input
                                        value={ScheduleTitle.companion}
                                        placeholder="Ex. 김철수 프로, 김영희 프로"
                                        onChange={e => setScheduleTitle({ ...ScheduleTitle, companion: e.target.value })}
                                    ></input>
                                </div>
                            </>
                        ) : (
                            <></>
                        )}
                    </div>
                    <ScheduleRegistrationMainContainerDivBox style={{ width: '77%' }}>
                        <div className="btn_Group">
                            <div className="btn_space"></div>

                            <div className="btn_container">
                                <button
                                    className="btn"
                                    onClick={() => {
                                        HandleRegiSchedule();
                                    }}
                                >
                                    등록
                                </button>
                            </div>
                        </div>
                    </ScheduleRegistrationMainContainerDivBox>
                </SurvayContainerMainDivBox>
            </UserBreakFastMainPageMainDivBox>
        </ApplyPimsMainPageMainDivBox>
    );
};

export default ApplyPimsMainPage;
