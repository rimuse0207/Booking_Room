import moment from 'moment';
import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useEffect } from 'react';
import axios from 'axios';

export const UserApplySelectMainPageMainDivBox = styled.div`
    .DateClickContainer {
        display: flex;
        max-width: 400px;
        width: 100%;
        justify-content: space-around;
        font-size: 1.2em;
    }
    table {
        font-size: 0.8em;
        position: relative;
        width: 100%;
        max-width: 400px;
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
`;

const UserApplySelectMainPage = () => {
    const [NowDates, setNowDates] = useState(moment().format('YYYY-MM'));
    const [TableData, setTableData] = useState([]);
    const Get_NowDates_Apply_User_Select = async () => {
        try {
            const Get_Now_Dates_Apply_User_Select_Axios = await axios.get(
                `${process.env.REACT_APP_DB_HOST}/FoodApp/Now_Dates_Apply_User_Select`,
                {
                    params: {
                        NowDates,
                    },
                }
            );
            if (Get_Now_Dates_Apply_User_Select_Axios.data.dataSuccess) {
                setTableData(Get_Now_Dates_Apply_User_Select_Axios.data.Select_User_BreakFast_Apply_User_Rows);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        Get_NowDates_Apply_User_Select();
    }, [NowDates]);

    return (
        <UserApplySelectMainPageMainDivBox>
            <div className="DateClickContainer">
                <div onClick={() => setNowDates(moment(NowDates).subtract(1, 'month').format('YYYY-MM'))}>
                    <IoIosArrowBack></IoIosArrowBack>
                </div>
                <div>{moment(NowDates).format('YYYY-MM')}</div>
                <div onClick={() => setNowDates(moment(NowDates).add(1, 'month').format('YYYY-MM'))}>
                    <IoIosArrowForward></IoIosArrowForward>
                </div>
            </div>
            <div className="Select_Table_Container">
                <table className="type09">
                    <thead>
                        <tr className="PostionFixedFromScroll">
                            <th scope="cols">No.</th>
                            <th scope="cols">회사명</th>
                            <th scope="cols">이름</th>
                            <th scope="cols">메뉴명</th>
                            <th scope="cols">수량</th>
                            <th scope="cols">신청 날짜</th>
                        </tr>
                    </thead>
                    <tbody>
                        {TableData.map((list, j) => {
                            return (
                                <tr key={list.breakfast_user_count_info_indexs}>
                                    <td>{TableData.length - j}</td>
                                    <td>{list.brity_works_user_info_company}</td>
                                    <td>{list.brity_works_user_info_name}</td>
                                    <td>{list.breakfast_user_count_info_food_name}</td>
                                    <td>{list.breakfast_user_count_info_eating_count}개</td>
                                    <td>{moment(list.breakfast_user_count_info_eating_date).format('MM-DD')}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </UserApplySelectMainPageMainDivBox>
    );
};
export default UserApplySelectMainPage;
