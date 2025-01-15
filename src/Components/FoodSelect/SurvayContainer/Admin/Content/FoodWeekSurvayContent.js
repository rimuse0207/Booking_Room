import React from 'react';
import { Axios_Get_Moduls } from '../../../../../API';
import { useEffect } from 'react';
import { useState } from 'react';
import moment from 'moment';
import styled from 'styled-components';

export const FoodWeekSurvayContentTableMainDivBox = styled.div`
    margin-top: 50px;
    /* Table */
    .member {
        max-width: 1200px;
        background-color: #fff;
        border-collapse: collapse;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
        border-radius: 5px;
        overflow: hidden;
        font-size: 1.1em;
        width: 100%;
        text-align: center;
        @media only screen and (max-width: 800px) {
            font-size: 0.8em;
        }
    }
    .member caption {
        font-size: 20px;
        margin-bottom: 30px;
    }
    .member tr {
        border-bottom: 1px solid #eee;
    }
    .member tr:last-child {
        border: none;
    }
    .member tr:nth-child(odd) {
        background-color: #ddd;
    }
    .member th,
    .member td {
        padding: 10px;
        @media only screen and (max-width: 800px) {
            padding: 5px;
        }
    }
    .member tr th {
        background-color: royalblue;
        color: #fff;
    }
    .member tr th:first-child {
        border-radius: 5px 0 0 0;
    }
    .member tr th:last-child {
        border-radius: 0 5px 0 0;
    }
    .member tr td:last-child {
        color: crimson;
        font-weight: 500;
    }
`;

const FoodWeekSurvayContent = ({ NowDates }) => {
    const [Food_Table_Data, setFood_Table_Data] = useState([]);

    const Food_Week_Survay_Getting_Func = async () => {
        try {
            const Food_Week_Survay_Getting_Func_Axios = await Axios_Get_Moduls('/FoodApp/Food_Week_Survay_Getting_Func', { NowDates });
            console.log(Food_Week_Survay_Getting_Func_Axios);
            if (Food_Week_Survay_Getting_Func_Axios) {
                setFood_Table_Data(Food_Week_Survay_Getting_Func_Axios);
            } else {
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        Food_Week_Survay_Getting_Func();
    }, [NowDates]);

    return (
        <FoodWeekSurvayContentTableMainDivBox>
            <div>
                <table className="member">
                    <thead>
                        <tr style={{ background: 'gray' }}>
                            <th>날짜</th>

                            <th>메뉴명</th>
                            <th>메뉴의견</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Food_Table_Data.map(list => {
                            return (
                                <tr key={list.food_week_survay_indexs}>
                                    <td>{moment(list.food_week_survay_applydate).format('YYYY-MM-DD')}</td>

                                    <td>{list.food_week_survay_food_select}</td>
                                    <td>{list.food_week_survay_opinion}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </FoodWeekSurvayContentTableMainDivBox>
    );
};

export default FoodWeekSurvayContent;
