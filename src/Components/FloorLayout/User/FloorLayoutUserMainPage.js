import axios from 'axios';
import React, { forwardRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Axios_Get_Moduls, request } from '../../../API';
import { Loader_Check_For_False, Loader_Check_For_True } from '../../../Models/LoaderCheckReducer/LoaderCheckReducer';
import LoaderMainPage from '../../Loader/LoaderMainPage';
import FloorLayoutUserContent from './FloorLayoutUserContent/FloorLayoutUserContent';
import FloorLayoutUserSelect from './FloorLayoutUserSelect/FloorLayoutUserSelect';
import { toast } from '../../ToasMessage/ToastManager';
import moment from 'moment';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import 'moment/locale/ko';
import { ko } from 'date-fns/esm/locale';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TestMainDivBox } from '../../MainTableContainer';

const FloorLayoutUserMainPageMainDivBox = styled.div`
    overflow: auto;
    /* padding: 10px; */
    padding-top: 80px;
    height: 90vh;
    ::-webkit-scrollbar {
        width: 5px;
        height: 10px;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #368;
        border-radius: 10px;
    }
    ::-webkit-scrollbar-track {
        background-color: grey;
        border-radius: 10px;
        box-shadow: inset 0px 0px 2px white;
    }
`;

const FloorLayoutUserMainPageMinDivBox = styled.div`
    .Date_Picks_Container {
        font-size: 1em;
        text-align: center;
        position: fixed;
        top: 60px;
        right: 40%;
        z-index: 100;
    }
`;

const FloorLayoutUserMainPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const LoginInfo = useSelector(state => state.LoginInfoDataRedux.Infomation);
    const Loading = useSelector(state => state.LoaderCheckingRedux.loading);
    const [PlaceState, setPlaceState] = useState([]);
    const [UserSelect, setUserSelect] = useState(null);
    const [NowTimes, setNowTimes] = useState(new Date());
    const Get_Floor_Room_Position = async () => {
        dispatch(Loader_Check_For_True());
        try {
            const Get_Floor_Room_Position_State_Axios = await Axios_Get_Moduls(`/users/User_Get_Floor_Room_Position_State`, {
                times: NowTimes,
            });

            if (Get_Floor_Room_Position_State_Axios) {
                setPlaceState(Get_Floor_Room_Position_State_Axios);

                dispatch(Loader_Check_For_False());
            } else
                toast.show({
                    title: `IT팀에게 문의바랍니다.`,
                    successCheck: false,
                    duration: 6000,
                });
        } catch (error) {
            console.log(error);
            dispatch(Loader_Check_For_False());
        }
    };

    useEffect(() => {
        if (LoginInfo.Login_token) {
            Get_Floor_Room_Position();
        } else {
            history.push('/Login_Page');
        }
    }, [NowTimes]);

    const handleClicksNotUser = e => {
        e.stopPropagation();
        setUserSelect(null);
    };
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
    ///date-picker 버튼 컴포넌트
    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <button className="example-custom-input" onClick={onClick} ref={ref}>
            {value}
        </button>
    ));
    return (
        <FloorLayoutUserMainPageMinDivBox>
            <TestMainDivBox>
                <div className="Date_Picks_Container">
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
                    </div>
                </div>
            </TestMainDivBox>
            <FloorLayoutUserMainPageMainDivBox onClick={e => handleClicksNotUser(e)}>
                <FloorLayoutUserContent
                    UserSelect={UserSelect}
                    PlaceState={PlaceState}
                    setUserSelect={data => setUserSelect(data)}
                ></FloorLayoutUserContent>
            </FloorLayoutUserMainPageMainDivBox>
            <FloorLayoutUserSelect
                id="text"
                UserSelect={UserSelect}
                setUserSelect={data => setUserSelect(data)}
                handleClicksNotUser={e => handleClicksNotUser(e)}
                Get_Floor_Room_Position={() => Get_Floor_Room_Position()}
            ></FloorLayoutUserSelect>

            {/* 로딩 컴포넌트 시작 */}
            <LoaderMainPage loading={Loading}></LoaderMainPage>
            {/* 로딩 컴포넌트 끝 */}
        </FloorLayoutUserMainPageMinDivBox>
    );
};

export default FloorLayoutUserMainPage;
