import React from 'react';
import styled from 'styled-components';
import NavigationMainPage from '../Navigation/NavigationMainPage';
import TeamRoomListMainPage from './Team_Room_List/TeamRoomListMainPage';

const KizukiNotepadMainPageMainDivBox = styled.div``;

const DocumentEducationMainPage = () => {
    return (
        <KizukiNotepadMainPageMainDivBox>
            <NavigationMainPage TitleName="DHKS 회계 전표 작성 안내 동영상"></NavigationMainPage>
            <div>
                <TeamRoomListMainPage></TeamRoomListMainPage>
            </div>
        </KizukiNotepadMainPageMainDivBox>
    );
};

export default DocumentEducationMainPage;
