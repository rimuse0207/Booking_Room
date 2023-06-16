import React, { useEffect } from 'react';
import styled from 'styled-components';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import LoginMainPage from './Components/LoginPage/LoginMainPage';
import UserManageMainPage from './Components/UserManage/UserManageMainPage';
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
import PimQRCodeMaker from './Components/PIM/PimQRCodeMaker/PimQRCodeMaker';
import UserBreakFastMainPage from './Components/BreakFast/UserBreakFast/UserBreakFastMainPage';
import AdminBreakFastMainPage from './Components/BreakFast/AdminBreakFast/AdminBreakFastMainPage';
import UserApplyFinishedMainPage from './Components/BreakFast/UserBreakFast/UserApplyFinishedMainPage';
import FloorLayoutMainPage from './Components/FloorLayout/FloorLayoutMainPage';
import { request } from './API';
import FloorLayoutAdminMinPage from './Components/FloorLayout/FloorLayoutAdminMainPage';
import { CookiesProvider } from 'react-cookie';
import SpamTrainingMainPage from './Components/SpamTraining/SpamTrainingMainPage';
import OrganChartMainPage from './Components/UserSelect/OrganChart/OrganChartMainPage';
import MailSendingMainPage from './Components/MailSending/MailSendingMainPage';
import KizukiNotepadMainPage from './Components/KizukiNotepad/KizukiNotepadMainPage';
import KizukiRoomListMainPage from './Components/KizukiNotepad/Kizuki_Room_List/KizukiRoomListMainPage';
import KizukiContentMainPage from './Components/KizukiNotepad/Kizuki_Content/KizukiContentMainPage';
import SelectWeekFoodCount from './Components/FoodSelect/TodayFoodContainer/SelectWeekFoodCount/SelectWeekFoodCount';
import KizukiWriteMainPage from './Components/KizukiNotepad/Kizuki_Write/KizukiWriteMainPage';

const RouterPageMainContainer = styled.div``;

const RouterPage = () => {
    const LoginInfo = useSelector(state => state.LoginInfoDataRedux.Infomation);
    const dispatch = useDispatch();

    const TokenCheckFromServer = async () => {
        try {
            const TokenCheckFromServerVerify = await request.post(`${process.env.REACT_APP_DB_HOST}/users/Token_Checking_Router`, {
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

    useEffect(() => {
        if (LoginInfo.Login_token) TokenCheckFromServer();
    }, [LoginInfo]);

    return (
        <RouterPageMainContainer>
            <CookiesProvider>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={App}></Route>
                        <Route path="/Login_Page" component={LoginMainPage}></Route>
                        <Route exact path="/User_Select_or_Add/:UserId/:UserCompany" component={UserManageMainPage}></Route>
                        <Route exact path="/Today_Food" component={TodayFoodContainer}></Route>
                        <Route path="/Today_Food/SelectWeekFoodCount" component={SelectWeekFoodCount}></Route>
                        <Route path="/Food_Select" component={FoodSelectMainPage}></Route>
                        <Route path="/Food_Survay" component={SurvayContainer}></Route>
                        <Route path="/Admin_Image_Check" component={AdminImageShowMainPage}></Route>
                        <Route exact path="/KIZUKI_Notepad" component={KizukiNotepadMainPage} ></Route>
                        <Route exact path="/KIZUKI_Notepad/:team_code" component={KizukiRoomListMainPage} ></Route>
                        <Route path="/KIZUKI_Notepad_List_Select/:team_code/:kizuki_code" component={KizukiContentMainPage} ></Route>
                        <Route path="/KIZUKI_Notepad_Write" component={KizukiWriteMainPage}></Route>
                        <Route exact path="/PIM" component={PimMainContainer}></Route>
                        <Route path="/PIM/PIMApplyRoom" component={PimRoomApplyMainContainer}></Route>
                        <Route path="/PIM/RoomEnter/:Room_Keys/:Room_Title" component={PimRoomEnterContainer}></Route>
                        <Route path="/PIM/QRCode/:Room_keys/:Room_Title" component={PimQRCodeMaker}></Route>
                        <Route path="/BreakFast/UserSlect" component={UserBreakFastMainPage}></Route>
                        <Route path="/BreakFast/Finished" component={UserApplyFinishedMainPage}></Route>
                        <Route path="/Admin/BreakFast" component={AdminBreakFastMainPage}></Route>
                        <Route exact path="/FloorLayout" component={FloorLayoutMainPage}></Route>
                        <Route path="/FloorLayout/AdminChange" component={FloorLayoutAdminMinPage}></Route>
                        <Route path="/Info_Loading/cLCYwLMPxquhcvijjqwoewmqwoi/:id/:date/:company" component={SpamTrainingMainPage}></Route>
                        <Route path='/Users/OrganChart/MainPage/:token/:id/:name' component={OrganChartMainPage}></Route>
                        <Route path='/Defalult_MailSending/:purpose/:period/:person/:time/:count' component={MailSendingMainPage}></Route>
                    </Switch>
                </BrowserRouter>
            </CookiesProvider>
        </RouterPageMainContainer>
    );
};

export default RouterPage;
