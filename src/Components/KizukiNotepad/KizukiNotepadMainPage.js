import React from 'react';
import styled from 'styled-components';
import NavigationMainPage from '../Navigation/NavigationMainPage';
import TeamRoomListMainPage from './Team_Room_List/TeamRoomListMainPage';

const KizukiNotepadMainPageMainDivBox = styled.div`
    
`

const KizukiNotepadMainPage = () => {
    return (
        <KizukiNotepadMainPageMainDivBox>
            <NavigationMainPage TitleName="KIZUKI 노트"></NavigationMainPage>
            <div>
                <TeamRoomListMainPage></TeamRoomListMainPage>
            </div>
        </KizukiNotepadMainPageMainDivBox>
    )
}

export default KizukiNotepadMainPage;