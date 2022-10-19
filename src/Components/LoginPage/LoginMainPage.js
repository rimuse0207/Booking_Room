import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { LOGIN_INFO_DATA_Changes } from '../../Models/LoginInfoReducer/LoginInfoReducer';
import { toast } from '../ToasMessage/ToastManager';
import { useHistory } from 'react-router-dom';
const LoginMainPageMainDivBox = styled.div`
    background-color: #efefef;
    font-size: 1.6rem;
    font-family: 'Open Sans', sans-serif;
    color: #2b3e51;
    padding-top: 10px;
    border-radius: 5px;
    min-height: 100vh;
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
        padding-bottom: 70px;
        @media only screen and (max-width: 800px) {
            width: 100%;
        }
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

const LoginMainPage = () => {
    const Login_ID_Focus = useRef(null);
    const Login_Password_Focus = useRef(null);

    const New_Password_Focus = useRef(null);
    const New_Password_Check_Focus = useRef(null);

    const history = useHistory();
    const dispatch = useDispatch();
    const [LoginInfoData, setLoginInfoData] = useState({
        ID: '',
        PW: '',
    });

    const [PasswordChangeData, setPasswordChangeData] = useState({
        ID: '',
        New_PW: '',
        New_PW_Check: '',
    });

    const [Login_Password_Change_State, setLogin_Password_Change_State] = useState(false);

    useEffect(() => {
        Login_ID_Focus_Func();
    }, []);

    const HandleSubmitLogin = async e => {
        e.preventDefault();

        try {
            const CheckingLoginFromServer = await axios.post(`${process.env.REACT_APP_DB_HOST}/users/Rooms_Booking_Login_Router`, {
                LoginInfoData,
            });

            if (CheckingLoginFromServer.data.dataSuccess) {
                if (!CheckingLoginFromServer.data.PasswordChange) {
                    //로그인 성공
                    const datas = {
                        Login_id: CheckingLoginFromServer.data.Getting_Brity_Works_User_Info_Rows[0].brity_works_user_info_id,
                        Login_name: CheckingLoginFromServer.data.Getting_Brity_Works_User_Info_Rows[0].brity_works_user_info_name,
                        Login_company: CheckingLoginFromServer.data.Getting_Brity_Works_User_Info_Rows[0].brity_works_user_info_company,
                        Login_epid: CheckingLoginFromServer.data.Getting_Brity_Works_User_Info_Rows[0].brity_works_user_info_epid,
                        Login_epid_id: CheckingLoginFromServer.data.Getting_Brity_Works_User_Info_Rows[0].brity_works_user_info_epid_id,
                        Login_token: CheckingLoginFromServer.data.token,
                        Login_Admin_Access:
                            CheckingLoginFromServer.data.Getting_Brity_Works_User_Info_Rows[0].brity_works_user_info_amdin_access === 1
                                ? true
                                : false,
                    };
                    dispatch(LOGIN_INFO_DATA_Changes(datas));
                    history.push('/');
                } else {
                    //비밀번호 변경 요청
                    setLogin_Password_Change_State(true);
                    setPasswordChangeData({ ...PasswordChangeData, ID: LoginInfoData.ID });
                    toast.show({
                        title: `초기비밀번호입니다. 비밀번호 변경 이후에 사용 가능합니다.`,
                        successCheck: true,
                        duration: 9000,
                    });
                }
            } else {
                setLoginInfoData({ ...LoginInfoData, PW: '' });
                Login_Password_Focus_Func();
                toast.show({
                    title: `아이디 및 비밀번호가 다릅니다. 다시 시도해주세요. `,
                    successCheck: false,
                    duration: 6000,
                });
            }
        } catch (error) {
            console.log(error);
            toast.show({
                title: `서버와의 연결이 끊겼습니다. IT팀에 문의바랍니다. `,
                successCheck: false,
                duration: 6000,
            });
        }
    };

    const HandleChangePassword = async e => {
        try {
            e.preventDefault();
            console.log(PasswordChangeData);
            var regExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;

            if (PasswordChangeData.New_PW !== PasswordChangeData.New_PW_Check) {
                setPasswordChangeData({ ...PasswordChangeData, New_PW_Check: '' });
                New_Password_Check_Focus_Func();
                toast.show({
                    title: `바꾸실 비밀번호가 서로 다릅니다. 다시 확인 바랍니다.`,
                    successCheck: false,
                    duration: 6000,
                });
                return;
            } else if (!regExp.test(PasswordChangeData.New_PW)) {
                setPasswordChangeData({ ...PasswordChangeData, New_PW: '', New_PW_Check: '' });
                New_Password_Focus_Func();
                toast.show({
                    title: `최소 6 자, 하나 이상의 문자, 하나의 숫자 및 하나의 특수 문자가 필요합니다.`,
                    successCheck: false,
                    duration: 6000,
                });
                return;
            } else {
                const LoginPasswordChangeFromServer = await axios.post(`${process.env.REACT_APP_DB_HOST}/users/User_Password_Change`, {
                    PasswordChangeData,
                });

                if (LoginPasswordChangeFromServer.data.dataSuccess) {
                    setLogin_Password_Change_State(false);
                    setLoginInfoData({ ...LoginInfoData, PW: '' });
                    setPasswordChangeData({ ID: '', New_PW: '', New_PW_Check: '' });
                    toast.show({
                        title: `비밀번호가 변경되었습니다. 변경된 비밀번호로 재 로그인 바랍니다.`,
                        successCheck: true,
                        duration: 6000,
                    });
                } else {
                    toast.show({
                        title: `서버와의 연결이 끊겼습니다. IT팀에 문의바랍니다. `,
                        successCheck: false,
                        duration: 6000,
                    });
                }
            }
        } catch (error) {
            console.log(error);
            toast.show({
                title: `서버와의 연결이 끊겼습니다. IT팀에 문의바랍니다. `,
                successCheck: false,
                duration: 6000,
            });
        }
    };

    const Login_ID_Focus_Func = () => {
        if (Login_ID_Focus.current) Login_ID_Focus.current.focus();
    };
    const Login_Password_Focus_Func = () => {
        if (Login_Password_Focus.current) Login_Password_Focus.current.focus();
    };
    const New_Password_Focus_Func = () => {
        if (New_Password_Focus.current) New_Password_Focus.current.focus();
    };
    const New_Password_Check_Focus_Func = () => {
        if (New_Password_Check_Focus.current) New_Password_Check_Focus.current.focus();
    };
    return (
        <LoginMainPageMainDivBox>
            {!Login_Password_Change_State ? (
                <div id="login-form-wrap" onSubmit={e => HandleSubmitLogin(e)}>
                    <h2>Login</h2>
                    <form id="login-form">
                        <p>
                            <input
                                ref={Login_ID_Focus}
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
                                ref={Login_Password_Focus}
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
            ) : (
                <div>
                    <div id="login-form-wrap" onSubmit={e => HandleChangePassword(e)}>
                        <h2>비밀번호 변경</h2>
                        <form id="login-form">
                            <p>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={LoginInfoData.ID}
                                    // onChange={e => setLoginInfoData({ ...LoginInfoData, ID: e.target.value })}
                                    readOnly
                                    required
                                />
                                <i className="validation">
                                    <span></span>
                                    <span></span>
                                </i>
                            </p>
                            <p>
                                <input
                                    ref={New_Password_Focus}
                                    type="password"
                                    id="username"
                                    name="username"
                                    placeholder="New Password"
                                    value={PasswordChangeData.New_PW}
                                    onChange={e => setPasswordChangeData({ ...PasswordChangeData, New_PW: e.target.value })}
                                    required
                                />
                                <i className="validation">
                                    <span></span>
                                    <span></span>
                                </i>
                            </p>
                            <p>
                                <input
                                    ref={New_Password_Check_Focus}
                                    type="password"
                                    id="username"
                                    name="username"
                                    placeholder="Check New Password"
                                    value={PasswordChangeData.New_PW_Check}
                                    onChange={e => setPasswordChangeData({ ...PasswordChangeData, New_PW_Check: e.target.value })}
                                    required
                                />
                                <i className="validation">
                                    <span></span>
                                    <span></span>
                                </i>
                            </p>
                            <p>
                                <input type="submit" id="login" value="비밀번호 변경" />
                            </p>
                            <span>
                                <div style={{ fontSize: '0.5em', textAlign: 'end' }}>*기타 문의사항은 DHKS IT팀에 문의바랍니다.</div>
                            </span>
                        </form>
                    </div>
                </div>
            )}
        </LoginMainPageMainDivBox>
    );
};

export default LoginMainPage;
