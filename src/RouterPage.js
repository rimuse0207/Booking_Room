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
import Room from './Components/Rooms/Room';
import CUSTOMERSECURITY from './Components/CUSTOMERSECURITY/Customersecurity';
import OrganChartMainPage from './Components/UserSelect/OrganChart/OrganChartMainPage';
import MailSendingMainPage from './Components/MailSending/MailSendingMainPage';
import DocumentEducation from './Components/DocumentEducation/DocumentEducationMainPage';
import KizukiNotepadMainPage from './Components/KizukiNotepad/KizukiNotepadMainPage';
import KizukiRoomListMainPage from './Components/KizukiNotepad/Kizuki_Room_List/KizukiRoomListMainPage';
import KizukiContentMainPage from './Components/KizukiNotepad/Kizuki_Content/KizukiContentMainPage';
import SelectWeekFoodCount from './Components/FoodSelect/TodayFoodContainer/SelectWeekFoodCount/SelectWeekFoodCount';
import KizukiWriteMainPage from './Components/KizukiNotepad/Kizuki_Write/KizukiWriteMainPage';
import VehicleOperationMainPage from './Components/VehicleOperation/VehicleOperationMainPage';
import CarContact from './Components/Car_Contact/CarContact';
import BreakfastAlert from './Components/BreakFast/Alert/BreakfastAlert';
import VehicleOperationSubmitMainPage from './Components/VehicleOperation/User_Input_Info/VehicleOperationSubmitMainPage';
import PartyPostMainPage from './Components/PartyPost/PartyPostMainPage';
import overseasMainPage from './Components/overseas/overseasMainPage';
import AdminResoucesMainPage from './Components/AdminResources/AdminResourcesMainPage';
import AdminSurvayMainPage from './Components/FoodSelect/SurvayContainer/Admin/AdminSurvayMainPage';
import UserSnakMainPage from './Components/BreakFast/UserSnack/UserSnakMainPage';

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
                        <Route path="/Login_Page" component={LoginMainPage}></Route>
                        {/* 회의실 관련 */}
                        <Route path="/overseas" component={overseasMainPage}></Route>
                        {/* <Route path="/newcar" component={newcarMainPage}></Route> */}
                        <Route path="/Room" component={Room}></Route>
                        <Route path="/CUSTOMERSECURITY" component={CUSTOMERSECURITY}></Route>
                        {/* 해외출장관련 */}
                        <Route exact path="/" component={App}></Route>
                        <Route exact path="/User_Select_or_Add/:UserId/:UserCompany" component={UserManageMainPage}></Route>
                        {/* 식단 관련 */}
                        <Route exact path="/Today_Food" component={TodayFoodContainer}></Route>
                        <Route path="/Today_Food/SelectWeekFoodCount" component={SelectWeekFoodCount}></Route>
                        <Route path="/Food_Select" component={FoodSelectMainPage}></Route>
                        <Route path="/Food_Survay" component={SurvayContainer}></Route>
                        <Route path="/Admin_Image_Check" component={AdminImageShowMainPage}></Route>
                        {/* 조식관련 */}
                        <Route path="/BreakFast/UserSlect" component={UserBreakFastMainPage}></Route>
                        <Route path="/BreakFast/Finished" component={UserApplyFinishedMainPage}></Route>
                        <Route path="/Admin/BreakFast" component={AdminBreakFastMainPage}></Route>
                        {/* 탕비실 관련 */}
                        <Route path="/Snack/UserSlect" component={UserSnakMainPage}></Route>
                        {/* 회계 전표 안내 동영상 */}
                        <Route exact path="/Document_Education" component={DocumentEducation}></Route>
                        {/* 키즈키 노트 */}
                        <Route exact path="/KIZUKI_Notepad" component={KizukiNotepadMainPage}></Route>
                        <Route exact path="/KIZUKI_Notepad/:team_code" component={KizukiRoomListMainPage}></Route>
                        <Route path="/KIZUKI_Notepad_List_Select/:team_code/:kizuki_code" component={KizukiContentMainPage}></Route>
                        <Route path="/KIZUKI_Notepad_Write" component={KizukiWriteMainPage}></Route>
                        {/* PIM 로컬전 */}
                        <Route exact path="/PIM" component={PimMainContainer}></Route>
                        <Route path="/PIM/PIMApplyRoom" component={PimRoomApplyMainContainer}></Route>
                        <Route path="/PIM/RoomEnter/:Room_Keys/:Room_Title" component={PimRoomEnterContainer}></Route>
                        <Route path="/PIM/QRCode/:Room_keys/:Room_Title" component={PimQRCodeMaker}></Route>
                        {/* 자리배치도 */}
                        <Route exact path="/FloorLayout" component={FloorLayoutMainPage}></Route>
                        <Route path="/FloorLayout/AdminChange" component={FloorLayoutAdminMinPage}></Route>
                        {/* 차량운행 */}
                        <Route exact path="/VehicleOperaion" component={VehicleOperationMainPage}></Route>
                        <Route
                            path="/VehicleOperaion/NewVehicleOperation/:company_car_epid"
                            component={VehicleOperationSubmitMainPage}
                        ></Route>
                        <Route path="/VehicleOperaion/NewVehicleOperation" component={VehicleOperationSubmitMainPage}></Route>
                        {/* 당직근무 */}
                        <Route path="/PartyPost" component={PartyPostMainPage}></Route>
                        {/* DHKS 관리자 */}
                        <Route path="/DHKS_Admin_Access_Control_Page" component={AdminResoucesMainPage}></Route>
                        <Route path="/Admin_Week_Survay_Check" component={AdminSurvayMainPage}></Route>
                        {/* 기타 */}
                        <Route path="/Info_Loading/cLCYwLMPxquhcvijjqwoewmqwoi/:id/:date/:company" component={SpamTrainingMainPage}></Route>
                        <Route path="/Users/OrganChart/MainPage/:token/:id/:name" component={OrganChartMainPage}></Route>
                        <Route path="/Defalult_MailSending/:purpose/:period/:person/:time/:count" component={MailSendingMainPage}></Route>
                        <Route
                            path="/cLCYwLMPxquhcvijjqwoewmqwoi/CarContact/cLCYwLMPxquhcvijjqwoewmqwoi/123989aus98zxkqnwmeqnmmbvao/:car_Target_ID/:car_User_ID"
                            component={CarContact}
                        ></Route>
                        <Route
                            path="/BreakFast/cLCYwLMPxquhcvijjqwoewmqwoi/cLCYwLMPxquhcvijjqwoewmqwoi/:Food_Data"
                            component={BreakfastAlert}
                        ></Route>
                    </Switch>
                </BrowserRouter>
            </CookiesProvider>
        </RouterPageMainContainer>
    );
};

export default RouterPage;
