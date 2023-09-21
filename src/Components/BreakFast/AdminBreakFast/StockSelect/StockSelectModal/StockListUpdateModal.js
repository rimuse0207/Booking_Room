import React from 'react';
import styled from 'styled-components';
import { CgCloseO } from 'react-icons/cg';
import { useState } from 'react';
import moment from 'moment';
import { useEffect } from 'react';
import { StockSelectMainPageMainDivBox } from '../StockSelectMainPage';
import { UserApplySelectMainPageMainDivBox } from '../../UserApplySelect/UserApplySelectMainPage';
import { Axios_Get_Moduls, request } from '../../../../../API';
import { toast } from '../../../../ToasMessage/ToastManager';
const StockListUpdateModalMainDivBox = styled.div`
    .Close_button_container {
        position: fixed;
        top: 10px;
        right: 10px;
        color: red;
        font-weight: bolder;
        font-size: 1.3em;
        :hover {
            cursor: pointer;
        }
    }
`;

const StockListUpdateModal = ({ SelectList, OnClose }) => {
    const [AfterUpdateData, setAfterUpdateData] = useState([]);

    const History_Stock_Show = async () => {
        try {
            const History_Stock_Show_Axios = await Axios_Get_Moduls(`/FoodApp/History_Stock_Show`, {
                breakfast_info_name: SelectList.breakfast_info_name,
            });

            if (History_Stock_Show_Axios) {
                setAfterUpdateData(History_Stock_Show_Axios);
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
        History_Stock_Show();
    }, []);

    return (
        <StockListUpdateModalMainDivBox>
            <div className="Close_button_container" onClick={OnClose}>
                <CgCloseO></CgCloseO>
            </div>
            <h4>등록 이력</h4>
            <UserApplySelectMainPageMainDivBox>
                <table className="type09">
                    <thead>
                        <tr className="PostionFixedFromScroll">
                            <th scope="cols">No.</th>
                            <th scope="cols">메뉴명</th>
                            <th scope="cols">등록 수량</th>
                            <th scope="cols">등록 날짜</th>
                        </tr>
                    </thead>
                    <tbody>
                        {AfterUpdateData.map((list, j) => {
                            return (
                                <tr key={list.breakfast_user_count_info_indexs}>
                                    <td style={{ width: '30px' }}>{AfterUpdateData.length - j}</td>
                                    <td>{list.breakfast_count_info_name}</td>
                                    <td style={{ width: '100px' }}>{list.breakfast_count_info_count}개</td>
                                    <td>{moment(list.breakfast_count_info_update_date).format('YYYY-MM-DD')}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </UserApplySelectMainPageMainDivBox>
        </StockListUpdateModalMainDivBox>
    );
};

export default StockListUpdateModal;
