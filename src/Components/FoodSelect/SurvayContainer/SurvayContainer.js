import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import NavigationMainPage from '../../Navigation/NavigationMainPage';
import Select from 'react-select';
import { useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import { Loader_Check_For_False, Loader_Check_For_True } from '../../../Models/LoaderCheckReducer/LoaderCheckReducer';
import { useState } from 'react';
import { toast } from '../../ToasMessage/ToastManager';
const SurvayContainerMainDivBox = styled.div`
    min-height: 100vh;
    .Survay_Main_Content {
        width: 80%;
        margin: 0 auto;
        margin-top: 30px;
        font-size: 0.9em;
        ul {
            li {
                list-style: decimal;
                margin-bottom: 10px;
            }
        }
        select {
            width: 100%;
            height: 30px;
            margin-bottom: 20px;
            border: 1px solid lightgray;
            border-radius: 5px;
        }
        input {
            width: 100%;
            height: 30px;
            margin-bottom: 20px;
            border: 1px solid lightgray;
            padding-left: 10px;
            border-radius: 5px;
        }
        textarea {
            width: 100%;
            height: 80px;
            margin-bottom: 20px;
            padding: 10px;
            border: 1px solid lightgray;
            border-radius: 5px;
        }
    }
    .Button_Container {
        width: 100%;
        text-align: center;
        height: 40px;
        margin-top: 20px;
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
`;

const SurvayContainer = () => {
    const [TodayFoodState, setTodayFoodState] = useState([]);
    const [SubmitOneClick, setSubmitOneClick] = useState(true);
    const LoginInfo = useSelector(state => state.LoginInfoDataRedux.Infomation);
    const dispatch = useDispatch();

    const [SurvayState, setSurvayState] = useState({
        company: LoginInfo.Login_company ? LoginInfo.Login_company : '',
        name: LoginInfo.Login_name ? LoginInfo.Login_name : '',
        FoodSelect: null,
        opinion: '',
    });

    const GetFromServerWeekFoodMenu = async () => {
        try {
            dispatch(Loader_Check_For_True());
            const ServerWeekFoodMenu = await axios.get(`${process.env.REACT_APP_DB_HOST}/FoodApp/TodayFoodMenu`, {
                params: {
                    start_time: moment().format('YYYY-MM-DD'),
                    Login_id: LoginInfo.Login_id,
                    Login_name: LoginInfo.Login_name,
                },
            });

            if (ServerWeekFoodMenu.data.dataSuccess) {
                setTodayFoodState(ServerWeekFoodMenu.data.SelectBoxsData);

                dispatch(Loader_Check_For_False());
            } else {
                dispatch(Loader_Check_For_False());
            }
        } catch (error) {
            console.log(error);
            dispatch(Loader_Check_For_False());
        }
    };

    const handleChangeData = e => {
        try {
            // console.log(e);
            setSurvayState({ ...SurvayState, FoodSelect: e });
        } catch (error) {
            console.log(error);
        }
    };

    const SaveDataFromSurvay = async () => {
        try {
            if (!SurvayState.company || !SurvayState.opinion || SurvayState.FoodSelect === null) {
                toast.show({
                    title: `????????? ?????? ??????????????????.`,
                    successCheck: false,
                    duration: 6000,
                });
                return;
            }
            setSubmitOneClick(false);

            const SaveDataFromSurvayFromServer = await axios.post(`${process.env.REACT_APP_DB_HOST}/FoodApp/SaveDataFromSurvayFromServer`, {
                SurvayState,
                LoginInfo,
            });

            if (SaveDataFromSurvayFromServer.data.dataSuccess) {
                // toast.show({
                //     title: `????????? ??????????????? ???????????????.`,
                //     successCheck: true,
                //     duration: 6000,
                // });
                alert(`????????? ??????????????? ???????????????.\n${SaveDataFromSurvayFromServer.data.Will}Will??? ?????????????????????.`);
                // toast.show({
                //     title: `${SaveDataFromSurvayFromServer.data.Will}Will??? ?????????????????????.`,
                //     successCheck: true,
                //     duration: 6000,
                // });

                window.location.href = '/Today_Food';
            } else {
                toast.show({
                    title: `Error??????. ?????? ?????? ??? ?????????.`,
                    successCheck: true,
                    duration: 6000,
                });
                setSubmitOneClick(true);
            }
        } catch (error) {
            console.log(error);
            setSubmitOneClick(true);
        }
    };

    useEffect(() => {
        GetFromServerWeekFoodMenu();
    }, []);
    return (
        <SurvayContainerMainDivBox>
            <NavigationMainPage TitleName="????????????"></NavigationMainPage>
            <div className="Survay_Main_Content">
                <div>
                    <ul>
                        <li>
                            <div>????????? ?????? ?????? ???????????? ?????? ???????????????.</div>
                            <div style={{ textAlign: 'end' }}>???, ????????? ?????? ????????? Will??? ???????????????.</div>
                        </li>
                        <li>Will ????????? DHKS,DHK??? ???????????????.</li>
                    </ul>
                </div>
                <div>
                    <select value={SurvayState.company} onChange={e => setSurvayState({ ...SurvayState, company: e.target.value })}>
                        <option value="">????????? ??????????????????.</option>
                        <option value="DHK">DHK</option>
                        <option value="DHKS">DHKS</option>
                        <option value="YIKC">YIKC</option>
                        <option value="EXICON">EXICON</option>
                    </select>
                </div>
                <div>
                    <input value={SurvayState.name} onChange={e => setSurvayState({ ...SurvayState, name: e.target.value })}></input>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <Select
                        value={SurvayState.FoodSelect}
                        onChange={e => handleChangeData(e)}
                        isMulti
                        name="colors"
                        options={TodayFoodState}
                        className="basic-multi-select"
                        classNamePrefix="select"
                    />
                </div>
                <div>
                    <textarea
                        value={SurvayState.opinion}
                        placeholder="????????? ??????"
                        onChange={e => setSurvayState({ ...SurvayState, opinion: e.target.value })}
                    ></textarea>
                </div>
            </div>
            {SubmitOneClick ? (
                <div className="Button_Container">
                    <button onClick={() => SaveDataFromSurvay()}>????????????</button>
                </div>
            ) : (
                <div>-</div>
            )}
        </SurvayContainerMainDivBox>
    );
};

export default SurvayContainer;
