import React from 'react';
import NavigationMainPage from '../../../Navigation/NavigationMainPage';
import FoodWeekSurvayContainer from './Container/FoodWeekSurvayContainer';

const AdminSurvayMainPage = () => {
    return (
        <div>
            <NavigationMainPage TitleName="식단 설문확인"></NavigationMainPage>
            <FoodWeekSurvayContainer></FoodWeekSurvayContainer>
        </div>
    );
};

export default AdminSurvayMainPage;
