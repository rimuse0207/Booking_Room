import React, { useState, useMemo, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/ko';
import { request } from '../../../../API';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { Party_Post_State_Change_Func } from '../../../../Models/PartyPostReducer/PartyPostReducer';

export const InfoBoxMainPageMainDivBox = styled.div`
    border: 1px solid gray;
    border-top: 2px solid gray;
    padding: 20px;
    line-height: 30px;
    border-radius: 10px;
    margin-bottom: 50px;
    background-color: #fff;
    h3 {
        margin-top: 5px;
    }
    .Box_Container {
        padding-left: 40px;
        h4 {
            margin-bottom: 0px;
        }
        .Input_Container {
            padding-left: 40px;
            input {
                border: 2px solid #ccc;
                padding-left: 15px;
                max-width: 80%;
                width: 100%;
                height: 40px;
                border-radius: 5px;
                outline: none;
                background-color: #f2f2f2;
                :focus {
                    border-color: #007bff;
                    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
                }
            }
            textarea {
                background-color: #f2f2f2;
                border: 2px solid #ccc;
                padding: 10px;
                border-radius: 5px;
                scrollbar-width: thin;
                scrollbar-color: #ccc #f2f2f2;
                width: 100%;
                max-width: 80%;
                min-height: 150px;
                height: auto;
                resize: vertical;
                line-height: 2;
                :focus {
                    border-color: #007bff;
                    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
                }
            }
        }
    }
    .basic-single {
        border: 2px solid #ccc;
        max-width: 80%;
        width: 100%;
        height: 60px;
        border-radius: 5px;
        outline: none;
        background-color: #f2f2f2;
        .Select_Input_Container {
            width: 100%;
            height: 100%;
        }
        .Select_Input_Container__input-container {
            display: block !important;
        }
        .Select_Input_Container__control {
            height: 100%;
        }
        .Select_Input_Container__input {
            padding-left: 20px;
        }
    }
`;

const InfoBoxMainPage = () => {
    const dispatch = useDispatch();
    const Party_Post_State = useSelector(state => state.PartyPostReduce.Party_Post_State);
    const [User_Option, setUser_Options] = useState([]);
    // const [Select_User, serSelect_User] = useState(null);

    const handle_Change_User = e => {
        dispatch(Party_Post_State_Change_Func({ ...Party_Post_State, Info_State: { ...Party_Post_State.Info_State, Select_User: e } }));
    };

    const User_Select_Options_State_Func = async () => {
        try {
            const User_Select_Options_State_Axios = await request.get('/DepartmentRouter/Semtek_Select_UserInfoDataGetting');

            if (User_Select_Options_State_Axios.data.dataSuccess) {
                setUser_Options(User_Select_Options_State_Axios.data.Select_User_datas);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        User_Select_Options_State_Func();
    }, []);

    return (
        <InfoBoxMainPageMainDivBox>
            <h3>1. 당직 일자 및 당직자</h3>
            <div className="Box_Container">
                <div>
                    <h4>당직 일자 </h4>
                    <div className="Input_Container">
                        <input value={moment().locale('ko').format('YYYY년 MM월 DD일 (dddd)')}></input>
                    </div>
                </div>
                <div>
                    <h4>당직자 </h4>
                    <div className="Input_Container">
                        {/* <input value={moment().format('YYYY년 MM월 DD일 (e요일)')}></input> */}
                        <Select
                            className="basic-single"
                            classNamePrefix="Select_Input_Container"
                            placeholder="이름 또는 이메일 검색..."
                            isClearable={true}
                            isSearchable={true}
                            name="User_Search"
                            options={User_Option}
                            onChange={e => handle_Change_User(e)}
                            value={Party_Post_State.Info_State.Select_User}
                        />
                    </div>
                </div>
            </div>
        </InfoBoxMainPageMainDivBox>
    );
};

export default InfoBoxMainPage;
