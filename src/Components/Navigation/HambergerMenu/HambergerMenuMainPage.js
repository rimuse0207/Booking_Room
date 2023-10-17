import React, { useEffect, useRef, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LOGOUT_INFO_DATA_Changes } from '../../../Models/LoginInfoReducer/LoginInfoReducer';
import { Title_Change_Func } from '../../../Models/TitleSelectorReducer/TitleSelectorReducer';
import { useHistory } from 'react-router-dom';
import { cookies } from 'react-cookie';

const HambergerMenuMainPageMainDivBox = styled.div`
    .menubar {
        display: block;
        background-color: #8c8a8a;
        color: #efefef;
        box-shadow: 2px 5px 5px 0 rgba(0, 0, 0, 0.12);
        text-align: center;
        margin-top: 6px;
    }
    .MainTitles > h1 {
        margin-top: 12px;
    }
    .MainTitles {
        position: absolute;
        top: -15px;
        left: 0;
        right: 0;
    }

    .menubar span {
        display: inline-block;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        line-height: 60px;
        top: 20px;
    }

    #hambmenu {
        position: relative;
        width: 40px;
        height: 45px;
        float: left;
        transition: 0.5s ease-in-out;
        cursor: pointer;
    }
    #hambmenu span {
        position: absolute;
        height: 5px;
        width: 100%;
        vertical-align: middle;
        background: white;
        border-radius: 8px;
        opacity: 1;
        left: 0;
        transform: rotate(0deg);
        transition: 0.25s ease-in-out;
        padding: 0px;
    }

    .hambclicker {
        content: '';
        position: absolute;
        cursor: pointer;
        z-index: 9;
        width: 100%;
        height: 100%;
    }

    #hambmenu span:nth-child(1) {
        top: 0px;
    }

    #hambmenu span:nth-child(2),
    #hambmenu span:nth-child(3) {
        top: 10px;
    }

    #hambmenu span:nth-child(4) {
        top: 20px;
    }

    #hambmenu.isopen span:nth-child(1) {
        top: 18px;
        width: 0%;
        left: 50%;
        opacity: 0;
    }

    #hambmenu.isopen span:nth-child(2) {
        transform: rotate(45deg);
    }

    #hambmenu.isopen span:nth-child(3) {
        transform: rotate(-45deg);
    }

    #hambmenu.isopen span:nth-child(4) {
        top: 18px;
        width: 0%;
        left: 50%;
        opacity: 0;
    }

    #menu {
        position: absolute;
        height: calc(100vh - 70px);
        width: 210px;

        background: #8c8a8a;
        box-shadow: 2px 1px 1px 1px lightgrey;

        transform: translateX(-100%);
        transition: transform 300ms;
        z-index: 100;
        overflow: auto;
        color: #efefef;
    }

    #menu ul {
        margin-top: 0px;
        padding: 0px;
        color: black;
        list-style-type: none;
        text-align: left;
        overflow: hidden;
    }
    #menu > div > h5 {
        padding: 10px 0 10px 10px;
    }
    #menu > div > h5:hover {
        cursor: pointer;
    }
    #menu li {
        padding: 10px 0 10px 30px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.14);
        border-top: 1px solid rgba(0, 0, 0, 0.14);
        color: white;
    }

    .IsOpen_Menu_Cotainer {
        background-color: #368;
        width: 200px;
        height: 90vh;
        position: absolute;
        top: 50px;
        left: -20px;
        font-size: 1em;
        ul {
            font-size: 0.6em;
            padding-left: 0px;
            li {
                border-top: 0.5px solid #fff;
                text-align: start;
                a,
                div {
                    width: 100%;
                    height: 100%;
                    display: block;
                    padding-top: 10px;
                    padding-bottom: 10px;
                    padding-left: 20px;
                }
                :hover {
                    cursor: pointer;
                    background-color: #fff;
                    color: black;
                }
            }
        }

        animation-name: slideOn;
        animation-duration: 0.5s;
        @keyframes slideOn {
            from {
                left: -220px;
            }

            to {
                left: -20px;
            }
        }
    }
    .IsClose_Menu_Cotainer {
        background-color: #368;
        width: 200px;
        height: 90vh;
        position: absolute;
        top: 50px;
        left: -220px;
        animation-name: slideOff;
        animation-duration: 0.5s;
        @keyframes slideOff {
            from {
                left: -20px;
            }

            to {
                left: -220px;
            }
        }
    }
`;

