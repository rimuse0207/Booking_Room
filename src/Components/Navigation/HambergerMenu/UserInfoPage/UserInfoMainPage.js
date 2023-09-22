import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { LOGOUT_INFO_DATA_Changes } from '../../../../Models/LoginInfoReducer/LoginInfoReducer';
import { Title_Change_Func } from '../../../../Models/TitleSelectorReducer/TitleSelectorReducer';
import LoginModal from '../../../Modals/LoginModal';
import { cookies } from 'react-cookie';
const UserInfoMainPageMainDivBox = styled.div`
    .MenuList {
        padding: 10px;
        margin-left: 10px;
        margin-right: 10px;
        font-size: 0.8em;
        margin-top: 10px;
        margin-bottom: 20px;
        :hover {
            cursor: pointer;
            background-color: #efefef;
            color: black;
        }
    }
`;

const UserInfoMainPage = () => {
    const dispatch = useDispatch();
    const LoginInfo = useSelector(state => state.LoginInfoDataRedux.Infomation);
    const [LoginModalIsOpen, setLoginModalIsOpen] = useState(false);
    return (
        <UserInfoMainPageMainDivBox>
            {LoginInfo.Login_token ? (
                <div>
                    <div className="">{LoginInfo.Login_company}</div>
                    <div className="">{LoginInfo.Login_name}</div>
                    <div
                        className="MenuList"
                        onClick={() => {
                            dispatch(Title_Change_Func('Company_Room'));
                            dispatch(LOGOUT_INFO_DATA_Changes());
                            cookies.remove('Login_token');
                        }}
                    >
                        로그아웃
                    </div>
                </div>
            ) : (
                <div>
                    <div className="MenuList" onClick={() => setLoginModalIsOpen(true)}>
                        로그인
                    </div>
                    <LoginModal LoginModalIsOpen={LoginModalIsOpen} setLoginModalIsOpen={() => setLoginModalIsOpen(false)}></LoginModal>
                </div>
            )}
        </UserInfoMainPageMainDivBox>
    );
};

export default UserInfoMainPage;
