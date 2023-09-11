import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { BsPersonSquare } from 'react-icons/bs';
import { Axios_Get_Moduls, request } from '../../../API';
import { useEffect } from 'react';
import { toast } from '../../ToasMessage/ToastManager';

const UserSelectViewComponentMainDivBox = styled.div`
    border-radius: 10px;
    padding-right: 20px;
    .User_Select_View_ul {
        max-height: 250px;
        overflow: auto;
        ::-webkit-scrollbar {
            width: 5px;
            height: 10px;
        }
        ::-webkit-scrollbar-thumb {
            background-color: red;
            border-radius: 10px;
        }
        ::-webkit-scrollbar-track {
            background-color: grey;
            border-radius: 10px;
            box-shadow: inset 0px 0px 2px white;
        }
        .Main_Room_Time_title {
            border-top: 1px solid #b0b0b0;
            height: 50px;
            text-align: center;
        }
        .User_Select_View_Info_Container {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 1px dashed lightgray;

            :hover {
                cursor: pointer;
                opacity: 0.5;
            }

            .User_Select_View_Info_Left {
                font-size: 2em;
                margin-right: 30px;
                color: gray;
            }
        }
    }
`;
const UserSelectViewComponent = ({ SearchTitle, setUserSearchModalOn, setClickedUser }) => {
    const [UserList, setUserList] = useState([]);

    const handleClicks = list => {
        setUserSearchModalOn(true);
        setClickedUser(list);
    };

    const Get_User_Info_Data = async () => {
        try {
            const Get_User_Info_Data_Axios = await Axios_Get_Moduls('/users/Get_User_Info_Data', {});
            if (Get_User_Info_Data_Axios) {
                setUserList(Get_User_Info_Data_Axios);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        Get_User_Info_Data();
    }, []);

    return (
        <UserSelectViewComponentMainDivBox>
            <ul className="User_Select_View_ul Show_Boxs">
                {UserList.filter(
                    item =>
                        item.name.toLowerCase().includes(SearchTitle.toLowerCase()) ||
                        item.email_address.toLowerCase().includes(SearchTitle.toLowerCase()) ||
                        item.phone_number.toLowerCase().includes(SearchTitle.toLowerCase()) ||
                        item.team.toLowerCase().includes(SearchTitle.toLowerCase())
                ).map(list => {
                    return (
                        <li className="User_Select_View_li Show_Boxs" key={list.email_address} onClick={() => handleClicks(list)}>
                            <div className="User_Select_View_Info_Container Show_Boxs">
                                <div className="User_Select_View_Info_Left Show_Boxs">
                                    <BsPersonSquare></BsPersonSquare>
                                </div>
                                <div className="User_Select_View_Info_Right Show_Boxs">
                                    <div className="Show_Boxs" style={{ fontWeight: 'bolder' }}>
                                        {list.name} / {list.team} / {list.company}
                                    </div>
                                    <div className="Show_Boxs" style={{ color: 'gray', marginTop: '5px', marginBottom: '5px' }}>
                                        {list.phone_number}
                                    </div>
                                    <div className="Show_Boxs" style={{ color: 'gray' }}>
                                        {list.email_address}
                                    </div>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </UserSelectViewComponentMainDivBox>
    );
};

export default UserSelectViewComponent;