const HambergerMenuMainPage = () => {
    const LoginInfo = useSelector(state => state.LoginInfoDataRedux.Infomation);
    const dispatch = useDispatch();
    const history = useHistory();
    const myMenuRef = useRef('null');
    const [hambergerOpen, setHambergerOpen] = useState(false);
    const [menuStatus, setMenuStatus] = useState('');
    const _menuToggle = e => {
        e.stopPropagation();
        hambergerOpen ? setMenuStatus('') : setMenuStatus('isopen');
        setHambergerOpen(!hambergerOpen);
    };
    useEffect(() => {
        function handleClickOutside(e) {
            if (myMenuRef.current && !myMenuRef.current.contains(e.target)) {
                e.stopPropagation();
                setMenuStatus('');
                setHambergerOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [myMenuRef]);

    return (
        <HambergerMenuMainPageMainDivBox ref={myMenuRef}>
            <div className="menubar">
                <div className="hambclicker" onClick={e => _menuToggle(e)}></div>
                <div id="hambmenu" className={menuStatus}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div>{/* <Navigation menuStatus={menuStatus} setHambergerOpen={(e) => _menuToggle(e)} /> */}</div>
            </div>
            {hambergerOpen ? (
                <div className="IsOpen_Menu_Cotainer">
                    <ul>
                        <li>
                            <Link to="/">회의실 예약</Link>
                        </li>
                        <li>
                            <Link to="/Today_Food">식단표</Link>
                        </li>
                        <BrowserView>
                            <li>
                                <Link to="/FloorLayout">자리배치도</Link>
                            </li>
                        </BrowserView>
                        {LoginInfo.Login_id && LoginInfo.Login_company === 'DHKS' ? (
                            <>
                                <li>
                                    <Link to="/BreakFast/UserSlect">조식신청</Link>
                                </li>
                                <li>
                                    <Link to="/PIM">PIM로컬전</Link>
                                </li>
                                <li>
                                    <Link to="/KIZUKI_Notepad">KIZUKI 노트</Link>
                                </li>
                                {/* <li>
                                    <Link to="/VehicleOperaion">차량운행</Link>
                                </li> */}
                                {/* <li>
                                    <Link to='/Defalult_MailSending'>Wafer Mail전송</Link>
                                </li> */}
                            </>
                        ) : (
                            <></>
                        )}

                        {LoginInfo.Login_Admin_Access ? (
                            <BrowserView>
                                <li>
                                    <Link to={`/User_Select_or_Add/${LoginInfo.Login_id}/Company_DHK`}>사용자 등록 및 조회</Link>
                                </li>
                                <li>
                                    <Link to={`/FloorLayout/AdminChange`}>자리배치도 수정</Link>
                                </li>
                            </BrowserView>
                        ) : (
                            <></>
                        )}

                        {LoginInfo.Login_id === 'sjyoo@dhk.co.kr' ||
                        LoginInfo.Login_id === 'sjkim@dhk.co.kr' ||
                        LoginInfo.Login_id === 'jychoi@dhk.co.kr' ? (
                            <li>
                                <Link to="/Admin_Image_Check">잔반 이미지 확인</Link>
                            </li>
                        ) : (
                            <></>
                        )}
                        {LoginInfo.Login_id === 'sjyoo@dhk.co.kr' ||
                        LoginInfo.Login_id === 'sjkim@dhk.co.kr' ||
                        LoginInfo.Login_id === 'jychoi@dhk.co.kr' ||
                        LoginInfo.Login_id === 'dikim@dhk.co.kr' ||
                        LoginInfo.Login_id === 'cjlee@dhk.co.kr' ? (
                            <>
                                <li>
                                    <Link to="/Admin/BreakFast">조식 재고 확인</Link>
                                </li>
                                <li>
                                    <Link to="/DHKS_Admin_Access_Control_Page">회의실 관리</Link>
                                </li>
                            </>
                        ) : (
                            <></>
                        )}

                        {!LoginInfo.Login_id ? (
                            <li style={{ borderBottom: '0.5px solid #fff' }}>
                                <Link to="/Login_Page">로그인</Link>
                            </li>
                        ) : (
                            <li
                                style={{ borderBottom: '0.5px solid #fff' }}
                                onClick={() => {
                                    dispatch(Title_Change_Func('Company_Room'));
                                    dispatch(LOGOUT_INFO_DATA_Changes());
                                    cookies.remove('Login_token');
                                    history.push('/');
                                }}
                            >
                                <div>로그아웃</div>
                            </li>
                        )}
                    </ul>
                </div>
            ) : (
                <div className="IsClose_Menu_Cotainer"></div>
            )}
        </HambergerMenuMainPageMainDivBox>
    );
};

export default HambergerMenuMainPage;
