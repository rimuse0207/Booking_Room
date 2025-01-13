import React from 'react';
import styled from 'styled-components';
import NavigationMainPage from '../Navigation/NavigationMainPage';
import DocumentEducationListMainPage from './Team_Room_List/DocumentEducationListMainPage';

const KizukiNotepadMainPageMainDivBox = styled.div``;

const DocumentEducationMainPage = () => {
    return (
        <KizukiNotepadMainPageMainDivBox>
            <NavigationMainPage TitleName="DHKS 회계 전표 작성 안내 동영상"></NavigationMainPage>
            <div>
                <DocumentEducationListMainPage></DocumentEducationListMainPage>
            </div>
        </KizukiNotepadMainPageMainDivBox>
    );
};

export default DocumentEducationMainPage;
