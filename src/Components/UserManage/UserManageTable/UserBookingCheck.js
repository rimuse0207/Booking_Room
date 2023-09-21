import React from 'react';
import { UserLoginCheckMainDivBox } from './UserLoginCheck';
import { useEffect } from 'react';
import styled from 'styled-components';
import { Axios_Get_Moduls, request } from '../../../API';
import { useState } from 'react';
import moment from 'moment';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { FaFileExcel } from 'react-icons/fa';
import { toast } from '../../ToasMessage/ToastManager';

const UserBookingCheck = () => {
    const [Month_Date, setMonth_Date] = useState(moment().format('YYYY-MM'));
    const [Booking_Info, setBooking_Info] = useState([]);
    const HandleClickExcelDownload = async () => {
        try {
            const Getting_Booking_Info_Data_Excel_Download_Axios = await Axios_Get_Moduls(
                '/users/Getting_Booking_Info_Data_Excel_Download',
                {
                    Month_Date,
                }
            );

            if (Getting_Booking_Info_Data_Excel_Download_Axios) {
                window.open(`${process.env.REACT_APP_DB_HOST}/${Getting_Booking_Info_Data_Excel_Download_Axios.data.URL}`);
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

    const Getting_Booking_Info_Data = async () => {
        try {
            const Getting_Booking_Info_Data_Axios = await Axios_Get_Moduls(`/users/Getting_Booking_Info_Data`, {
                Month_Date,
            });

            if (Getting_Booking_Info_Data_Axios) {
                setBooking_Info(Getting_Booking_Info_Data_Axios);
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
        Getting_Booking_Info_Data();
    }, [Month_Date]);

    return (
        <UserLoginCheckMainDivBox>
            <div>
                <div style={{ textAlign: 'end', marginRight: '30px' }}>
                    <span style={{ color: 'green', fontSize: '2em' }} onClick={() => HandleClickExcelDownload()}>
                        <FaFileExcel></FaFileExcel>
                    </span>
                </div>
            </div>
            <div style={{ textAlign: 'center', position: 'relative' }}>
                <div className="Date_Show_Click_Main_Container">
                    <div
                        className="Date_Show_Click_Before"
                        onClick={() => {
                            setMonth_Date(moment(Month_Date).subtract(1, 'months').format('YYYY-MM'));
                        }}
                    >
                        <IoIosArrowBack></IoIosArrowBack>
                    </div>
                    <h3 className="Date_Show_Content">{Month_Date}</h3>
                    <div
                        className="Date_Show_Click_After"
                        onClick={() => setMonth_Date(moment(Month_Date).add(1, 'months').format('YYYY-MM'))}
                    >
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
                        <th scope="cols">예약 건수</th>
                    </tr>
                </thead>
                <tbody>
                    {Booking_Info.map((list, j) => {
                        return (
                            <tr>
                                <td>{j + 1}.</td>
                                <td>{list.brity_works_booking_info_id}</td>
                                <td>{list.brity_works_user_info_name}</td>
                                <td>{list.counts}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </UserLoginCheckMainDivBox>
    );
};

export default UserBookingCheck;
