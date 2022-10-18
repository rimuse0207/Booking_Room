import React, { useState } from 'react';
import styled from 'styled-components';
import NavigationMainPage from '../Navigation/NavigationMainPage';
import UserManageTable from './UserManageTable/UserManageTable';
import { FloatingMenu, MainButton, ChildButton } from 'react-floating-button-menu';
import { TiThMenu } from 'react-icons/ti';
import { IoCloseSharp } from 'react-icons/io5';
import { BsPersonPlusFill } from 'react-icons/bs';
import UserAddMainModal from './UserAddModal/UserAddMainModal';

const UserManageMainPageMainDivBox = styled.div`
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
    const [AddUserModalIsOpen, setAddUserModalIsOpen] = useState(false);
    const handleAddUserInfoData = async () => {
        setAddUserModalIsOpen(true);
    };

    return (
        <UserManageMainPageMainDivBox>
            <NavigationMainPage></NavigationMainPage>
            <UserManageTable
                AddUserModalIsOpen={AddUserModalIsOpen}
                setAddUserModalIsOpen={() => setAddUserModalIsOpen(false)}
            ></UserManageTable>
            <div className="FloatingMenu_Container">
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
            </div>
        </UserManageMainPageMainDivBox>
    );
};

export default UserManageMainPage;
