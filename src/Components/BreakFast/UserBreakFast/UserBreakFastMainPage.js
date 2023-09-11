import React from 'react';
import { SurvayContainerMainDivBox } from '../../FoodSelect/SurvayContainer/SurvayContainer';
import NavigationMainPage from '../../Navigation/NavigationMainPage';
import Select from 'react-select';
import styled from 'styled-components';
import { useState } from 'react';
import { BiMinusCircle, BiPlusCircle } from 'react-icons/bi';
import { toast } from '../../ToasMessage/ToastManager';
import { MdDelete } from 'react-icons/md';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Axios_Get_Moduls, Axios_Post_Moduls, request } from '../../../API';
import { useRef } from 'react';

const UserBreakFastMainPageMainDivBox = styled.div`
    border: 1px solid black;
    .Select_Container {
        border: 1px solid lightgray;

        .Select_Container_Lists_Container {
            max-width: 300px;
            text-align: center;
            .Food_Lists_Container {
                border-bottom: 2px solid lightgray;
                margin-bottom: 30px;
                padding-bottom: 30px;
                list-style: none;

                position: relative;
                .Delete_Icons {
                    color: red;
                    position: absolute;
                    top: -20px;
                    right: 30px;
                    :hover {
                        cursor: pointer;
                    }
                }
            }
        }
    }
    .Count_Select_Container {
        display: flex;
        align-items: center;
        justify-content: center;

        button {
            height: 30px;
            width: 50px;
            border: none;
            border-radius: 10px;
            margin-left: 10px;
            margin-right: 10px;
        }
        input {
            width: 100px;
            margin: 0px;
            text-align: center;
            font-weight: bolder;
            font-size: 1em;
            padding: 0px;
        }
    }

    .Word_DIV {
        word-break: keep-all;
        line-height: 20px;
    }
`;

