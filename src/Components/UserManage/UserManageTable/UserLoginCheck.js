import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { request } from "../../../API";
import { useState } from "react";
import moment from "moment";
import {IoIosArrowBack,IoIosArrowForward} from "react-icons/io"

const UserLoginCheckMainDivBox = styled.div`
.Date_Show_Click_Main_Container {
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        .Date_Show_Click_Before {
            margin-right: 10px;
            font-size: 2em;
            :hover {
                cursor: pointer;
                color: gray;
            }
        }
        .Date_Show_Content {
            .example-custom-input {
                font-size: 1.5em;
                border: none;
                background: none;
              
            }
            margin-top: 12px;
          

        }
        .Date_Show_Click_After {
            margin-left: 10px;
            font-size: 2em;
            :hover {
                cursor: pointer;
                color: gray;
            }
        }
    }



 table {
        font-size: 0.8em;
        position: relative;
        width: 100%;
    }

    table.type09 {
        border-collapse: collapse;
        text-align: left;
        line-height: 1.5;
    }
    table.type09 thead th {
        padding: 10px;
        font-weight: bold;
        vertical-align: top;
        color: #369;
        border-bottom: 3px solid #036;
    }
    table.type09 tbody th {
        width: 150px;
        padding: 10px;
        font-weight: bold;
        vertical-align: top;
        border-bottom: 1px solid #ccc;
        background: #f3f6f7;
    }
    table.type09 td {
        width: 350px;
        padding: 10px;
        vertical-align: center;
        border-bottom: 1px solid #ccc;
    }

`

const UserLoginCheck = () => {
    const [Month_Date, setMonth_Date] = useState(moment().format("YYYY-MM"));
    const [Login_Check_Data, setLogin_Check_Data] = useState([]);

    const Login_User_Data_Checking = async () => {
        try {
            
            const Login_User_Data_Checking_Axios = await request.get('/users/Login_User_Data_Checking', {
                params: {
                    Month_Date
                }
            })
            if(Login_User_Data_Checking_Axios.data.dataSuccess){
                console.log(Login_User_Data_Checking_Axios);
                setLogin_Check_Data(Login_User_Data_Checking_Axios.data.Login_User_Data_Checking_Rows);

            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        Login_User_Data_Checking()
    },[Month_Date])

    return (
        <UserLoginCheckMainDivBox>
             <div style={{ textAlign: 'center', position: 'relative' }}>
                <div className="Date_Show_Click_Main_Container">
                    <div
                        className="Date_Show_Click_Before"
                        onClick={() => {
                            setMonth_Date((moment(Month_Date).subtract(1, 'months').format("YYYY-MM")));
                        }}
                    >
                        <IoIosArrowBack></IoIosArrowBack>
                    </div>
                    <h3 className="Date_Show_Content">
                        {Month_Date}
                    </h3>
                    <div className="Date_Show_Click_After" onClick={() => setMonth_Date(moment(Month_Date).add(1, 'months').format("YYYY-MM"))}>
                        <IoIosArrowForward></IoIosArrowForward>
                    </div>
                </div>
                {/* 날짜 선택 끝 */}
             
                  
            </div>
             <table className="type09">
                <thead>
                    <tr className="PostionFixedFromScroll">
                        <th scope="cols">No.</th>
                        <th scope="cols">이메일(ID)</th>
                        <th scope="cols">이름</th>
                        <th scope="cols">최초 접속날짜</th>
                    </tr>
                </thead>
                <tbody>
                    {Login_Check_Data.map((list,j) => {
                        return <tr>
                            <td>{j + 1}</td>
                            <td>{list.brity_works_login_access_info_id}</td>
                            <td>{list.brity_works_login_access_info_name}</td>
                            <td>{moment( list.brity_works_login_access_info_date).format("YYYY-MM-DD HH:mm:ss")}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </UserLoginCheckMainDivBox>
    )
}

export default UserLoginCheck;