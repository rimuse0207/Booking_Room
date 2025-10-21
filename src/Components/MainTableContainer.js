import axios from 'axios';
import moment from 'moment';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import 'moment/locale/ko';
import { ko } from 'date-fns/esm/locale';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import LoaderMainPage from './Loader/LoaderMainPage';
import FloorRoomTable from './RoomTables/ContentRoomShowTable.js/FloorRoomTable';
import HourShowTable from './RoomTables/ContentHeaderTable/HourShowTable';
import MinuteShowTable from './RoomTables/ContentHeaderTable/MinuteShowTable';
import LeftHeaderShowTable from './RoomTables/ContentHeaderTable/LeftHeaderShowTable';
import { toast } from './ToasMessage/ToastManager';
import { FloatingMenu, MainButton, ChildButton } from 'react-floating-button-menu';
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs';
import { TiThMenu } from 'react-icons/ti';
import { IoCloseSharp } from 'react-icons/io5';
import { FcOvertime } from 'react-icons/fc';
import ApplyModal from './Modals/ApplyModal';
import { useDispatch, useSelector } from 'react-redux';
import { Loader_Check_For_False, Loader_Check_For_True } from '../Models/LoaderCheckReducer/LoaderCheckReducer';
import SelectModal from './Modals/SelectModal';
import { Title_Change_Func } from '../Models/TitleSelectorReducer/TitleSelectorReducer';
import { Axios_Post_Moduls, request } from '../API';
import UserSelectMainPage from './UserSelect/UserSelectMainPage';
import { BrowserView } from 'react-device-detect';

export const TestMainDivBox = styled.div`
    margin-bottom: 30px;
    .Date_Show_Click_Main_Container {
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        .Date_Show_Click_Before {
            margin-right: 10px;
            font-size: 2em;
            :hover {
                cursor: pointer;
                color: gray;
            }
        }
        .Date_Show_Content {
            .example-custom-input {
                font-size: 1.5em;
                border: none;
                background: none;
                :hover {
                    cursor: pointer;
                    color: blue;
                }
            }
            margin-top: 12px;
            :hover {
                cursor: pointer;
                color: blue;
            }

            .saturday {
                color: blue;
            }
            .sunday {
                color: red;
            }
        }
        .Date_Show_Click_After {
            margin-left: 10px;
            font-size: 2em;
            :hover {
                cursor: pointer;
                color: gray;
            }
        }
    }

    .Mian_Table_Container {
        margin: 0;
        border: 1px solid #b0b0b0;
        display: flex;
        /* min-width: 1510px; */
        background-color: #fff;
        position: relative;
        @media only screen and (max-width: 800px) {
            min-width: 50px !important;
        }
    }
    .Room_title_container {
        width: 190px;
        @media only screen and (max-width: 800px) {
            min-width: 100px !important;
            font-size: 0.5em;
            text-align: start;
        }
        .Main_Room_Time_title {
            height: 50px;
            text-align: center;
            width: 190px;
            @media only screen and (max-width: 800px) {
                width: 100px !important;
            }
        }
        .Main_Room_title {
            border: 1px solid #b0b0b0;
            height: 70px;
            text-align: center;
            font-weight: bold;
            width: 190px;
            line-height: 43px;
            @media only screen and (max-width: 800px) {
                width: 100px !important;
            }
        }
    }
    .Room_Content_container {
        /* width: calc(100%-300px); */

        /* min-width: 1260px; */
        overflow-x: scroll;

        @media only screen and (max-width: 800px) {
            min-width: 100px !important;
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
        .Main_Room_Time_title {
            border-top: 1px solid #b0b0b0;
            height: 50px;
            text-align: center;
        }

        ///Room에 따른 시간 Table CSS
        .Main_TimeLine_Table_Contents {
            width: 2882px;
            .Main_Room_title {
                border-top: 1px solid #b0b0b0;
                height: 70px;
                text-align: center;
                font-weight: bold;
                @media only screen and (max-width: 800px) {
                    min-width: 100px !important;
                }
                .TableInTableLine {
                    display: flex;
                    height: 100%;
                    position: relative;

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
                            :hover {
                                cursor: pointer;
                                opacity: 0.9;
                            }

                            .ContentTextCotainer {
                                font-size: 0.8em;
                                overflow: hidden;
                                font-weight: light;
                                white-space: nowrap;
                                padding-top: 2px;
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
                    :hover {
                        cursor: pointer;
                        background-color: gray;
                    }
                }
            }
        }

        .Main_TimeLine_Table_Container {
            top: 40px;
            .Main_TimeLine_Content {
                border: 1px solid red;
                display: table-cell;
                width: 42px;
                text-align: center;
                height: 71vh;
                /* :hover {
                    cursor: pointer;
                    background-color: #efefef;
                } */
            }
        }
    }
    .Main_Room_Time_title_Main_Container {
        /* border: 1px solid #b0b0b0; */
        height: 50px;
        text-align: center;
        font-weight: bold;
        width: 2882px;
        position: relative;
        .TableInTableLine_Hours {
            display: flex;
            padding-top: 10px;
            .Main_TimeLine_Hour_content {
                width: 120px;
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
                width: 60px;
                text-align: center;
            }
        }
    }

    .FloatingMenu_Container {
        position: fixed;
        bottom: 40px;
        right: 40px;
        z-index: 10;
        @media only screen and (max-width: 800px) {
            display: none;
        }
        a,
        li {
            background-color: #fff;
        }
    }

    .Room_OR_Car_CheckTitle_Select {
        width: 80%;
        height: 100%;
        font-size: 1.1em;
        font-weight: bolder;
        text-align: center;
        border: none;
        border-bottom: 1px solid gray;
        outline: none;
    }
`;