const UserBreakFastMainPage = () => {
    const ScrollFocus = useRef();
    const history = useHistory();
    const LoginInfo = useSelector(state => state.LoginInfoDataRedux.Infomation);
    const [SelectBreakFast, setSelectBreakFast] = useState([]);
    const [BreakFastList, setBreakFastList] = useState([]);
    const [InsertDataState, setInsertDataState] = useState({
        ID: LoginInfo.Login_id,
        name: LoginInfo.Login_name,
        company: LoginInfo.Login_company,
        queries: '',
    });

    const [SubmitOneClickChecking, setSubmitOneClickChecking] = useState(false);

    const HandleFocusOn = () => {
        if (ScrollFocus.current) {
        }
    };

    const handleChangeData = data => {
        try {
            const InsertData = {
                label: data.label,
                value: data.value,
                count: 1,
                image_src: data.image_src,
            };

            setSelectBreakFast(SelectBreakFast.concat(InsertData));
            setBreakFastList(BreakFastList.filter(list => list.value !== data.value));
        } catch (error) {
            console.log(error);
        }
    };
    const handleDeleteLists = data => {
        try {
            const InsertData = {
                label: data.label,
                value: data.value,
                image_src: data.image_src,
            };

            setBreakFastList(BreakFastList.concat(InsertData));
            setSelectBreakFast(SelectBreakFast.filter(list => list.value !== data.value));
        } catch (error) {
            console.log(error);
        }
    };

    const CountMinus = data => {
        try {
            if (data.count - 1 <= 0) {
                toast.show({
                    title: `수량을 0 이하로 하실수 없습니다.`,
                    successCheck: false,
                    duration: 4000,
                });
                return;
            } else {
                setSelectBreakFast(SelectBreakFast.map(list => (list.value === data.value ? { ...list, count: list.count - 1 } : list)));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const CountPlus = data => {
        try {
            if (data.count + 1 >= 10) {
                toast.show({
                    title: `수량을 10 이상 하실수 없습니다.`,
                    successCheck: false,
                    duration: 4000,
                });
                return;
            } else {
                setSelectBreakFast(SelectBreakFast.map(list => (list.value === data.value ? { ...list, count: list.count + 1 } : list)));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const SaveDataFromSurvay = async () => {
        setSubmitOneClickChecking(true);
        try {
            const Send_Select_Food_Data_Axios = await Axios_Post_Moduls(`/FoodApp/SendBreakfastFoodSelect`, {
                InsertDataState,
                SelectBreakFast,
            });

            if (Send_Select_Food_Data_Axios) {
                toast.show({
                    title: `조식신청이 서버에 저장 되었습니다.`,
                    successCheck: true,
                    duration: 6000,
                });
                setSubmitOneClickChecking(false);
                history.push('/BreakFast/Finished');
            }
        } catch (error) {
            console.log(error);
            setSubmitOneClickChecking(false);
        }
    };

    const GetSelect_Food_Data = async () => {
        if (!LoginInfo.Login_id) {
            toast.show({
                title: `로그인을 한 이후에 다시 시도 해주세요.`,
                successCheck: false,
                duration: 6000,
            });
            history.push('/Login_Page');
            return;
        } else if (LoginInfo.Login_company !== 'DHKS') {
            toast.show({
                title: `DHKS 임직원 외에는 취식이 불가합니다.`,
                successCheck: false,
                duration: 6000,
            });
            history.push('/Today_Food');
            return;
        }

        try {
            const GetSelect_Food_Data_Axios = await Axios_Get_Moduls(`/FoodApp/getBreakfastFoodLists`, {});

            if (GetSelect_Food_Data_Axios) {
                setBreakFastList(GetSelect_Food_Data_Axios);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        GetSelect_Food_Data();
    }, []);

    return (
        <UserBreakFastMainPageMainDivBox>
            <SurvayContainerMainDivBox>
                <NavigationMainPage TitleName="조식신청"></NavigationMainPage>
                <div className="Survay_Main_Content">
                    <div>
                        <div>*주의사항</div>
                        <ul>
                            <li>
                                <div className="Word_DIV">조식시간은 08:50 까지 입니다. 시간을 준수 해주세요.</div>
                            </li>
                            <li>
                                <div className="Word_DIV">식사 후 자리정리 및 지정된 장소에 잔반을 처리 해주세요.</div>
                            </li>
                            <li>
                                <div className="Word_DIV">비치된 식품을 식당 외부로 반출을 절대 금지합니다.</div>
                            </li>
                            <li>
                                <div className="Word_DIV">원활한 조식 운영을 위해 1식당 1,000Will이 청구됩니다.</div>
                                <div style={{ textAlign: 'end', color: 'red', marginTop: '20px' }}>
                                    *무단 취식 및 반출시 패널티 부과 예정.
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <input value={LoginInfo.Login_company} readOnly></input>
                    </div>
                    <div>
                        <input value={LoginInfo.Login_name} readOnly></input>
                    </div>

                    <div
                        style={{ marginBottom: '20px' }}
                        onFocus={() => {
                            HandleFocusOn();
                        }}
                    >
                        <Select
                            // value={SurvayState.FoodSelect}
                            onChange={e => handleChangeData(e)}
                            // isMulti
                            name="colors"
                            options={BreakFastList}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            isReadOnly={true}
                            isSearchable={false}
                        />
                    </div>
                    {SelectBreakFast.length > 0 ? (
                        <div className="Select_Container">
                            <h4 style={{ marginLeft: '20px' }}>선택목록</h4>
                            <div className="Select_Container_Lists_Container">
                                <ul style={{ padding: '0px' }}>
                                    {SelectBreakFast.map((list, j) => {
                                        return (
                                            <li className="Food_Lists_Container" key={list.value}>
                                                <div>
                                                    <div className="Delete_Icons" onClick={() => handleDeleteLists(list)}>
                                                        <MdDelete></MdDelete>
                                                    </div>
                                                    <h2>{list.value}</h2>
                                                    <div>
                                                        <img
                                                            src={`${process.env.REACT_APP_DB_HOST}/FoodImages/${list.image_src}`}
                                                            width="100px"
                                                            alt={list.value}
                                                        ></img>
                                                    </div>
                                                    <div>
                                                        <h4>수량</h4>
                                                        <div className="Count_Select_Container">
                                                            <button onClick={() => CountMinus(list)}>
                                                                <BiMinusCircle></BiMinusCircle>
                                                            </button>
                                                            <input type="number" value={list.count}></input>
                                                            <button onClick={() => CountPlus(list)}>
                                                                <BiPlusCircle></BiPlusCircle>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}

                    <div style={{ marginTop: '50px' }} ref={ScrollFocus}>
                        <h4>문의사항</h4>
                        <textarea
                            placeholder="문의사항 또는 건의사항은 작성 부탁드립니다."
                            value={InsertDataState.queries}
                            onChange={e => setInsertDataState({ ...InsertDataState, queries: e.target.value })}
                        ></textarea>
                    </div>
                </div>
                {!SubmitOneClickChecking ? (
                    <div className="Button_Container" style={{ marginBottom: '50px' }}>
                        <button onClick={() => SaveDataFromSurvay()}>등록</button>
                    </div>
                ) : (
                    <div>-</div>
                )}
            </SurvayContainerMainDivBox>
        </UserBreakFastMainPageMainDivBox>
    );
};

export default UserBreakFastMainPage;
