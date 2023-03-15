import React, { forwardRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { CgCloseO } from 'react-icons/cg';
import ApplyModalTable from './ApplyModalTable/ApplyModalTable';
import Select from 'react-select';
import moment from 'moment';
import { ko } from 'date-fns/esm/locale';
import DatePicker from 'react-datepicker';
import { toast } from '../ToasMessage/ToastManager';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Loader_Check_For_False, Loader_Check_For_True } from '../../Models/LoaderCheckReducer/LoaderCheckReducer';
import LoginModalMainPage from './LoginModal/LoginModalMainPage';
import { LOGOUT_INFO_DATA_Changes } from '../../Models/LoginInfoReducer/LoginInfoReducer';
import { request } from '../../API';
import ResiMailSendingMainPage from './ResiMailSending/ResiMailSendingMainPage';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        height: '90%',
        zIndex: '40000',
    },
};
Modal.setAppElement('#ApplyModal');
const ApplyModalMainDivBox = styled.div`
    //Modal창 닫기 CSS
    .Close_button_container {
        position: fixed;
        top: 10px;
        right: 10px;
        color: red;
        font-weight: bolder;
        font-size: 1.3em;
        :hover {
            cursor: pointer;
        }
    }

    //Modal창 회의실 조회 테이블 CSS
    .Modal_Apply_Mian_Table_Container {
        margin-top: 20px;
        margin-bottom: 50px;
        border: 1px solid #b0b0b0;
        display: flex;
        min-width: 880px;
        background-color: #fff;
        position: relative;
        @media only screen and (max-width: 800px) {
            width: 100% !important;
            min-width: 0px;
        }
    }
    .Modal_Apply_Room_title_container {
        width: 190px;
        @media only screen and (max-width: 800px) {
            width: 90px !important;
        }
        .Modal_Apply_Main_Room_Time_title {
            height: 50px;
            text-align: center;
            width: 190px;
        }
        .Main_Room_title {
            border: 1px solid #b0b0b0;
            height: 70px;
            text-align: center;
            font-weight: bold;
            width: 190px;
            line-height: 42px;
            @media only screen and (max-width: 800px) {
                width: 90px !important;
                font-size: 0.7em;
            }
        }
    }
    .Modal_Apply_Room_Content_container {
        /* width: calc(100%-300px); */

        /* min-width: 880px; */
        overflow-x: scroll;
        @media only screen and (max-width: 800px) {
            width: 100% !important;
            min-width: 0px;
        }
        ::-webkit-scrollbar {
            width: 5px;
            height: 10px;
        }
        ::-webkit-scrollbar-thumb {
            background-color: red;
            border-radius: 10px;
        }
        ::-webkit-scrollbar-track {
            background-color: grey;
            border-radius: 10px;
            box-shadow: inset 0px 0px 2px white;
        }
        .Modal_Apply_Main_Room_Time_title {
            border-top: 1px solid #b0b0b0;
            height: 50px;
            text-align: center;
        }
        ///Room에 따른 시간 Table CSS
        .Modal_Apply_Main_TimeLine_Table_Contents {
            width: 1922px;
            .Main_Room_title {
                border-top: 1px solid #b0b0b0;
                height: 70px;
                text-align: center;
                font-weight: bold;
                .TableInTableLine {
                    display: flex;
                    height: 100%;
                    position: relative;

                    ///예약된 테이블 색깔 표시
                    .Reservation_Room_Container {
                        position: absolute;
                        top: 0px;
                        padding-top: 5px;
                        padding-bottom: 5px;
                        .Reservation_Room_date {
                            border-width: 1px;
                            border-color: #97b0f8;
                            background-color: #f1f1f5;
                            height: 100%;
                            border-radius: 5px;
                            box-shadow: 0.5px 0.5px 0.5px 0.5px #d5ddf6;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            padding-top: 8px;
                            :hover {
                                cursor: pointer;
                                opacity: 0.9;
                            }

                            .ContentTextCotainer {
                                font-size: 0.7em;
                                overflow: hidden;
                                font-weight: light;
                                white-space: nowrap;
                                .ContentTitle {
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                }
                                .Content_useId {
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                }
                                .Content_times {
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                }
                            }
                        }
                    }
                }
                .Main_TimeLine_Content {
                    border-right: 1px solid #b0b0b0;
                    width: 60px;
                    text-align: center;
                    flex-grow: 1;
                    /* :hover {
                        cursor: pointer;
                        background-color: gray;
                    } */
                }
            }
        }

        .Modal_Apply_Main_TimeLine_Table_Container {
            top: 40px;
            .Modal_Apply_Main_TimeLine_Content {
                border: 1px solid red;
                display: table-cell;
                width: 22px;
                text-align: center;
                height: 71vh;
                /* :hover {
                    cursor: pointer;
                    background-color: #efefef;
                } */
            }
        }
    }
    .Modal_Apply_Main_Room_Time_title_Main_Container {
        /* border: 1px solid #b0b0b0; */
        height: 50px;
        text-align: center;
        font-weight: bold;
        width: 1922px;
        position: relative;
        .TableInTableLine_Hours {
            display: flex;
            padding-top: 8px;
            .Main_TimeLine_Hour_content {
                width: 80px;
                text-align: center;
            }
        }

        .TableInTableLine {
            display: flex;
            height: 100%;
            position: absolute;
            bottom: 0px;
            height: 18px;
            left: 0px;
            color: gray;
            .Main_TimeLine_Content {
                font-size: 0.8em;
                width: 40px;
                text-align: center;
            }
        }
    }

    .ApplyModal_Input_Container {
        margin-top: 10px;
        border-top: 1px solid gray;
    }

    .Float_cotainer_box {
        min-width: 500px;
        max-width: 800px;
        height: 40px;
        margin-bottom: 30px;
        @media only screen and (max-width: 800px) {
            width: 100% !important;
            min-width: 100%;
            max-width: 100%;
            height: 100%;
        }
        ::after {
            display: block;
            content: '';
            clear: both;
        }
        .Float_cotainer_box_Left {
            float: left;
            width: 100px;
            font-size: 1em;
            font-weight: bold;
            line-height: 40px;
            @media only screen and (max-width: 800px) {
                width: 100% !important;
                float: none;
                display: block;
            }
        }
        .Mobile_Time_Right {
            @media only screen and (max-width: 800px) {
                display: inline-block !important;
            }
        }
        .MiddleTime {
            @media only screen and (max-width: 800px) {
                text-align: center;
            }
        }
        .Float_cotainer_box_Right {
            margin-left: 10px;
            float: left;
            width: calc(100%-100px);
            display: flex;
            height: 100%;
            @media only screen and (max-width: 800px) {
                width: 100% !important;
                float: none;
            }

            .Float_cotainer_box_Right_InpuBox_cotainer {
                min-width: 400px;
                height: 100%;
                @media only screen and (max-width: 800px) {
                    width: 100% !important;
                    min-width: 0px;
                    height: 40px;
                }
                input {
                    height: 100%;
                    width: 100%;
                    border: 1px solid light gray;
                    padding-left: 10px;
                }
            }
            .DatePickerUseContainer {
                border: 1px solid gray;
                margin-right: 10px;
                height: 100%;
                padding-left: 5px;
                padding-right: 5px;
                @media only screen and (max-width: 800px) {
                    margin-bottom: 10px !important;
                }
                .example-custom-input {
                    border: none;
                    width: 100%;
                    height: 38px;
                    background-color: #fff;
                }
            }
            .TimePickerUserContainer {
                border: 1px solid gray;
                height: 100%;
                @media only screen and (max-width: 800px) {
                }
                select {
                    border: none;
                    width: 100%;
                    height: 100%;
                    font-size: 0.9em;
                    padding-left: 10px;
                    padding-right: 10px;
                    @media only screen and (max-width: 800px) {
                        width: 100% !important;
                        min-width: 0px;
                        height: 40px;
                        text-align: center;
                    }
                }
            }
        }
    }
    .Button_Cotainer {
        text-align: center;
        button {
            width: 120px;
            height: 40px;
            border: none;
            font-weight: bolder;
            font-size: 1.1em;
            border-radius: 5px;
            :hover {
                cursor: pointer;
            }
            @media only screen and (max-width: 800px) {
                width: 90px !important;
                font-size: 0.9em;
            }
        }
        .Cancle {
            background-color: orange;
            margin-right: 30px;
            color: #fff;
            :hover {
                background-color: #efefef;
                color: orange;
            }
            @media only screen and (max-width: 800px) {
                margin-right: 10px;
            }
        }
        .Delete {
            background-color: red;
            margin-left: 30px;
            color: #fff;
            :hover {
                background-color: #efefef;
                color: red;
            }
            @media only screen and (max-width: 800px) {
                margin-left: 10px;
            }
        }
        .Submit {
            background-color: green;
            margin-right: 30px;
            color: #fff;
            :hover {
                background-color: #efefef;
                color: green;
            }
            @media only screen and (max-width: 800px) {
                margin-right: 10px;
            }
        }
    }
`;

