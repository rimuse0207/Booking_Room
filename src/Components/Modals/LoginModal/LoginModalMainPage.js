import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { LOGIN_INFO_DATA_Changes } from '../../../Models/LoginInfoReducer/LoginInfoReducer';
import { toast } from '../../ToasMessage/ToastManager';

const LoginModalMainPageMainDivBox = styled.div`
    background-color: #efefef;
    font-size: 1.6rem;
    font-family: 'Open Sans', sans-serif;
    color: #2b3e51;
    height: 100%;
    padding-top: 10px;
    border-radius: 5px;
    h2 {
        font-weight: 300;
        text-align: center;
    }

    p {
        position: relative;
    }

    a,
    a:link,
    a:visited,
    a:active {
        color: #3ca9e2;
        -webkit-transition: all 0.2s ease;
        transition: all 0.2s ease;
    }
    a:focus,
    a:hover,
    a:link:focus,
    a:link:hover,
    a:visited:focus,
    a:visited:hover,
    a:active:focus,
    a:active:hover {
        color: #329dd5;
        -webkit-transition: all 0.2s ease;
        transition: all 0.2s ease;
    }

    #login-form-wrap {
        background-color: #fff;
        width: 35%;
        margin: 30px auto;
        text-align: center;
        padding: 20px 0 0 0;
        border-radius: 4px;
        box-shadow: 0px 30px 50px 0px rgba(0, 0, 0, 0.2);
        height: 90%;
        border-radius: 5px;
    }

    #login-form {
        padding: 0 60px;
    }

    input {
        display: block;
        box-sizing: border-box;
        width: 100%;
        outline: none;
        height: 60px;
        line-height: 60px;
        border-radius: 4px;
    }

    input[type='password'],
    input[type='email'] {
        width: 100%;
        padding: 0 0 0 10px;
        margin: 0;
        color: #8a8b8e;
        border: 1px solid #c2c0ca;
        font-style: normal;
        font-size: 16px;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        position: relative;
        display: inline-block;
        background: none;
    }
    input[type='password']:focus,
    input[type='email']:focus {
        border-color: #3ca9e2;
    }
    input[type='password']:focus:invalid,
    input[type='email']:focus:invalid {
        color: #cc1e2b;
        border-color: #cc1e2b;
    }
    input[type='password']:valid ~ .validation,
    input[type='email']:valid ~ .validation {
        display: block;
        border-color: #0c0;
    }
    input[type='password']:valid ~ .validation span,
    input[type='email']:valid ~ .validation span {
        background: #0c0;
        position: absolute;
        border-radius: 6px;
    }
    input[type='password']:valid ~ .validation span:first-child,
    input[type='email']:valid ~ .validation span:first-child {
        top: 30px;
        left: 14px;
        width: 20px;
        height: 3px;
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
    }
    input[type='password']:valid ~ .validation span:last-child,
    input[type='email']:valid ~ .validation span:last-child {
        top: 35px;
        left: 8px;
        width: 11px;
        height: 3px;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
    }

    .validation {
        display: none;
        position: absolute;
        content: ' ';
        height: 60px;
        width: 30px;
        right: 15px;
        top: 0px;
    }

    input[type='submit'] {
        border: none;
        display: block;
        background-color: #3ca9e2;
        color: #fff;
        font-weight: bold;
        text-transform: uppercase;
        cursor: pointer;
        -webkit-transition: all 0.2s ease;
        transition: all 0.2s ease;
        font-size: 18px;
        position: relative;
        display: inline-block;
        cursor: pointer;
        text-align: center;
    }
    input[type='submit']:hover {
        background-color: #329dd5;
        -webkit-transition: all 0.2s ease;
        transition: all 0.2s ease;
    }

    #create-account-wrap {
        background-color: #eeedf1;
        color: #8a8b8e;
        font-size: 14px;
        width: 100%;
        padding: 10px 0;
        border-radius: 0 0 4px 4px;
    }
`;

const LoginModalMainPage = () => {
    const dispatch = useDispatch();
    const [LoginInfoData, setLoginInfoData] = useState({
        ID: '',
        PW: '',
    });

    const HandleSubmitLogin = async e => {
        e.preventDefault();

        const CheckingLoginFromServer = await axios.post(`http://192.168.2.155:3003/users/Rooms_Booking_Login_Router`, {
            LoginInfoData,
        });

        if (CheckingLoginFromServer.data.dataSuccess) {
            if (!CheckingLoginFromServer.data.PasswordChange) {
                //로그인 성공
                console.log(CheckingLoginFromServer.data.Getting_Brity_Works_User_Info_Rows[0]);
                const datas = {
                    Login_id: CheckingLoginFromServer.data.Getting_Brity_Works_User_Info_Rows[0].brity_works_user_info_id,
                    Login_name: CheckingLoginFromServer.data.Getting_Brity_Works_User_Info_Rows[0].brity_works_user_info_name,
                    Login_company: CheckingLoginFromServer.data.Getting_Brity_Works_User_Info_Rows[0].brity_works_user_info_company,
                    Login_epid: CheckingLoginFromServer.data.Getting_Brity_Works_User_Info_Rows[0].brity_works_user_info_epid,
                    Login_epid_id: CheckingLoginFromServer.data.Getting_Brity_Works_User_Info_Rows[0].brity_works_user_info_epid_id,
                    Login_token: CheckingLoginFromServer.data.Getting_Brity_Works_User_Info_Rows[0].brity_works_user_info_token,
                };
                dispatch(LOGIN_INFO_DATA_Changes(datas));
            } else {
                //비밀번호 변경 요청
                toast.show({
                    title: `초기비밀번호입니다. 비밀번호를 변경 해주세요.`,
                    successCheck: false,
                    duration: 6000,
                });
            }
        } else {
            toast.show({
                title: `아이디 및 비밀번호가 다릅니다. 다시 시도해주세요. `,
                successCheck: false,
                duration: 6000,
            });
        }
    };

    return (
        <LoginModalMainPageMainDivBox>
            <div id="login-form-wrap" onSubmit={e => HandleSubmitLogin(e)}>
                <h2>Login</h2>
                <form id="login-form">
                    <p>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email Address"
                            value={LoginInfoData.ID}
                            onChange={e => setLoginInfoData({ ...LoginInfoData, ID: e.target.value })}
                            required
                        />
                        <i className="validation">
                            <span></span>
                            <span></span>
                        </i>
                    </p>
                    <p>
                        <input
                            type="password"
                            id="username"
                            name="username"
                            placeholder="Password"
                            value={LoginInfoData.PW}
                            onChange={e => setLoginInfoData({ ...LoginInfoData, PW: e.target.value })}
                            required
                        />
                        <i className="validation">
                            <span></span>
                            <span></span>
                        </i>
                    </p>
                    <p>
                        <input type="submit" id="login" value="Login" />
                    </p>
                    <span>
                        <div style={{ fontSize: '0.5em', textAlign: 'end' }}>*기타 문의사항은 DHKS IT팀에 문의바랍니다.</div>
                    </span>
                </form>
            </div>
        </LoginModalMainPageMainDivBox>
    );
};

export default LoginModalMainPage;
