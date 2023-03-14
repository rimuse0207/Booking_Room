import React from 'react';
import styled from 'styled-components';
import { FcSearch } from 'react-icons/fc';
import { useState } from 'react';
import UserSelectViewComponent from './UserSelectViewComponent/UserSelectViewComponent';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';

const UserSelectMainPageMainDivBox = styled.div`
    position: absolute;
    right: 10px;
    top: 0px;
    width: 400px;
    height: 100%;
    text-align: start;
    padding: 5px;
    .Search_Input_Box {
        height: 75%;
        display: flex;

        label {
            padding-top: 5px;
            border: 1px solid lightgray;
            font-size: 1.5em;
        }
        input {
            padding-left: 10px;
            background-color: none;
            width: 100%;
            border: 1px solid lightgray;
            outline: 1px solid lightgray;
        }
    }
    .View_Show {
        position: absolute;
        top: 66px;
        left: 0px;
        min-width: 400px;
        height: 300px;
        background-color: #efefef;
        z-index: 99;
    }
`;

const UserSelectMainPage = () => {
    const InputViewFocus = useRef(null);
    const ViewFocus = useRef(null);
    const LoginInfo = useSelector(state => state.LoginInfoDataRedux.Infomation);
    const [SearchTitle, setSearchTitle] = useState('');
    const [FocusChecking, setFocusChecking] = useState(false);

    useEffect(() => {
        setSearchTitle('');
        if (FocusChecking && SearchTitle.current) {
            SearchTitle.current.focus();
        }
    }, [FocusChecking]);

    useEffect(() => {
        const handler = e => {
            if (ViewFocus.current && !ViewFocus.current.contains(e.target) && e.target.className !== 'Show_Boxs') {
                setFocusChecking(false);
            }
        };

        window.addEventListener('click', handler);
        return () => {
            window.removeEventListener('click', handler);
        };
    });

    const handleInputClick = e => {
        setFocusChecking(true);
    };

    const handleChanges = e => {
        if (FocusChecking) {
            setSearchTitle(e.target.value);
        } else {
            setFocusChecking(true);
            setSearchTitle(e.target.value);
        }
    };

    return (
        <UserSelectMainPageMainDivBox>
            <div ref={ViewFocus} onClick={handleInputClick}>
                <div style={{ fontWeight: 'bolder' }}>유저 검색</div>
                <div className="Search_Input_Box">
                    <label>
                        <FcSearch></FcSearch>
                    </label>
                    <input
                        type="text"
                        value={SearchTitle}
                        onChange={e => handleChanges(e)}
                        placeholder="임직원 조회"
                        ref={InputViewFocus}
                        autoComplete="off"
                    ></input>
                </div>

                {FocusChecking && LoginInfo.Login_token ? (
                    <div className="View_Show">
                        <UserSelectViewComponent SearchTitle={SearchTitle}></UserSelectViewComponent>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </UserSelectMainPageMainDivBox>
    );
};

export default UserSelectMainPage;
