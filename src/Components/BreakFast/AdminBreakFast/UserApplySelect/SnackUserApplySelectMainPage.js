import moment from 'moment';
import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useEffect } from 'react';
import { Axios_Get_Moduls, request } from '../../../../API';
import { FaFileExcel } from 'react-icons/fa';
import { toast } from '../../../ToasMessage/ToastManager';
import { UserApplySelectMainPageMainDivBox } from './UserApplySelectMainPage';

const SnackUserApplySelectMainPage = () => {
    const [NowDates, setNowDates] = useState(moment().format('YYYY-MM'));
    const [TableData, setTableData] = useState([]);

    const Get_NowDates_Apply_User_Select = async () => {
        try {
            const Get_Now_Dates_Apply_User_Select_Axios = await Axios_Get_Moduls(`/FoodApp/Get_Snacks_Apply_Datas`, {
                NowDates,
            });

            if (Get_Now_Dates_Apply_User_Select_Axios) {
                setTableData(Get_Now_Dates_Apply_User_Select_Axios);
            } else
                toast.show({
                    title: `IT팀에게 문의바랍니다.`,
                    successCheck: false,
                    duration: 6000,
                });
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
                            <th scope="cols">이름</th>
                            <th scope="cols">커피 횟수</th>
                            <th scope="cols">스낵 횟수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {TableData.map((list, j) => {
                            return (
                                <tr key={list.breakfast_user_count_info_indexs}>
                                    <td>{TableData.length - j}</td>
                                    <td style={{ width: '55px' }}>{list.fullName}</td>
                                    <td>{list.coffee_count}</td>
                                    <td>{list.snack_count}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </UserApplySelectMainPageMainDivBox>
    );
};
export default SnackUserApplySelectMainPage;
