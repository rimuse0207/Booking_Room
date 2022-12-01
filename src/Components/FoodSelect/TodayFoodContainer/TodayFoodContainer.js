import axios from 'axios';
import moment from 'moment';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import NavigationMainPage from '../../Navigation/NavigationMainPage';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import 'moment/locale/ko';
import { ko } from 'date-fns/esm/locale';
import { Loader_Check_For_False, Loader_Check_For_True } from '../../../Models/LoaderCheckReducer/LoaderCheckReducer';
import { toast } from '../../ToasMessage/ToastManager';
import LoginModal from '../../Modals/LoginModal';

const TodayFoodContainerMainDivBox = styled.div`
    border: 1px solid black;
    min-height: 100vh;
    padding-bottom: 50px;
    .Today_Title {
        text-align: center;
        border-bottom: 1px solid lightgray;
        padding-bottom: 10px;
    }
    .ScrollView_Menu_Show {
        position: relative;
        margin-top: 30px;
        .FoodMenuShow {
            width: 100%;
            table {
                width: 100%;
                text-align: center;
                thead {
                    font-size: 1.2em;
                    font-weight: bolder;
                }
                th,
                td {
                    padding: 10px;
                }
            }
        }
        .Arrow_Left {
            position: absolute;
            left: 10px;
            top: 40%;
            font-size: 40px;
            z-index: 10;
        }
        .Arrow_Right {
            position: absolute;
            right: 10px;
            top: 40%;
            font-size: 40px;
            z-index: 10;
        }
    }
    .Button_Select_Cotainer {
        text-align: center;
        margin-top: 50px;
        height: 70px;

        display: flex;
        justify-content: space-around;
        button {
            border: none;
            display: block;
            background-color: #3ca9e2;
            color: #fff;
            font-weight: bold;
            text-transform: uppercase;
            cursor: pointer;
            -webkit-transition: all 0.2s ease;
            transition: all 0.2s ease;
            font-size: 18px;
            position: relative;
            display: inline-block;
            cursor: pointer;
            text-align: center;
            width: 40%;
            height: 100%;
            border-radius: 5px;
        }
        button:hover {
            background-color: #329dd5;
            -webkit-transition: all 0.2s ease;
            transition: all 0.2s ease;
        }
    }
    .Login_Select_Container {
        margin-top: 50px;
    }
`;
moment.locale('ko');
const TodayFoodContainer = ({ history }) => {
    const dispatch = useDispatch();
    const [TodayFoodState, setTodayFoodState] = useState(null);
    const [TodayDate, setTodayDate] = useState(new Date());
    const [ImageUploadCheck, setImageUploadCheck] = useState(false);
    const [SurvayCheck, setSurvayCheck] = useState(false);
    const [LoginModalOpen, setLoginModalOpen] = useState(false);
    const [SurvayWillChecking, setSurvayWillChecking] = useState(null);
    const ModalPopUpClose = () => {
        setLoginModalOpen(false);
    };

    const LoginInfo = useSelector(state => state.LoginInfoDataRedux.Infomation);

    const GetFromServerWeekFoodMenu = async () => {
        try {
            dispatch(Loader_Check_For_True());
            const ServerWeekFoodMenu = await axios.get(`${process.env.REACT_APP_DB_HOST}/FoodApp/WeekFoodMenu`, {
                params: {
                    start_time: moment(TodayDate).format('YYYY-MM-DD'),
                    Login_id: LoginInfo.Login_id,
                    Login_name: LoginInfo.Login_name,
                },
            });
            if (ServerWeekFoodMenu.data.dataSuccess) {
                setTodayFoodState(
                    ServerWeekFoodMenu.data.WeekFoodMenuSelectDBRows[0] ? ServerWeekFoodMenu.data.WeekFoodMenuSelectDBRows[0] : null
                );
                setImageUploadCheck(ServerWeekFoodMenu.data.ImageUploadCheck);
                setSurvayCheck(ServerWeekFoodMenu.data.SurvayCheck);
                setSurvayWillChecking(
                    ServerWeekFoodMenu.data.SurvayChecking_Rows[0] ? ServerWeekFoodMenu.data.SurvayChecking_Rows[0] : null
                );
                dispatch(Loader_Check_For_False());
            } else {
                dispatch(Loader_Check_For_False());
            }
        } catch (error) {
            console.log(error);
            dispatch(Loader_Check_For_False());
        }
    };

    const handleImageUploadMoving = async () => {
        try {
            if (!LoginInfo.Login_token) {
                setLoginModalOpen(true);
                toast.show({
                    title: `로그인 후 업로드가 가능합니다.`,
                    successCheck: false,
                    duration: 6000,
                });
                history.push('/Login_Page');
                return;
            } else {
                history.push('/Food_Select');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSurvayUploadMoving = async () => {
        try {
            history.push('/Food_Survay');
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        GetFromServerWeekFoodMenu();
    }, [TodayDate]);

    const GetDateTimes = () => {
        const startTime = moment(TodayDate);
        const endTime = moment(`${moment().format('YYYY-MM-DD')} 11:30:00`);

        const years = startTime.diff(endTime, 'years');
        const months = startTime.diff(endTime, 'months');
        const days = startTime.diff(endTime, 'days');
        const hour = startTime.diff(endTime, 'hour');
        const minutes = startTime.diff(endTime, 'minutes');
        const seconds = startTime.diff(endTime, 'seconds');

        if (years > 0 && years !== 1) return years + '년후 사용 가능';
        else if (months > 0 && months !== 1) return months + '달후 사용 가능';
        else if (days > 0 && days !== 1) return days + '일후 사용 가능';
        else if (hour > 0 && hour !== 1) return hour + '시간후 사용 가능';
        else if (minutes > 0 && minutes !== 1) return minutes + '분후 사용 가능';
        else if (seconds > 0 && seconds !== 1) return seconds + '초후 사용 가능';
        else return '기한 만료';
    };

    return (
        <TodayFoodContainerMainDivBox>
            <NavigationMainPage TitleName="식단표"></NavigationMainPage>
            {/* <h2 className="Today_Title">식단표</h2> */}
            <div className="ScrollView_Menu_Show">
                {TodayFoodState ? (
                    <div className="FoodMenuShow">
                        <table>
                            <thead>
                                <tr>
                                    <th>{moment(TodayFoodState.food_week_menu_dates).lang('ko').format('YYYY년 MM월 DD일 dddd')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{TodayFoodState?.food_week_menu_menu1}</td>
                                </tr>
                                <tr>
                                    <td>{TodayFoodState?.food_week_menu_menu2}</td>
                                </tr>
                                <tr>
                                    <td>{TodayFoodState?.food_week_menu_menu3}</td>
                                </tr>
                                <tr>
                                    <td>{TodayFoodState?.food_week_menu_menu4}</td>
                                </tr>
                                <tr>
                                    <td>{TodayFoodState?.food_week_menu_menu5}</td>
                                </tr>
                                <tr>
                                    <td>{TodayFoodState?.food_week_menu_menu6}</td>
                                </tr>
                                <tr>
                                    <td>{TodayFoodState?.food_week_menu_menu7}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ) : (
                    '데이터가 없습니다.'
                )}

                <div className="Arrow_Left" onClick={() => setTodayDate(moment(TodayDate).subtract(1, 'days').format('YYYY-MM-DD'))}>
                    <div>
                        <IoIosArrowBack></IoIosArrowBack>
                    </div>
                </div>
                <div className="Arrow_Right" onClick={() => setTodayDate(moment(TodayDate).add(1, 'days').format('YYYY-MM-DD'))}>
                    <div>
                        <IoIosArrowForward></IoIosArrowForward>
                    </div>
                </div>

                {moment().format('YYYY-MM-DD') === moment(TodayDate).format('YYYY-MM-DD') ? (
                    <div className="Button_Select_Cotainer">
                        {ImageUploadCheck ? (
                            <button style={{ backgroundColor: 'orange' }}>잔반 이미지 업로드 완료</button>
                        ) : (
                            <button onClick={() => handleImageUploadMoving()}>잔반 이미지 업로드</button>
                        )}
                        {SurvayCheck ? (
                            <button style={{ backgroundColor: 'orange' }}>
                                식당 설문조사 완료
                                <br />( {SurvayWillChecking.food_week_survay_will_price} Will )
                            </button>
                        ) : (
                            <button onClick={() => handleSurvayUploadMoving()}>식당 설문조사</button>
                        )}
                    </div>
                ) : (
                    <div className="Button_Select_Cotainer">당일날만 사용가능합니다.</div>
                )}

                <div></div>
            </div>
        </TodayFoodContainerMainDivBox>
    );
};

export default TodayFoodContainer;
