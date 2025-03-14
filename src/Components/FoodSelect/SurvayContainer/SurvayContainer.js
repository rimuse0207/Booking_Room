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
import { Axios_Post_Moduls, request } from '../../../API';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
export const SurvayContainerMainDivBox = styled.div`
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
        .Description_Explain_Container {
            margin-bottom: 20px;
        }
        .Select_Title {
            margin-bottom: 10px;
            strong {
                font-size: 1em;
            }
            span {
                font-size: 0.8em;
                color: gray;
                margin-left: 10px;
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
    const dispatch = useDispatch();
    const history = useHistory();
    const [TodayFoodState, setTodayFoodState] = useState([]);
    const [SubmitOneClick, setSubmitOneClick] = useState(true);
    const LoginInfo = useSelector(state => state.LoginInfoDataRedux.Infomation);

    const [SurvayState, setSurvayState] = useState({
        company: LoginInfo.Login_company ? LoginInfo.Login_company : '',
        name: LoginInfo.Login_name ? LoginInfo.Login_name : '',
        FoodSelect: null,
        opinion: '',
    });

    const GetFromServerWeekFoodMenu = async () => {
        try {
            dispatch(Loader_Check_For_True());
            const ServerWeekFoodMenu = await request.get(`/FoodApp/TodayFoodMenu`, {
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
            if (!SurvayState.opinion || SurvayState.FoodSelect === null) {
                toast.show({
                    title: `공란을 전부 작성바랍니다.`,
                    successCheck: false,
                    duration: 6000,
                });
                return;
            }
            setSubmitOneClick(false);
            const SaveDataFromSurvayFromServer = await Axios_Post_Moduls(`/FoodApp/SaveDataFromSurvayFromServer`, {
                SurvayState,
                LoginInfo,
            });

            if (SaveDataFromSurvayFromServer) {
                alert(`설문에 응해주셔서 감사합니다.`);

                history.push('/Today_Food');
            } else {
                toast.show({
                    title: `Error발생. 다시 시도 해 주세요.`,
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
            <NavigationMainPage TitleName="설문조사"></NavigationMainPage>
            <div className="Survay_Main_Content">
                <div className="Description_Explain_Container">
                    <ul>
                        <li>보다 나은 식당 및 식사 운영의 대한 의견수집용으로만 사용중에 있습니다.</li>
                        <li>모든 데이터는 무기명으로 관리되고 있습니다.</li>
                    </ul>
                </div>
                {/* <div>
                    <select value={SurvayState.company} onChange={e => setSurvayState({ ...SurvayState, company: e.target.value })}>
                        <option value="">회사를 선택해주세요.</option>
                        <option value="DHK">DHK</option>
                        <option value="DHKS">DHKS</option>
                        <option value="YIKC">YIKC</option>
                        <option value="EXICON">EXICON</option>
                    </select>
                </div> */}
                {/* <div>
                    <input value={SurvayState.name} onChange={e => setSurvayState({ ...SurvayState, name: e.target.value })}></input>
                </div> */}
                <div className="Select_Title">
                    <strong>메뉴선택</strong>
                    <span>( 중복선택 가능 )</span>
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
                <div className="Select_Title">
                    <strong>의견</strong>
                </div>
                <div>
                    <textarea
                        value={SurvayState.opinion}
                        placeholder="식당과 식사에 대해 자유롭게 의견을 적어주세요."
                        onChange={e => setSurvayState({ ...SurvayState, opinion: e.target.value })}
                    ></textarea>
                </div>
            </div>
            {SubmitOneClick ? (
                <div className="Button_Container">
                    <button onClick={() => SaveDataFromSurvay()}>제출하기</button>
                </div>
            ) : (
                <div>-</div>
            )}
        </SurvayContainerMainDivBox>
    );
};

export default SurvayContainer;
