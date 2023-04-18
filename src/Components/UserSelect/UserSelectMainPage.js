import React from 'react';
import styled from 'styled-components';
import { FcSearch } from 'react-icons/fc';
import { useState } from 'react';
import UserSelectViewComponent from './UserSelectViewComponent/UserSelectViewComponent';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import OrganChartMainPage from './OrganChart/OrganChartMainPage';
import { request } from '../../API';

const UserSelectMainPageMainDivBox = styled.div`
    position: absolute;
    right: 10px;
    top: 0px;
    width: 400px;
    height: 100%;
    text-align: start;
    padding: 5px;
    @media only screen and (max-width: 800px) {
        display: none;
    }
    .Search_Input_Box {
        height: 75%;
        

        form{
            display: flex;
            width:100%;  
             label {
            padding-top: 5px;
            border: 1px solid lightgray;
            font-size: 1.5em;
            :hover{
                cursor: pointer;
                opacity:0.5;
            }
        }
        input {
            padding-left: 10px;
            background-color: none;
            width: 100%;
            border: 1px solid lightgray;
            outline: 1px solid lightgray;
        }
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
    const [UserSearchModalOn, setUserSearchModalOn] = useState(false);
    const [ClickedUser, setClickedUser] = useState(null);
    useEffect(() => {
        setSearchTitle('');
        if (FocusChecking && SearchTitle.current) {
            SearchTitle.current.focus();
        }
    }, [FocusChecking]);

    useEffect(() => {
        if (!UserSearchModalOn) {
            setClickedUser(null);
        }
    },[UserSearchModalOn])

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

    const handleClickUserSelecthandleClickUserSelect = async () => {
        setUserSearchModalOn(true);
    }


    const HandleSumitData = async(e) => {
        try {
            e.preventDefault();

            
            const Get_User_Info_Data_Axios = await request.get('/users/Get_User_Info_Data_Select', {
                params: {
                    SearchTitle
                }
            });

                if (Get_User_Info_Data_Axios.data.dataSuccess) {
                    if (Get_User_Info_Data_Axios.data.Get_User_Info_Data_Rows.length > 0) {
                        setClickedUser({
                             email_address: Get_User_Info_Data_Axios.data.Get_User_Info_Data_Rows[0].brity_works_user_info_id ,
                            department_code :Get_User_Info_Data_Axios.data.Get_User_Info_Data_Rows[0].department_code 
                        })
                        setUserSearchModalOn(true);
                    }
            }
            
        } catch (error) {
            console.log(error);
        }
    }
   


    return (
        <UserSelectMainPageMainDivBox>
            <div ref={ViewFocus} onClick={handleInputClick}>
                <div style={{ fontWeight: 'bolder' }}>유저 검색</div>
                <div className="Search_Input_Box">
                    <form onSubmit={(e)=>HandleSumitData(e)}>
                        <label onClick={()=>handleClickUserSelecthandleClickUserSelect()} className="OrganModalOpen">
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
                    </form>
                </div>

                {FocusChecking && LoginInfo.Login_token ? (
                    <div className="View_Show">
                        <UserSelectViewComponent SearchTitle={SearchTitle} setUserSearchModalOn={()=>setUserSearchModalOn(true)} setClickedUser={(data)=>setClickedUser(data)}></UserSelectViewComponent>
                    </div>
                ) : (
                    <></>
                )}
            </div>
            <OrganChartMainPage UserSearchModalOn={UserSearchModalOn} setUserSearchModalOn={()=>setUserSearchModalOn(false)} ClickedUser={ClickedUser}></OrganChartMainPage>
        </UserSelectMainPageMainDivBox>
    );
};

export default UserSelectMainPage;
