import moment from 'moment';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import Modal from 'react-modal';
import styled from 'styled-components';
import { ko } from 'date-fns/locale';
import 'moment/locale/ko';
import { Request_Get_Axios, Request_Post_Axios } from '../../../../../API/index';
import { useSelector } from 'react-redux';
import { toast } from '../../../../ToasMessage/ToastManager';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import ModuleDatePickers from '../../ApplyPims/ModuleDatePickers';

export const ScheduleRegistrationMainContainerDivBox = styled.div`
    min-width: 300px;
    .btn_Group {
        display: flex;
        justify-content: end;
        margin-top: 10px;
        .btn_container {
            width: 90px;
            height: 40px;
            text-align: center;
            .btn {
                background-color: #2a82f0;
                color: white;
                height: 100%;
                text-align: center;
                font-weight: bolder;
                width: 100%;
                border-radius: 5px;
                border: none;
                border: 1px solid lightgray;
                &:hover {
                    cursor: pointer;
                }
            }
            .btn_space {
                width: 15px;
            }
        }
    }
    .Select_Vacation_Lists {
        display: flex;

        .Date_Pickers_Container {
            display: flex;
            align-items: center;
            justify-content: space-around;
            font-size: 0.9em;
            border-radius: 5px;
            margin-right: 10px;
            .Date_Pickers_Text {
                margin-left: 10px;
            }
            .Date_Pickers_Pickers {
                height: 100%;
                input {
                    font-size: 0.9em;
                    font-weight: bolder;
                    height: 45px;
                    background: none;
                    border: 1px solid lightgray;
                    border-radius: 5px;
                    text-align: center;
                    :focus {
                        outline: none;
                        border: none;
                    }
                    :hover {
                        cursor: pointer;
                    }
                }
            }
        }
        .Time_Pickers_Container {
            display: flex;
            height: 45px;
            width: 150px;
            justify-content: space-around;
            margin-top: 5px;
            .Hour_Pickers_Container {
                width: 49%;
                select {
                    width: 100%;
                    height: 100%;
                    font-size: 1.3em;
                    border: 1px solid lightgray;
                    border-radius: 5px;
                    padding-left: 10px;
                    option {
                        font-size: 1.2em;
                    }
                }
            }
        }
    }
    .format_Container {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        .Title_Content {
            width: 100px;
        }
        .body_Content {
            width: 100%;
            border-bottom: 2px solid lightgray;
            input {
                border: none;
                width: 100%;
                padding-left: 10px;
                &:focus {
                    outline: none;
                    border: none;
                }
            }
            input[type='date'] {
                border: none; // 테두리 설정은 본인 맘대로
                position: relative; // 캘린더 아이콘을 클릭해야만 달력이 보이기 때문에 이 영역 자체를 제어하기 위해 설정
                width: 48%;
                padding: 8px;
                box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
                border-radius: 8px;
                text-align: center;
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
    select {
        border: 1px solid lightgray;
        width: 100%;
        height: 30px;
        border-radius: 5px;
        font-size: 1em;
        padding-left: 10px;
    }
    .Date_Table_Container {
        margin-bottom: 30px;
        max-height: 100px;
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
`;

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#SelectModal');

export const DivideType = [
    {
        title: 'Out_On_Business',
        name: '외근',
        start_date: moment().format('YYYY-MM-DD'),
        end_date: moment().format('YYYY-MM-DD'),
        custom: '',
        description: '',
        companion: [],
    },
    {
        title: 'Business_Trip',
        name: '해외출장',
        start_date: moment().format('YYYY-MM-DD'),
        end_date: moment().format('YYYY-MM-DD'),
        custom: '',
        description: '',
        companion: [],
    },
    {
        title: 'day_off',
        name: '연차',
        start_date: moment().format('YYYY-MM-DD'),
        end_date: moment().format('YYYY-MM-DD'),
    },
    {
        title: 'morning_off',
        name: '오전 반차',
        start_date: moment().format('YYYY-MM-DD'),
        // end_date: moment(ChooseDate).format('YYYY-MM-DD'),
    },
    {
        title: 'afternoon_off',
        name: '오후 반차',
        start_date: moment().format('YYYY-MM-DD'),
        // end_date: moment(ChooseDate).format('YYYY-MM-DD'),
    },
];

