import React from 'react';
import styled from 'styled-components';
import NavigationMainPage from '../Navigation/NavigationMainPage';
import PimRoomList from './PimRoomList/PimRoomList';

const PimMainContainerMainDivBox = styled.div`
    .Container {
        max-width: 80%;
        margin: 0 auto;
        @media only screen and (max-width: 800px) {
            max-width: 100%;
            margin: 0;
        }
    }
    .List_Move_Container {
        display: flex;
        align-items: center;
        .List_Move {
            :hover {
                cursor: pointer;
                color: darkgray;
            }
        }
        .List_Move_Advance {
            margin-left: 40px;
            ul {
                li {
                    list-style: disc;
                }
            }
        }
    }
`;

const PimMainContainer = () => {
    return (
        <PimMainContainerMainDivBox>
            <NavigationMainPage TitleName="PIM 로컬전 목록"></NavigationMainPage>
            <div className="Container">
                <PimRoomList></PimRoomList>
            </div>
        </PimMainContainerMainDivBox>
    );
};

export default PimMainContainer;