const ApplyModal = ({
    ApplyModalOpenData,
    setApplyModalOpenData,
    SelectLeftHeaderInfo,
    RoomDatas,
    SelectBasicTitle,
    LeftHeaderInfo,
    setSelectLeftHeaderInfo,
    SelectDate,
    setSelectDate,
    NowTimes,
    setNowTimes,
    getDatas,
}) => {
    const dispatch = useDispatch();
    const LoginInfo = useSelector(state => state.LoginInfoDataRedux.Infomation);
    const [TimesStateData, setTimesStateData] = useState([
        { value: '00:00', label: '00:00' },
        { value: '00:30', label: '00:30' },
        { value: '01:00', label: '01:00' },
        { value: '01:30', label: '01:30' },
        { value: '02:00', label: '02:00' },
        { value: '02:30', label: '02:30' },
        { value: '03:00', label: '03:00' },
        { value: '03:30', label: '03:30' },
        { value: '04:00', label: '04:00' },
        { value: '04:30', label: '04:30' },
        { value: '05:00', label: '05:00' },
        { value: '05:30', label: '05:30' },
        { value: '06:00', label: '06:00' },
        { value: '06:30', label: '06:30' },
        { value: '07:00', label: '07:00' },
        { value: '07:30', label: '07:30' },
        { value: '08:00', label: '08:00' },
        { value: '08:30', label: '08:30' },
        { value: '09:00', label: '09:00' },
        { value: '09:30', label: '09:30' },
        { value: '10:00', label: '10:00' },
        { value: '10:30', label: '10:30' },
        { value: '11:00', label: '11:00' },
        { value: '11:30', label: '11:30' },
        { value: '12:00', label: '12:00' },
        { value: '12:30', label: '12:30' },
        { value: '13:00', label: '13:00' },
        { value: '13:30', label: '13:30' },
        { value: '14:00', label: '14:00' },
        { value: '14:30', label: '14:30' },
        { value: '15:00', label: '15:00' },
        { value: '15:30', label: '15:30' },
        { value: '16:00', label: '16:00' },
        { value: '16:30', label: '16:30' },
        { value: '17:00', label: '17:00' },
        { value: '17:30', label: '17:30' },
        { value: '18:00', label: '18:00' },
        { value: '18:30', label: '18:30' },
        { value: '19:00', label: '19:00' },
        { value: '19:30', label: '19:30' },
        { value: '20:00', label: '20:00' },
        { value: '20:30', label: '20:30' },
        { value: '21:00', label: '21:00' },
        { value: '21:30', label: '21:30' },
        { value: '22:00', label: '22:00' },
        { value: '22:30', label: '22:30' },
        { value: '23:00', label: '23:00' },
        { value: '23:30', label: '23:30' },
    ]);
    const [ApplyModalData, setApplyModalData] = useState({
        StartDate: SelectDate.StartDate ? SelectDate.StartDate : new Date(NowTimes),
        StartTime: SelectDate.StartTime ? SelectDate.StartTime : null,
        EndDate: SelectDate.EndDate ? SelectDate.EndDate : new Date(NowTimes),
        EndTime: SelectDate.EndTime ? SelectDate.EndTime : null,
    });

    //예약 할 일정 라임으로 표시
    const [SelectedShowTableTimes, setSelectedShowTableTimes] = useState({
        Public_Check: false,
        AlldayChecking: false,
        PositionLeftPxCal: 0,
        WidthLeftPxCal: 0,
        StartTime: SelectDate.StartTime ? SelectDate.StartTime : null,
        EndTime: SelectDate.EndTime ? SelectDate.EndTime : null,
    });

    const [TitleBooking, setTitleBooking] = useState('');
    const [Reservation_Mail_Checking, setReservation_Mail_Checking] = useState(false);
    const [DetailInfo, setDetailInfo] = useState(null);
    const [Mail_State, setMail_State] = useState(
        '<p>--------------------------------------------------------------------------------------</p><p><strong>본문</strong></p><br><br>'
    );
    const [Selected_User_State, setSelected_User_State] = useState([]);
    //Modal 종료
    const ModalPopUpClose = () => {
        setApplyModalOpenData();
        setSelectLeftHeaderInfo(null);
        setSelectDate({ StartDate: null, StartTime: null, EndDate: null, EndTime: null });
        setSelectedShowTableTimes({
            Public_Check: false,
            AlldayChecking: false,
            PositionLeftPxCal: 0,
            WidthLeftPxCal: 0,
            StartTime: null,
            EndTime: null,
        });
    };

    //Select-Box 선택 시
    const handleChangeRoom = value => {
        setSelectLeftHeaderInfo(value);
        setApplyModalData({
            StartDate: SelectDate.StartDate ? SelectDate.StartDate : new Date(NowTimes),
            StartTime: '09:00',
            EndDate: SelectDate.EndDate ? SelectDate.EndDate : new Date(NowTimes),
            EndTime: '09:00',
        });
        setSelectedShowTableTimes({
            AlldayChecking: false,
            PositionLeftPxCal: 0,
            WidthLeftPxCal: 0,
            StartTime: '09:00',
            EndTime: '09:00',
        });
    };

    //예약 일자 시간 Select Onchange 함수
    const handleChangeStartTimeDate = e => {
        setApplyModalData({ ...ApplyModalData, StartTime: e.target.value });
    };

    const handleChangeEndTimeDate = e => {
        setApplyModalData({ ...ApplyModalData, EndTime: e.target.value });
    };

    //예약 일자가 변경 시 마다 렌더링
    useEffect(() => {
        if (
            moment.duration(moment(ApplyModalData.StartDate).diff(moment(ApplyModalData.EndDate))).asDays() < 1 &&
            moment.duration(moment(ApplyModalData.StartDate).diff(moment(ApplyModalData.EndDate))).asDays() >= 0
        ) {
            //날짜가 같음 표시 O

            //시작시간이 종료시간보다 클때, 종료시간 초기화
            if (
                moment
                    .duration(moment(`2022-01-01 ${ApplyModalData.EndTime}`).diff(moment(`2022-01-01 ${ApplyModalData.StartTime}`)))
                    .asMinutes() /
                    30 <
                0
            ) {
                setApplyModalData({ ...ApplyModalData, EndTime: ApplyModalData.StartTime });
            }

            const PositionLeftPxCal =
                moment.duration(moment(`2022-01-01 ${ApplyModalData.StartTime}`).diff(moment(`2022-01-01 00:00`))).asMinutes() / 30;

            const WidthLeftPxCal =
                moment
                    .duration(moment(`2022-01-01 ${ApplyModalData.EndTime}`).diff(moment(`2022-01-01 ${ApplyModalData.StartTime}`)))
                    .asMinutes() /
                    30 >
                0
                    ? moment
                          .duration(moment(`2022-01-01 ${ApplyModalData.EndTime}`).diff(moment(`2022-01-01 ${ApplyModalData.StartTime}`)))
                          .asMinutes() / 30
                    : 0;

            setSelectedShowTableTimes({
                ...SelectedShowTableTimes,
                PositionLeftPxCal,
                WidthLeftPxCal,
                StartTime: ApplyModalData.StartTime,
                EndTime: ApplyModalData.EndTime,
            });
        } else {
            //날짜가 다름 표시 X
            setSelectedShowTableTimes({
                ...SelectedShowTableTimes,
                PositionLeftPxCal: 0,
                WidthLeftPxCal: 0,
                StartTime: ApplyModalData.StartTime,
                EndTime: ApplyModalData.EndTime,
            });
        }
    }, [ApplyModalData]);

    const handleChangeAllDayBooking = () => {
        if (!SelectedShowTableTimes.AlldayChecking) {
            setSelectedShowTableTimes({
                AlldayChecking: true,
                PositionLeftPxCal: 0,
                WidthLeftPxCal: 48,
                StartTime: ApplyModalData.StartTime,
                EndTime: ApplyModalData.EndTime,
            });
        } else {
            setSelectedShowTableTimes({
                AlldayChecking: false,
                PositionLeftPxCal: 0,
                WidthLeftPxCal: 0,
                StartTime: ApplyModalData.StartTime,
                EndTime: ApplyModalData.EndTime,
            });
        }
    };

    useEffect(() => {}, [SelectedShowTableTimes.AlldayChecking]);

    ///date-picker 버튼 컴포넌트
    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <button className="example-custom-input" onClick={onClick} ref={ref}>
            {value}
        </button>
    ));

    ///date-picker 토요일 일요일 색깔 표시
    const getDayName = date => {
        return date
            .toLocaleDateString('ko-KR', {
                weekday: 'long',
            })
            .substr(0, 1);
    };
    const createDate = date => {
        return new Date(new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0));
    };

    //예약하기 버튼 클릭 시
    const handleRoomReservation = async () => {
        try {
            if (!TitleBooking) {
                toast.show({
                    title: `제목을 입력 해주세요. `,
                    successCheck: false,
                    duration: 5000,
                });
                return;
            }
            dispatch(Loader_Check_For_True());
            const ReserverationForServer = await request.post(`/users/BrityWorksBooking_For_API`, {
                ApplyModalData,
                SelectedShowTableTimes,
                SelectLeftHeaderInfo,
                TitleBooking,
                LoginInfo,
                Reservation_Mail_Checking,
                DetailInfo,
                Mail_State,
                Selected_User_State,
            });

            if (ReserverationForServer.data.dataSuccess) {
                getDatas();
                ModalPopUpClose();
                dispatch(Loader_Check_For_False());
                toast.show({
                    title: `${SelectLeftHeaderInfo.label}의 ${moment(ApplyModalData.StartDate).format('YYYY-MM-DD')} ${
                        SelectedShowTableTimes.StartTime
                    } ~ ${moment(ApplyModalData.EndDate).format('YYYY-MM-DD')} ${
                        SelectedShowTableTimes.EndTime
                    }으로 예약이 완료되었습니다.`,
                    successCheck: true,
                    duration: 8000,
                });
            } else {
                dispatch(Loader_Check_For_False());
                toast.show({
                    title: `${ReserverationForServer.data.result.detailMessages ? ReserverationForServer.data.result.detailMessages : ''} ${
                        ReserverationForServer.data.result.errorMessage
                    } ( ERROR CODE : ${ReserverationForServer.data.result.errorCode} ) `,
                    successCheck: false,
                    duration: 12000,
                });
            }
        } catch (error) {
            console.log(error);
            dispatch(Loader_Check_For_False());
            toast.show({
                title: `Error 발생. IT팀에 문의바랍니다. `,
                successCheck: false,
                duration: 5000,
            });
        }
    };

    return (
        <Modal isOpen={ApplyModalOpenData} style={customStyles} contentLabel="Apply Modal">
            {LoginInfo.Login_token ? (
                <ApplyModalMainDivBox>
                    <h2>{SelectBasicTitle === 'Company_Room' ? '회의실' : '법인차량'} 예약</h2>
                    <div className="Close_button_container" onClick={ModalPopUpClose}>
                        <CgCloseO></CgCloseO>
                    </div>
                    <div>
                        <div>
                            <h4>
                                <Select
                                    className="basic-single"
                                    classNamePrefix="이쪽에서 선택 해주세요."
                                    defaultValue={SelectLeftHeaderInfo}
                                    isClearable={true}
                                    isSearchable={true}
                                    name="Room"
                                    options={LeftHeaderInfo}
                                    onChange={value => handleChangeRoom(value)}
                                />
                            </h4>
                        </div>
                        {RoomDatas.length > 0 && SelectLeftHeaderInfo
                            ? RoomDatas.map((list, i) => {
                                  return list.name === SelectLeftHeaderInfo.name ? (
                                      <ApplyModalTable
                                          key={list.name}
                                          SelectLeftHeaderInfo={SelectLeftHeaderInfo}
                                          SelectRoom_Info_Data={list.Datas}
                                          SelectedShowTableTimes={SelectedShowTableTimes}
                                          setApplyModalData={data => setApplyModalData(data)}
                                          ApplyModalData={ApplyModalData}
                                          setSelectDate={data => setSelectDate(data)}
                                      ></ApplyModalTable>
                                  ) : (
                                      ''
                                  );
                              })
                            : ''}
                    </div>
                    <div className="ApplyModal_Input_Container">
                        <div style={{ marginTop: '20px' }}>
                            <div className="Float_cotainer_box" style={{ marginBottom: '5px' }}>
                                <div className="Float_cotainer_box_Left">예약 일자</div>
                                <div className="Float_cotainer_box_Right Mobile_Time_Right">
                                    <div className="DatePickerUseContainer">
                                        <DatePicker
                                            locale={ko}
                                            selected={ApplyModalData.StartDate}
                                            onChange={date => {
                                                setNowTimes(new Date(date));
                                                setApplyModalData({ ...ApplyModalData, StartDate: date, EndDate: date });
                                            }}
                                            dateFormat="yyyy-MM-dd"
                                            highlightDates={[new Date()]}
                                            popperModifiers={{
                                                // 모바일 web 환경에서 화면을 벗어나지 않도록 하는 설정
                                                preventOverflow: {
                                                    enabled: true,
                                                },
                                            }}
                                            dayClassName={date =>
                                                getDayName(createDate(date)) === '토'
                                                    ? 'saturday'
                                                    : getDayName(createDate(date)) === '일'
                                                    ? 'sunday'
                                                    : undefined
                                            }
                                            customInput={<ExampleCustomInput />}
                                        />
                                    </div>
                                    {!SelectedShowTableTimes.AlldayChecking ? (
                                        <div className="TimePickerUserContainer">
                                            <select value={ApplyModalData.StartTime} onChange={e => handleChangeStartTimeDate(e)} readOnly>
                                                {TimesStateData.map((list, i) => {
                                                    return (
                                                        <option key={list.value} value={list.value}>
                                                            {list.label}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                    ) : (
                                        <div></div>
                                    )}

                                    <div
                                        className="MiddleTime"
                                        style={{ marginRight: '10px', marginLeft: '10px', fontWeight: 'bold', lineHeight: '36px' }}
                                    >
                                        {' ~ '}
                                    </div>
                                    <div className="DatePickerUseContainer">
                                        <DatePicker
                                            locale={ko}
                                            selected={ApplyModalData.EndDate}
                                            onChange={date => {
                                                setApplyModalData({ ...ApplyModalData, EndDate: date });
                                            }}
                                            dateFormat="yyyy-MM-dd"
                                            highlightDates={[new Date()]}
                                            minDate={ApplyModalData.StartDate}
                                            popperModifiers={{
                                                // 모바일 web 환경에서 화면을 벗어나지 않도록 하는 설정
                                                preventOverflow: {
                                                    enabled: true,
                                                },
                                            }}
                                            dayClassName={date =>
                                                getDayName(createDate(date)) === '토'
                                                    ? 'saturday'
                                                    : getDayName(createDate(date)) === '일'
                                                    ? 'sunday'
                                                    : undefined
                                            }
                                            customInput={<ExampleCustomInput />}
                                        />
                                    </div>
                                    {!SelectedShowTableTimes.AlldayChecking ? (
                                        <div className="TimePickerUserContainer">
                                            <select value={ApplyModalData.EndTime} onChange={e => handleChangeEndTimeDate(e)} readOnly>
                                                {TimesStateData.map((list, i) => {
                                                    return (
                                                        <option key={list.value} value={list.value}>
                                                            {list.label}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                    ) : (
                                        <div></div>
                                    )}
                                </div>
                            </div>
                            <div className="Float_cotainer_box">
                                <div className="Float_cotainer_box_Left" style={{ opacity: 0 }}>
                                    공란
                                </div>
                                <div className="Float_cotainer_box_Right" style={{ margin: 0 }}>
                                    <div>
                                        <label htmlFor="EveryDay">종일</label>
                                    </div>
                                    <div>
                                        <input
                                            id="EveryDay"
                                            type="CheckBox"
                                            value={SelectedShowTableTimes.AlldayChecking}
                                            onChange={() => handleChangeAllDayBooking()}
                                        ></input>
                                    </div>
                                    <div style={{ marginLeft: '30px' }}>
                                        <label htmlFor="Public_Check">비공개</label>
                                    </div>
                                    <div>
                                        <input
                                            id="Public_Check"
                                            type="CheckBox"
                                            value={SelectedShowTableTimes.Public_Check}
                                            onChange={() =>
                                                setSelectedShowTableTimes({
                                                    ...SelectedShowTableTimes,
                                                    Public_Check: !SelectedShowTableTimes.Public_Check,
                                                })
                                            }
                                        ></input>
                                    </div>
                                </div>
                            </div>
                            <div className="Float_cotainer_box">
                                <div className="Float_cotainer_box_Left">제목</div>
                                <div className="Float_cotainer_box_Right">
                                    <div className="Float_cotainer_box_Right_InpuBox_cotainer">
                                        <input
                                            type="text"
                                            value={TitleBooking}
                                            onChange={e => setTitleBooking(e.target.value)}
                                            placeholder="사용 이유를 적어주세요."
                                        ></input>
                                    </div>
                                </div>
                            </div>
                            <div className="Float_cotainer_box">
                                <div className="Float_cotainer_box_Left">예약자</div>
                                <div className="Float_cotainer_box_Right">
                                    <div className="Float_cotainer_box_Right_InpuBox_cotainer">
                                        <input type="text" value={LoginInfo.Login_name} readOnly></input>
                                    </div>
                                </div>
                            </div>
                            <div className="Float_cotainer_box">
                                <div className="Float_cotainer_box_Left">메일 발송</div>
                                <div className="Float_cotainer_box_Right">
                                    <div className="" style={{ paddingTop: '10px' }}>
                                        <label onClick={() => setReservation_Mail_Checking(true)} style={{ marginRight: '30px' }}>
                                            <input
                                                type="radio"
                                                value="Mail_send"
                                                name="mail_checking"
                                                readOnly
                                                checked={Reservation_Mail_Checking}
                                            ></input>
                                            예
                                        </label>
                                        <label onClick={() => setReservation_Mail_Checking(false)}>
                                            <input
                                                type="radio"
                                                value="Not_send"
                                                name="mail_checking"
                                                readOnly
                                                checked={!Reservation_Mail_Checking}
                                            ></input>
                                            아니오
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {Reservation_Mail_Checking ? (
                                <ResiMailSendingMainPage
                                    Mail_State={Mail_State}
                                    setMail_State={data => setMail_State(data)}
                                    setDetailInfo={data => setDetailInfo(data)}
                                    Selected_User_State={Selected_User_State}
                                    setSelected_User_State={data => setSelected_User_State(data)}
                                ></ResiMailSendingMainPage>
                            ) : (
                                <div></div>
                            )}

                            <div className="Button_Cotainer">
                                <button className="Submit" onClick={() => handleRoomReservation()}>
                                    예약하기
                                </button>
                                <button
                                    className="Cancle"
                                    onClick={() => {
                                        ModalPopUpClose();
                                    }}
                                >
                                    취소
                                </button>
                            </div>
                        </div>
                    </div>
                </ApplyModalMainDivBox>
            ) : (
                <ApplyModalMainDivBox style={{ height: '100%' }}>
                    <LoginModalMainPage></LoginModalMainPage>
                    <div className="Close_button_container" onClick={ModalPopUpClose}>
                        <CgCloseO></CgCloseO>
                    </div>
                </ApplyModalMainDivBox>
            )}
        </Modal>
    );
};

export default React.memo(ApplyModal);
