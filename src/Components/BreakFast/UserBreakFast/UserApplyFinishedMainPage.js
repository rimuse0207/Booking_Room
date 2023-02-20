import React from 'react';
import styled from 'styled-components';
import NavigationMainPage from '../../Navigation/NavigationMainPage';
import { request } from '../../../API/index';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';

const UserApplyFinishedMainPageMainDivBox = styled.div`
    .Registered_List_Container {
        display: flex;
        margin-top: 30px;
        margin-bottom: 30px;
        padding: 10px;
        border-bottom: 1px solid lightgray;
        position: relative;
        .Registered_List_Title {
            flex-flow: column;
            display: flex;
            justify-content: space-around;
            margin-left: 10px;
        }
        .Update_Icons {
            position: absolute;
            top: 10px;
            right: 40px;
            color: green;
            :hover {
                cursor: pointer;
            }
        }
    }
`;

const UserApplyFinishedMainPage = () => {
    const LoginInfo = useSelector(state => state.LoginInfoDataRedux.Infomation);
    const [Apply_Lists, setApply_Lists] = useState([]);
    const getToday_BreakFast_Data = async () => {
        try {
            const getToday_BreakFast_Data_Axios = await request.get(`/FoodApp/Finished_Apply_Now_Data`, {
                params: {
                    ID: LoginInfo.Login_id,
                },
            });

            if (getToday_BreakFast_Data_Axios.data.dataSuccess) {
                setApply_Lists(getToday_BreakFast_Data_Axios.data.Finished_Apply_Now_Data_Rows);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getToday_BreakFast_Data();
    }, []);

    return (
        <UserApplyFinishedMainPageMainDivBox>
            <NavigationMainPage TitleName="금일 조식신청 현황"></NavigationMainPage>
            <div>
                {Apply_Lists.map((list, j) => {
                    return (
                        <div
                            className="Registered_List_Container"
                            key={`${list.breakfast_user_count_info_food_name}_${list.breakfast_user_count_info_update_date}`}
                        >
                            <div>{j + 1} </div>
                            <div>
                                <img
                                    src={`${process.env.REACT_APP_DB_HOST}/FoodImages/${list.breakfast_info_image_src}`}
                                    width="150px"
                                    alt={list.breakfast_user_count_info_food_name}
                                ></img>
                            </div>
                            <div className="Registered_List_Title">
                                <h4>{list.breakfast_user_count_info_food_name}</h4>
                                <h4>신청 수량 : {list.breakfast_user_count_info_eating_count} 개</h4>
                                <div>{list.breakfast_user_count_info_eating_date}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </UserApplyFinishedMainPageMainDivBox>
    );
};

export default UserApplyFinishedMainPage;
