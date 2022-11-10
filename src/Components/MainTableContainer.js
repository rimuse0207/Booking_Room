import axios from 'axios';
import moment from 'moment';
import 'moment/locale/ko';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
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

const TestMainDivBox = styled.div`
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
                                font-size: 0.9em;
                                overflow: hidden;
                                font-weight: light;
                                white-space: nowrap;
                                padding-top: 5px;
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

    const RoomData = [
        {
            name: '2F_A_ROOM',
            value: '2F_A_ROOM',
            targetId: 'M220506085327A348577',
            userId: 'a34dhk02.a',
            label: '판교 2층 A룸  (  2F_A_ROOM )',
        },
        {
            name: '2F_B_ROOM',
            value: '2F_B_ROOM',
            targetId: 'M220511051804A346734',
            userId: 'a34dhk02.b',
            label: '판교 2층 B룸  (  2F_B_ROOM )',
        },
        {
            name: '2F_C_ROOM',
            value: '2F_C_ROOM',
            targetId: 'M220511052330A343086',
            userId: 'a34dhk02.c',
            label: '판교 2층 C룸   ( 2F_C_ROOM )',
        },
        {
            name: '2F_D_ROOM',
            value: '2F_D_ROOM',
            targetId: 'M220511052716A342216',
            userId: 'a34dhk02.d',
            label: '판교 2층 D룸  ( 2F_D_ROOM )',
        },
        {
            name: '8F_A_ROOM',
            value: '8F_A_ROOM',
            targetId: 'M220511053254A341850',
            userId: 'a34dhk08.a',
            label: '판교 8층 A룸 ( 8F_A_ROOM )',
        },
        {
            name: '8F_C_ROOM',
            value: '8F_C_ROOM',
            targetId: 'M220511053429A342914',
            userId: 'a34dhk08.c',
            label: '판교 8층 C룸 ( 8F_C_ROOM )',
        },
        {
            name: '8F_D_ROOM',
            value: '8F_D_ROOM',
            targetId: 'M220511053957A341367',
            userId: 'a34dhk08.d',
            label: '판교 8층 D룸 ( 8F_D_ROOM )',
        },
    ];
    const CarData = [
        {
            name: '(판교)_155허 7880',
            value: '(판교)_155허 7880',
            targetId: 'M220511063942A348400',
            userId: 'a34car1.car2',
            label: '판교 법인차량 ( (판교)_155허 7880 )',
        },
        {
            name: '(판교)_191허 3655',
            value: '(판교)_191허 3655',
            targetId: 'M220511064441A34933',
            userId: 'a34car1.car7',
            label: '판교 법인차량 ( (판교)_191허 3655 )',
        },
        {
            name: '(동탄)_14나 1878',
            value: '(동탄)_14나 1878',
            targetId: 'M220511064243A342636',
            userId: 'a34car1.car5',
            label: '동탄 법인차량 ( (동탄)_14나 1878 )',
        },
        {
            name: '(동탄)_155허 7879',
            value: '(동탄)_155허 7879',
            targetId: 'M220511063838A347157',
            userId: 'a34car1.car1',
            label: '동탄 법인차량 ( (동탄)_155허 7879 )',
        },
        {
            name: '(동탄)_155허 8053',
            value: '(동탄)_155허 8053',
            targetId: 'M220511064109A345960',
            userId: 'a34car1.car3',
            label: '동탄 법인차량 ( (동탄)_155허 8053 )',
        },
        {
            name: '(동탄)_45호 6144',
            value: '(동탄)_45호 6144',
            targetId: 'M220511064534A346135',
            userId: 'a34car1.car8',
            label: '동탄 법인차량 ( (동탄)_45호 6144 )',
        },
        {
            name: '(아산)_155허 7765',
            value: '(아산)_155허 7765',
            targetId: 'M220511064156A344713',
            userId: 'a34car1.car4',
            label: '아산 법인차량 ( (아산)_155허 7765 )',
        },
        {
            name: '(아산)_191허 3152',
            value: '(아산)_191허 3152',
            targetId: 'M220511065112A342288',
            userId: 'a34car1.car10',
            label: '아산 법인차량 ( (아산)_191허 3152 )',
        },
        {
            name: '(아산)_191허 3153',
            value: '(아산)_191허 3153',
            targetId: 'M220511064348A348000',
            userId: 'a34car1.car6',
            label: '아산 법인차량 ( (아산)_191허 3153 )',
        },
        {
            name: '(아산)_45호 6140',
            value: '(아산)_45호 6140',
            targetId: 'M220511065222A346350',
            userId: 'a34car1.car11',
            label: '아산 법인차량 ( (아산)_45호 6140 )',
        },
        {
            name: '(아산)_45호 6141',
            value: '(아산)_45호 6141',
            targetId: 'M220511065331A342699',
            userId: 'a34car1.car12',
            label: '아산 법인차량 ( (아산)_45호 6141 )',
        },
        {
            name: '(아산)_45호 6142',
            value: '(아산)_45호 6142',
            targetId: 'M220511065431A343884',
            userId: 'a34car1.car13',
            label: '아산 법인차량 ( (아산)_45호 6142 )',
        },
        {
            name: '(아산)_74러 3874',
            value: '(아산)_74러 3874',
            targetId: 'M220511065002A343682',
            userId: 'a34car1.car9',
            label: '아산 법인차량 ( (아산)_74러 3874 )',
        },
    ];
    const SelectBasicTitle = useSelector(state => state.TitleSelectorRedux.SelectBasicTitle);
    const Loading = useSelector(state => state.LoaderCheckingRedux.loading);
    const LoginInfo = useSelector(state => state.LoginInfoDataRedux.Infomation);
    const setScrollView = useRef(null);
    const [NowTimes, setNowTimes] = useState(new Date());
    const [LeftHeaderInfo, setLeftHeaderInfo] = useState(RoomData);
    const [SelectLeftHeaderInfo, setSelectLeftHeaderInfo] = useState(null);
    const [RoomDatas, setRoomDatas] = useState([]);
    const [Room_8F_D_Data, setRoom_8F_D_Data] = useState([]);
    const [FloatingMenuOnCheck, setFloatingMenuOnCheck] = useState(true);
    const [ApplyModalIsOpen, setApplyModalIsOpen] = useState(false);
    const [SelectModalIsOpen, setSelectModalIsOpen] = useState(false);
    const [SelectModalData, setSelectModalData] = useState(null);
    const [SelectModalRomms_Data, setSelectModalRomms_Data] = useState(null);
    const [SelectedRoomName, setSelectRoomName] = useState(null);

    const [SelectDate, setSelectDate] = useState({
        StartDate: null,
        StartTime: null,
        EndDate: null,
        EndTime: null,
    });

    ///API 호출후 데이터 가져오기

    useEffect(() => {
        // if (RoomDatas.length === 0) getDatas();

        getDatas();
    }, [NowTimes, LeftHeaderInfo]);

    const getDatas = async () => {
        try {
            dispatch(Loader_Check_For_True());
            const getDatasFromServer = await axios.post(`${process.env.REACT_APP_DB_HOST}/users/Test_Brity_works_Pims_API_Router`, {
                Show_Date: moment(NowTimes).format('YYYY-MM-DD'),
                LeftHeaderInfo,
                SelectBasicTitle,
            });
            if (getDatasFromServer.data.dataSuccess) {
                setRoomDatas(getDatasFromServer.data.RoomDatas);
                dispatch(Loader_Check_For_False());
            } else {
                toast.show({
                    title: `BrityWorks API Error발생. DHKS_IT팀에게 문의바랍니다.`,
                    successCheck: false,
                    duration: 6000,
                });
                dispatch(Loader_Check_For_False());
            }
        } catch (error) {
            console.log(error);
            toast.show({
                title: `BrityWorks API Error발생. DHKS_IT팀에게 문의바랍니다.`,
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
        setSelectLeftHeaderInfo(LeftHeaderInfo.filter(list => list.value === data.SelectRoom)[0]);
        setSelectDate({
            StartDate: new Date(NowTimes),
            StartTime: data.StartTime,
            EndDate: new Date(NowTimes),
            EndTime: moment(`${moment(NowTimes).format('YYYY-MM-DD')} ${data.StartTime}`)
                .add(30, 'minutes')
                .format('HH:mm'),
        });
        setApplyModalIsOpen(true);
    };

    return (
        <TestMainDivBox>
            {/* 날짜 선택 시작 */}
            <div style={{ textAlign: 'center' }}>
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
                        {/* {moment(NowTimes).lang('ko').format('YYYY-MM-DD dddd')} */}
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
            </div>
            <div className="Mian_Table_Container">
                {/* 테이블 목록 왼쪽 제목 시작 */}
                <div className="Room_title_container">
                    <div className="Main_Room_Time_title">
                        <div style={{ lineHeight: '50px', fontSize: '1.2em', fontWeight: 'bold', color: 'red' }}>
                            {/* {SelectBasicTitle === 'Company_Room' ? '회의실' : '법인차량'} 예약 */}
                            {LoginInfo.Login_company === 'DHKS' ? (
                                <select
                                    className="Room_OR_Car_CheckTitle_Select"
                                    value={SelectBasicTitle}
                                    onChange={e => {
                                        dispatch(Title_Change_Func(e.target.value));
                                        setLeftHeaderInfo(e.target.value === 'Company_Room' ? RoomData : CarData);
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
