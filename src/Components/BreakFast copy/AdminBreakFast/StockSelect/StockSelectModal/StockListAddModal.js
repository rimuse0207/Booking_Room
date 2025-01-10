import React from 'react';
import styled from 'styled-components';
import { CgCloseO } from 'react-icons/cg';
import { BiMinusCircle, BiPlusCircle } from 'react-icons/bi';
import { useState } from 'react';
import axios from 'axios';
import { Axios_Post_Moduls, request } from '../../../../../API';
import { toast } from '../../../../ToasMessage/ToastManager';

const StockListAddModalMainDivBox = styled.div`
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
    .Count_Select_Container {
        display: flex;
        align-items: center;

        button {
            height: 30px;
            width: 50px;
            border: none;
            border-radius: 10px;
            margin-left: 10px;
            margin-right: 10px;
        }
        input {
            width: 100px;
            margin: 0px;
            text-align: center;
            font-weight: bolder;
            font-size: 1em;
            padding: 0px;
        }
    }

    .Button_Cotainer {
        max-width: 500px;
        width: 100%;
        text-align: center;
        margin-top: 50px;
        margin-bottom: 50px;
        button {
            width: 120px;
            height: 40px;
            border: none;
            font-weight: bolder;
            font-size: 1.1em;
            border-radius: 5px;
            :hover {
                cursor: pointer;
            }
            @media only screen and (max-width: 800px) {
                width: 90px !important;
                font-size: 0.9em;
            }
        }
        .Cancle {
            background-color: orange;
            margin-right: 30px;
            color: #fff;
            :hover {
                background-color: #efefef;
                color: orange;
            }
            @media only screen and (max-width: 800px) {
                margin-right: 10px;
            }
        }
        .Delete {
            background-color: red;
            margin-left: 30px;
            color: #fff;
            :hover {
                background-color: #efefef;
                color: red;
            }
            @media only screen and (max-width: 800px) {
                margin-left: 10px;
            }
        }
        .Submit {
            background-color: green;
            margin-right: 30px;
            color: #fff;
            :hover {
                background-color: #efefef;
                color: green;
            }
            @media only screen and (max-width: 800px) {
                margin-right: 10px;
            }
        }
    }
`;

const StockListAddModal = ({ SelectList, OnClose, Get_NowDates_Apply_User_Select }) => {
    const [CountList, setCountList] = useState(1);

    const CountMinus = () => {
        setCountList(CountList - 1);
    };

    const CountPlus = () => {
        setCountList(CountList + 1);
    };

    const HandleListAdd = async () => {
        try {
            const HandleSendCount_Axios = await Axios_Post_Moduls(`/FoodApp/Stock_List_Add`, {
                CountList,
                SelectList,
            });

            if (HandleSendCount_Axios) {
                Get_NowDates_Apply_User_Select();
                OnClose();
            } else {
                toast.show({
                    title: `IT팀에게 문의바랍니다.`,
                    successCheck: false,
                    duration: 6000,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <StockListAddModalMainDivBox>
            <div className="Close_button_container" onClick={OnClose}>
                <CgCloseO></CgCloseO>
            </div>
            <div>
                <h4>재고 추가</h4>
                <div>
                    <h3>{SelectList?.breakfast_info_name}</h3>
                    <div>
                        <h4>수량</h4>
                        <div className="Count_Select_Container">
                            <button onClick={() => CountMinus()}>
                                <BiMinusCircle></BiMinusCircle>
                            </button>
                            <input type="number" value={CountList} onChange={e => setCountList(e.target.value)}></input>
                            <button onClick={() => CountPlus()}>
                                <BiPlusCircle></BiPlusCircle>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="Button_Cotainer">
                <button className="Submit" onClick={() => HandleListAdd()}>
                    수량 추가
                </button>

                <button className="Cancle" onClick={() => OnClose()}>
                    취소
                </button>
            </div>
        </StockListAddModalMainDivBox>
    );
};

export default StockListAddModal;