const MainTableContainer = () => {
    moment.locale('ko');
    const dispatch = useDispatch();

    const SelectBasicTitle = useSelector(state => state.TitleSelectorRedux.SelectBasicTitle);
    const Loading = useSelector(state => state.LoaderCheckingRedux.loading);
    const LoginInfo = useSelector(state => state.LoginInfoDataRedux.Infomation);
    const setScrollView = useRef(null);
    const [NowTimes, setNowTimes] = useState(new Date());
    const [SelectLeftHeaderInfo, setSelectLeftHeaderInfo] = useState(null);
    const [RoomDatas, setRoomDatas] = useState([]);
    const [FloatingMenuOnCheck, setFloatingMenuOnCheck] = useState(true);
    const [ApplyModalIsOpen, setApplyModalIsOpen] = useState(false);
    const [SelectModalIsOpen, setSelectModalIsOpen] = useState(false);
    const [SelectModalData, setSelectModalData] = useState(null);
    const [SelectModalRomms_Data, setSelectModalRomms_Data] = useState(null);
    const [SelectedRoomName, setSelectRoomName] = useState(null);
    const [Room_8F_D_Data, setRoom_8F_D_Data] = useState([]);
    const [LeftHeaderInfo, setLeftHeaderInfo] = useState([]);

    const [SelectDate, setSelectDate] = useState({
        StartDate: null,
        StartTime: null,
        EndDate: null,
        EndTime: null,
    });

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

    // Floating Scroll Move

    const handleMenuRightClick = () => {
        if (setScrollView.current) setScrollView.current.scrollLeft = setScrollView.current.scrollLeft + 120;
    };
    const handleMenuLeftClick = () => {
        if (setScrollView.current) setScrollView.current.scrollLeft = setScrollView.current.scrollLeft - 120;
    };

    //Table의 시간 선택 시
    const handleTableTimeSelect = data => {
        if (data.Reservation_Permissions) {
            setSelectLeftHeaderInfo(RoomDatas.filter(list => list.value === data.SelectRoom)[0]);
            setSelectDate({
                StartDate: new Date(NowTimes),
                StartTime: data.StartTime,
                EndDate: new Date(NowTimes),
                EndTime: moment(`${moment(NowTimes).format('YYYY-MM-DD')} ${data.StartTime}`)
                    .add(30, 'minutes')
                    .format('HH:mm'),
            });
            setApplyModalIsOpen(true);
        } else {
            toast.show({
                title: `${data.SelectRoom} 예약은 예약 조회만 가능합니다. `,
                successCheck: false,
                duration: 6000,
            });
        }
    };

    ///API 호출후 데이터 가져오기
    useEffect(() => {
        getDatas();
    }, [NowTimes, SelectBasicTitle]);

    const getDatas = async () => {
        try {
            dispatch(Loader_Check_For_True());
            const getDatasFromServer = await request.post(`/users/Test_Brity_works_Pims_API_Router`, {
                Show_Date: moment(NowTimes).format('YYYY-MM-DD'),
                SelectBasicTitle,
            });
            if (getDatasFromServer.data.status === 200) {
                setRoomDatas(getDatasFromServer.data.data);
                dispatch(Loader_Check_For_False());
            } else {
                toast.show({
                    title: `BrityWorks API Error발생. Errcode_FA001 DHKS_IT팀에게 문의바랍니다.`,
                    successCheck: false,
                    duration: 6000,
                });
                dispatch(Loader_Check_For_False());
            }
        } catch (error) {
            console.log(error);
            toast.show({
                title: `BrityWorks API Error발생. Errcode_FA002 DHKS_IT팀에게 문의바랍니다.`,
                successCheck: false,
                duration: 6000,
            });
            dispatch(Loader_Check_For_False());
        }
    };

    //Table ScrollView 초기화
    useEffect(() => {
        if (setScrollView.current) setScrollView.current.scrollLeft = 980.8;
    }, [RoomDatas]);

    return (
        <TestMainDivBox>
            {/* 날짜 선택 시작 */}
            <div style={{ textAlign: 'center', position: 'relative' }}>
                <div className="Date_Show_Click_Main_Container">
                    <div
                        className="Date_Show_Click_Before"
                        onClick={() => {
                            setNowTimes(new Date(moment(NowTimes).subtract(1, 'day')));
                        }}
                    >
                        <IoIosArrowBack></IoIosArrowBack>
                    </div>
                    <h3 className="Date_Show_Content">
                        <DatePicker
                            locale={ko}
                            selected={NowTimes}
                            onChange={date => setNowTimes(date)}
                            dateFormat="yyyy-MM-dd eeee"
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
                    </h3>
                    <div className="Date_Show_Click_After" onClick={() => setNowTimes(new Date(moment(NowTimes).add(1, 'day')))}>
                        <IoIosArrowForward></IoIosArrowForward>
                    </div>
                </div>

                {/* 날짜 선택 끝 */}
                {/* <BrowserView> */}
                {/* 유저 검색 시작 */}
                {/* <UserSelectMainPage></UserSelectMainPage> */}
                {/* 유저 검색 끝 */}
                {/* </BrowserView> */}
            </div>
            <div className="Mian_Table_Container">
                {/* 테이블 목록 왼쪽 제목 시작 */}
                <div className="Room_title_container">
                    <div className="Main_Room_Time_title">
                        <div style={{ lineHeight: '50px', fontSize: '1.2em', fontWeight: 'bold', color: 'red' }}>
                            {LoginInfo.Login_company === 'DHKS' ? (
                                <select
                                    className="Room_OR_Car_CheckTitle_Select"
                                    value={SelectBasicTitle}
                                    onChange={e => {
                                        dispatch(Title_Change_Func(e.target.value));
                                    }}
                                >
                                    <option value="Company_Room">회의실</option>
                                    <option value="Company_Car">법인차량</option>
                                </select>
                            ) : (
                                '회의실'
                            )}
                        </div>
                    </div>
                    {RoomDatas.map((list, i) => {
                        return <LeftHeaderShowTable key={list.name} InfoDatas={list}></LeftHeaderShowTable>;
                    })}
                </div>
                {/* 테이블 목록 왼쪽 제목 끝 */}

                <div className="Room_Content_container" ref={setScrollView}>
                    {/* 테이블 목록 시간 컴포넌트 시작 */}
                    <div className="Main_Room_Time_title_Main_Container">
                        <HourShowTable></HourShowTable>
                        <MinuteShowTable></MinuteShowTable>
                    </div>
                    {/* 테이블 목록 시간 컴포넌트 종료 */}

                    {/* 테이블 컨텐트 시작 시간 컴포넌트 시작 */}
                    <div className="Main_TimeLine_Table_Contents">
                        {RoomDatas.map((list, i) => {
                            return (
                                <FloorRoomTable
                                    key={list.name}
                                    Room_Name={list.name}
                                    Room_Datas={list.Datas}
                                    Reservation_Permissions={list.Reservation_Permissions}
                                    handleTableTimeSelect={data => handleTableTimeSelect(data)}
                                    setSelectModalIsOpen={() => setSelectModalIsOpen(true)}
                                    setSelectModalData={data => setSelectModalData(data)}
                                    setSelectModalRomms_Data={data => setSelectModalRomms_Data(data)}
                                ></FloorRoomTable>
                            );
                        })}
                    </div>
                    {/* 테이블 컨텐트 시작 시간 컴포넌트 종료 */}
                </div>
            </div>

            {/* 로딩 컴포넌트 시작 */}
            <LoaderMainPage loading={Loading}></LoaderMainPage>
            {/* 로딩 컴포넌트 끝 */}

            {/* 플로팅 메뉴바 컴포넌트 */}
            <div className="FloatingMenu_Container">
                <FloatingMenu slideSpeed={500} direction="up" spacing={8} isOpen={FloatingMenuOnCheck}>
                    <MainButton
                        iconResting={<TiThMenu style={{ fontSize: 20 }} nativeColor="white" />}
                        iconActive={<IoCloseSharp style={{ fontSize: 20 }} nativeColor="white" color="black" />}
                        backgroundColor="black"
                        onClick={() => setFloatingMenuOnCheck(!FloatingMenuOnCheck)}
                        size={56}
                    ></MainButton>
                    <ChildButton
                        icon={<BsArrowLeft style={{ fontSize: 20 }} nativeColor="black" />}
                        backgroundColor="white"
                        size={40}
                        onClick={() => handleMenuLeftClick()}
                    />
                    <ChildButton
                        icon={<BsArrowRight style={{ fontSize: 20 }} nativeColor="black" />}
                        backgroundColor="white"
                        size={40}
                        onClick={() => handleMenuRightClick()}
                    />
                    <ChildButton
                        icon={<FcOvertime style={{ fontSize: 20 }} nativeColor="black" />}
                        backgroundColor="white"
                        size={40}
                        onClick={() => setApplyModalIsOpen(true)}
                    />
                </FloatingMenu>
            </div>
            {/* 플로팅 메뉴바 컴포넌트 끝 */}

            {/* 예약시작 컴포넌트 시작 */}
            {ApplyModalIsOpen ? (
                <ApplyModal
                    ApplyModalOpenData={ApplyModalIsOpen}
                    setApplyModalOpenData={() => setApplyModalIsOpen(false)}
                    SelectLeftHeaderInfo={SelectLeftHeaderInfo}
                    SelectRoom_Info_Data={Room_8F_D_Data}
                    RoomDatas={RoomDatas}
                    SelectBasicTitle={SelectBasicTitle}
                    SelectedRoomName={SelectedRoomName}
                    LeftHeaderInfo={LeftHeaderInfo}
                    setSelectLeftHeaderInfo={data => setSelectLeftHeaderInfo(data)}
                    SelectDate={SelectDate}
                    setSelectDate={data => setSelectDate(data)}
                    NowTimes={NowTimes}
                    setNowTimes={data => setNowTimes(data)}
                    getDatas={() => getDatas()}
                ></ApplyModal>
            ) : (
                <></>
            )}
            {/* 예약시작 컴포넌트 끝*/}

            {/* 예약조회 컴포넌트 시작 */}
            {SelectModalIsOpen ? (
                <SelectModal
                    SelectModalIsOpen={SelectModalIsOpen}
                    setSelectModalIsOpen={() => setSelectModalIsOpen(false)}
                    SelectModalData={SelectModalData}
                    RoomDatas={RoomDatas}
                    SelectModalRomms_Data={SelectModalRomms_Data}
                    setSelectModalData={data => setSelectModalData(data)}
                    getDatas={() => getDatas()}
                ></SelectModal>
            ) : (
                <></>
            )}
            {/* 예약조회 컴포넌트 끝 */}
        </TestMainDivBox>
    );
};
export default MainTableContainer;
