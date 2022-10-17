import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { BsFillPersonBadgeFill } from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi';
import HambergerMenuMainPage from './HambergerMenu/HambergerMenuMainPage';
import UserInfoMainPage from './HambergerMenu/UserInfoPage/UserInfoMainPage';
import { useSelector } from 'react-redux';

const NavigationMainPageMainDivBox = styled.div`
    border-bottom: 1px solid #368;
    height: 60px;
    background-color: #368;
    position: sticky;
    z-index: 100;
    .NAV_Display_Cotainer {
        position: relative;
        .NAV_Display_Menu_Left {
            position: absolute;
            top: 10px;
            left: 20px;
            font-size: 2em;
            color: #fff;
            z-index: 100;
            :hover {
                cursor: pointer;
            }
        }
        .NAV_Display_Title_Center {
            color: #fff;
            text-align: center;
            font-size: 1.5em;
            position: absolute;
            left: 0px;
            right: 0px;
            top: -25px;
        }
        .NAV_Display_Profile_Right {
            position: absolute;
            top: 10px;
            right: 70px;
            font-size: 2em;
            color: #fff;
            :hover {
                cursor: pointer;
            }
            .NAV_Display_Profile_MenuBar {
                position: absolute;
                width: 100px;
                min-height: 80px;
                top: 70px;
                right: -35px;
                font-size: 0.5em;
                background-color: #368;
                text-align: center;
            }
            .Triangle_Menu {
                width: 0;
                height: 0;
                border-bottom: 30px solid #368;
                border-top: 0px solid transparent;
                border-left: 50px solid transparent;
                border-right: 50px solid transparent;
                text-align: center;
                position: absolute;
                top: -30px;
            }
        }
    }
`;

const NavigationMainPage = () => {
    const LoginInfo = useSelector(state => state.LoginInfoDataRedux.Infomation);
    const [UserInfoMenuBarIsOpen, setUserInfoMenuBarIsOpen] = useState(false);

    return (
        <NavigationMainPageMainDivBox>
            <div className="NAV_Display_Cotainer">
                <div className="NAV_Display_Menu_Left" onClick={() => alert('asda')}>
                    <div>
                        {/* <GiHamburgerMenu></GiHamburgerMenu> */}
                        <HambergerMenuMainPage></HambergerMenuMainPage>
                    </div>
                </div>
                <div className="NAV_Display_Title_Center">
                    <h2>회의실 예약</h2>
                </div>
                <div className="NAV_Display_Profile_Right">
                    <div onClick={() => setUserInfoMenuBarIsOpen(!UserInfoMenuBarIsOpen)}>
                        <BsFillPersonBadgeFill></BsFillPersonBadgeFill>
                    </div>
                    {UserInfoMenuBarIsOpen ? (
                        <div className="NAV_Display_Profile_MenuBar">
                            <div className="Triangle_Menu"></div>
                            <UserInfoMainPage></UserInfoMainPage>
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
        </NavigationMainPageMainDivBox>
    );
};

export default NavigationMainPage;