const ScheduleRegistration = ({
    Choose_Start_Date,
    Choose_End_Date,
    ChooseDate,
    ScheduleRegistrationIsModalOpen,
    setScheduleRegistrationIsModalOpen,
    title,
    name,
    custom,
    description,
    companion,
    pimsKey,
    setMode,
    Getting_pims_Lists_From_Date,
}) => {
    const Login_Info = useSelector(state => state.LoginInfoDataRedux.Infomation);
    const [selectedDates, setSelectedDates] = useState([]);
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

    useEffect(() => {
        setSelectedDates([new Date(Choose_Start_Date)]);
    }, [ScheduleRegistrationIsModalOpen, Choose_Start_Date]);

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
                title: `일정을 선택해 주세요.`,
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
            if (setMode === 'writing') {
                setScheduleRegistrationIsModalOpen(false);
                toast.show({
                    title: `일정 등록이 완료되었습니다.`,
                    successCheck: true,
                    duration: 6000,
                });
                await Getting_pims_Lists_From_Date();
            } else {
                toast.show({
                    title: `등록된 일정을 수정처리하였습니다.`,
                    successCheck: true,
                    duration: 6000,
                });
                setScheduleRegistrationIsModalOpen(false);
                await Getting_pims_Lists_From_Date();
            }
        } else {
            toast.show({
                title: `일정 등록에 실패하였습니다. IT팀에 문의바랍니다.`,
                successCheck: false,
                duration: 6000,
            });
        }
    };

    return (
        <div>
            <Modal
                isOpen={ScheduleRegistrationIsModalOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={setScheduleRegistrationIsModalOpen}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <ScheduleRegistrationMainContainerDivBox>
                    <h2 style={{ marginBottom: '20px' }}>일정</h2>
                    <div className="format_Container">
                        <div className="Title_Content" style={{ color: 'red' }}>
                            구분
                        </div>
                        <div className="body_Content">
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
                    </div>
                    <div className="format_Container">
                        <div className="Title_Content" style={{ color: 'red' }}>
                            일자
                        </div>
                        <div className="body_Content">
                            <ModuleDatePickers
                                selectedDates={selectedDates}
                                setSelectedDates={data => setSelectedDates(data)}
                            ></ModuleDatePickers>
                        </div>
                    </div>
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
                                                                selectedDates.filter(list => list.toDateString() !== item.toDateString())
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
                    {['Business_Trip', 'Out_On_Business'].includes(ScheduleTitle.title) ? (
                        <>
                            <div className="format_Container">
                                <div className="Title_Content" style={{ color: 'red' }}>
                                    고객사
                                </div>
                                <div className="body_Content">
                                    <input
                                        type="text"
                                        value={ScheduleTitle.custom}
                                        onChange={e => setScheduleTitle({ ...ScheduleTitle, custom: e.target.value })}
                                        style={{ marginRight: '4%' }}
                                        placeholder="Ex. 삼성 온양, SK하이닉스 이천"
                                    ></input>
                                </div>
                            </div>
                            <div className="format_Container">
                                <div className="Title_Content">안건</div>
                                <div className="body_Content">
                                    <input
                                        type="text"
                                        value={ScheduleTitle.description}
                                        onChange={e => setScheduleTitle({ ...ScheduleTitle, description: e.target.value })}
                                        style={{ marginRight: '4%' }}
                                        placeholder="Ex. PO 스펙 미팅, 샘플 전달, 신규장비 셋업"
                                    ></input>
                                </div>
                            </div>
                            <div className="format_Container">
                                <div className="Title_Content">동행자</div>
                                <div className="body_Content">
                                    <input
                                        type="text"
                                        value={ScheduleTitle.companion}
                                        onChange={e => setScheduleTitle({ ...ScheduleTitle, companion: e.target.value })}
                                        style={{ marginRight: '4%' }}
                                        placeholder="Ex. 김철수 프로, 김영희 프로"
                                    ></input>
                                </div>
                            </div>
                        </>
                    ) : (
                        <></>
                    )}

                    <div className="btn_Group">
                        <div className="btn_container" style={{ marginRight: '12px' }}>
                            <button
                                className="btn"
                                style={{ backgroundColor: '#fff', color: 'black' }}
                                onClick={setScheduleRegistrationIsModalOpen}
                            >
                                취소
                            </button>
                        </div>

                        <div className="btn_space"></div>

                        <div className="btn_container">
                            <button
                                className="btn"
                                onClick={() => {
                                    HandleRegiSchedule();
                                }}
                            >
                                {setMode === 'writing' ? '등록' : '수정'}
                            </button>
                        </div>
                    </div>
                </ScheduleRegistrationMainContainerDivBox>
            </Modal>
        </div>
    );
};

export default ScheduleRegistration;
