import React, { useState } from 'react';
import styled from 'styled-components';
import NavigationMainPage from '../Navigation/NavigationMainPage';
import UserManageTable from './UserManageTable/UserManageTable';
import { FloatingMenu, MainButton, ChildButton } from 'react-floating-button-menu';
import { TiThMenu } from 'react-icons/ti';
import { IoCloseSharp } from 'react-icons/io5';
import { BsPersonPlusFill } from 'react-icons/bs';
import UserAddMainModal from './UserAddModal/UserAddMainModal';
import UserLoginCheck from './UserManageTable/UserLoginCheck';

const UserManageMainPageMainDivBox = styled.div`
.Nav_Menu_Container {
        display: flex;
        max-width: 400px;
        min-height: 50px;
        justify-content: space-between;
        align-items: center;
        padding-left: 10px;
        padding-right: 10px;

        .Not_Checked_Show {
            opacity: 0.5;
        }

        li {
            width: 30%;
            border-bottom: 2px solid #368;
            text-align: center;
            padding: 10px;
            font-size: 1.1em;
            :hover {
                cursor: pointer;
            }
        }
    }

    .FloatingMenu_Container {
        position: fixed;
        bottom: 30px;
        right: 50px;
        z-index: 10;
        a,
        li {
            background-color: #fff;
        }
    }
`;

const UserManageMainPage = () => {
    const [FloatingMenuOnCheck, setFloatingMenuOnCheck] = useState(true);
    
     const [Admin_Nav_Menu, setAdmin_Nav_Menu] = useState([
        {
            Nav_Menu: '사용자 조회',
            Nav_Access: true,
        },
        {
            Nav_Menu: '사용자 추가',
            Nav_Access: false,
        },
        {
            Nav_Menu: '로그인 확인',
            Nav_Access: false,
        },
    ]);
    const handleMoveToMenu = data => {
        setAdmin_Nav_Menu(
            Admin_Nav_Menu.map(list => (list.Nav_Menu === data.Nav_Menu ? { ...list, Nav_Access: true } : { ...list, Nav_Access: false }))
        );
    };
    // const handleAddUserInfoData = async () => {
    //     setAddUserModalIsOpen(true);
    // };

    return (
        <UserManageMainPageMainDivBox>
            <NavigationMainPage></NavigationMainPage>
              <ul className="Nav_Menu_Container">
                {Admin_Nav_Menu.map(list => {
                    return (
                        <li
                            key={list.Nav_Menu}
                            className={list.Nav_Access ? '' : 'Not_Checked_Show'}
                            onClick={() => handleMoveToMenu(list)}
                        >
                            <div>{list.Nav_Menu}</div>
                        </li>
                    );
                })}
            </ul>
            {Admin_Nav_Menu.map((list, i) => {
                return list.Nav_Access && list.Nav_Menu === '사용자 조회' ? (
                 <UserManageTable
                    key={list.Nav_Menu}
                    // AddUserModalIsOpen={AddUserModalIsOpen}
                    // setAddUserModalIsOpen={() => setAddUserModalIsOpen(false)}
                ></UserManageTable>
                ) : list.Nav_Access && list.Nav_Menu === '사용자 추가' ? (
                    <UserAddMainModal key={list.Nav_Menu}></UserAddMainModal>
                )  : list.Nav_Access && list.Nav_Menu === '로그인 확인' ? (
                    <UserLoginCheck key={list.Nav_Menu}></UserLoginCheck>
                ) : (
                    <div key={list.Nav_Menu}></div>
                );
            })}
            
            {/* <div className="FloatingMenu_Container">
                <FloatingMenu slideSpeed={500} direction="up" spacing={8} isOpen={FloatingMenuOnCheck}>
                    <MainButton
                        iconResting={<TiThMenu style={{ fontSize: 20 }} nativeColor="black" color="black" />}
                        iconActive={<IoCloseSharp style={{ fontSize: 20 }} nativeColor="black" color="black" />}
                        backgroundColor="black"
                        onClick={() => setFloatingMenuOnCheck(!FloatingMenuOnCheck)}
                        size={56}
                    ></MainButton>
                    <ChildButton
                        icon={<BsPersonPlusFill style={{ fontSize: 20 }} nativeColor="black" />}
                        backgroundColor="white"
                        size={40}
                        onClick={() => handleAddUserInfoData()}
                    />
                </FloatingMenu>
            </div> */}
        </UserManageMainPageMainDivBox>
    );
};

export default UserManageMainPage;
