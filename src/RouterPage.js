import React from 'react';
import styled from 'styled-components';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import LoginMainPage from './Components/LoginPage/LoginMainPage';
import UserManageMainPage from './Components/UserManage/UserManageMainPage';

const RouterPageMainContainer = styled.div``;

const RouterPage = () => {
    return (
        <RouterPageMainContainer>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={App}></Route>
                    <Route path="/Login_Page" component={LoginMainPage}></Route>
                    <Route path="/User_Select_or_Add/:UserId/:UserCompany" component={UserManageMainPage}></Route>
                </Switch>
            </BrowserRouter>
        </RouterPageMainContainer>
    );
};

export default RouterPage;
