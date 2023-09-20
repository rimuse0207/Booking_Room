import React from 'react';
import styled from 'styled-components';
import NavigationMainPage from '../Navigation/NavigationMainPage';
import ContainerMainPage from './Container/ContainerMainPage';

const AdminResoucesMainPageMainDivBox = styled.div``;

const AdminResoucesMainPage = () => {
    return (
        <AdminResoucesMainPageMainDivBox>
            <NavigationMainPage TitleName="회의실 관리"></NavigationMainPage>
            <ContainerMainPage></ContainerMainPage>
        </AdminResoucesMainPageMainDivBox>
    );
};

export default AdminResoucesMainPage;
