import React, { useEffect } from 'react';
import styled from 'styled-components';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import LoginMainPage from './Components/LoginPage/LoginMainPage';
import UserManageMainPage from './Components/UserManage/UserManageMainPage';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from './Components/ToasMessage/ToastManager';
import { Title_Change_Func } from './Models/TitleSelectorReducer/TitleSelectorReducer';
import { LOGOUT_INFO_DATA_Changes } from './Models/LoginInfoReducer/LoginInfoReducer';
import FoodSelectMainPage from './Components/FoodSelect/FoodSelectMainPage';
import TodayFoodContainer from './Components/FoodSelect/TodayFoodContainer/TodayFoodContainer';
import SurvayContainer from './Components/FoodSelect/SurvayContainer/SurvayContainer';
import AdminImageShowMainPage from './Components/FoodSelect/AdminMainPage/AdminImageShowMainPage';
import PimMainContainer from './Components/PIM/PimMainContainer';
import PimRoomApplyMainContainer from './Components/PIM/PimRoomApplyContainer/PimRoomApplyMainContainer';
import PimRoomEnterContainer from './Components/PIM/PimRoomEnter/PimRoomEnterContainer';
const RouterPageMainContainer = styled.div``;

const RouterPage = () => {
    const LoginInfo = useSelector(state => state.LoginInfoDataRedux.Infomation);
    const dispatch = useDispatch();
    useEffect(() => {
        if (LoginInfo.Login_token) TokenCheckFromServer();
    }, [LoginInfo]);

    const TokenCheckFromServer = async () => {
        try {
            const TokenCheckFromServerVerify = await axios.post(`${process.env.REACT_APP_DB_HOST}/users/Token_Checking_Router`, {
                token: LoginInfo.Login_token,
            });

            if (TokenCheckFromServerVerify.data.dataSuccess) {
            } else {
                dispatch(Title_Change_Func('Company_Room'));
                dispatch(LOGOUT_INFO_DATA_Changes());
                toast.show({
                    title: `로그인 유지기간이 만료되어 로그아웃 됩니다.`,
                    successCheck: false,
                    duration: 6000,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <RouterPageMainContainer>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={App}></Route>
                    <Route path="/Login_Page" component={LoginMainPage}></Route>
                    <Route path="/User_Select_or_Add/:UserId/:UserCompany" component={UserManageMainPage}></Route>
                    <Route path="/Today_Food" component={TodayFoodContainer}></Route>
                    <Route path="/Food_Select" component={FoodSelectMainPage}></Route>
                    <Route path="/Food_Survay" component={SurvayContainer}></Route>
                    <Route path="/Admin_Image_Check" component={AdminImageShowMainPage}></Route>
                    <Route exact path="/PIM" component={PimMainContainer}></Route>
                    <Route path="/PIM/PIMApplyRoom" component={PimRoomApplyMainContainer}></Route>
                    <Route path="/PIM/RoomEnter/:Room_Keys/:Room_Title" component={PimRoomEnterContainer}></Route>
                </Switch>
            </BrowserRouter>
        </RouterPageMainContainer>
    );
};

export default RouterPage;
