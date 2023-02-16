import React from 'react';
import styled from 'styled-components';
import { CgCloseO } from 'react-icons/cg';
import { useCallback } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Loader_Check_For_False, Loader_Check_For_True } from '../../../../../Models/LoaderCheckReducer/LoaderCheckReducer';
import { useDispatch } from 'react-redux';
import { BiMinusCircle, BiPlusCircle } from 'react-icons/bi';
import { toast } from '../../../../ToasMessage/ToastManager';

const StockAddDataModalMainDivBox = styled.div`
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
    .Menu_Title {
        margin-top: 30px;
        margin-bottom: 10px;
        font-size: 1.1em;
        font-weight: bolder;
    }
    input {
        border: 1px solid lightgray;
        width: 90%;
        padding-left: 15px;
        min-height: 40px;
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

const StockAddDataModal = ({ OnClose, Get_NowDates_Apply_User_Select }) => {
    const dispatch = useDispatch();
    const [FileStateData, setFileStateData] = useState(null);
    const [BreakFast_Data, setBreakFast_Data] = useState({
        Food_Name: '',
        Food_Count: 1,
    });

    const CountMinus = () => {
        setBreakFast_Data({ ...BreakFast_Data, Food_Count: Number(BreakFast_Data.Food_Count) - 1 });
    };

    const CountPlus = () => {
        setBreakFast_Data({ ...BreakFast_Data, Food_Count: Number(BreakFast_Data.Food_Count) + 1 });
    };

    const HandleDataAdd = async () => {
        try {
            if (!FileStateData || !BreakFast_Data.Food_Name || BreakFast_Data.Food_Count <= 0) {
                alert('정확하게 공란을 적어 주세요.');
                return;
            }

            const BreakFast_Stock_Data_Insert_Axios = await axios.post(
                `${process.env.REACT_APP_DB_HOST}/FoodApp/BreakFast_Stock_Data_Insert`,
                {
                    FileStateData,
                    BreakFast_Data,
                }
            );

            if (BreakFast_Stock_Data_Insert_Axios.data.dataSuccess) {
                Get_NowDates_Apply_User_Select();
                OnClose();
                toast.show({
                    title: `조식물품을 성공적으로 등록 완료하였습니다.`,
                    successCheck: true,
                    duration: 6000,
                });
            } else {
                toast.show({
                    title: `상품명이 중복됩니다. 확인 후 다시 시도해주세요.`,
                    successCheck: false,
                    duration: 4000,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onUploadImage = useCallback(async e => {
        dispatch(Loader_Check_For_False());
        if (!e.target.files) {
            dispatch(Loader_Check_For_False());
            return;
        }
        dispatch(Loader_Check_For_True());
        const formData = new FormData();
        formData.append('image', e.target.files[0]);

        const dataSendImageFromServer = await axios.post(`${process.env.REACT_APP_DB_HOST}/FoodApp/BreakFast_Image_Upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if (dataSendImageFromServer.data.dataSuccess) {
            setTimeout(() => {
                setFileStateData(dataSendImageFromServer.data.Image_data);
                dispatch(Loader_Check_For_False());
            }, [2000]);
        } else {
            dispatch(Loader_Check_For_False());
        }
    }, []);

    return (
        <StockAddDataModalMainDivBox>
            <div className="Close_button_container" onClick={OnClose}>
                <CgCloseO></CgCloseO>
            </div>
            <h3>조식 물품 등록</h3>
            <div>
                <div className="Menu_Title">메뉴 사진 : </div>
                {FileStateData ? (
                    <div style={{ marginBottom: '50px' }}>
                        <div></div>
                        <img
                            src={`${process.env.REACT_APP_DB_HOST}/FoodImages/${FileStateData.filename.split('.')[0]}_resize.jpg`}
                            width="300px"
                            alt="사진업로드"
                        ></img>
                    </div>
                ) : (
                    <div>
                        <input type="file" accept="image/*" name="thumbnail" onChange={onUploadImage}></input>
                    </div>
                )}

                <div>
                    <div className="Menu_Title">메뉴명 : </div>
                    <input
                        value={BreakFast_Data.Food_Name}
                        placeholder="조식 메뉴명을 입력 해주세요."
                        onChange={e => setBreakFast_Data({ ...BreakFast_Data, Food_Name: e.target.value })}
                    ></input>
                </div>
                <div>
                    <div className="Menu_Title">수량 : </div>
                    <div className="Count_Select_Container">
                        <button onClick={() => CountMinus()}>
                            <BiMinusCircle></BiMinusCircle>
                        </button>
                        <input
                            style={{ width: '50px' }}
                            type="number"
                            value={BreakFast_Data.Food_Count}
                            onChange={e => setBreakFast_Data({ ...BreakFast_Data, Food_Count: e.target.value })}
                        ></input>
                        <button onClick={() => CountPlus()}>
                            <BiPlusCircle></BiPlusCircle>
                        </button>
                    </div>
                </div>
            </div>
            <div className="Button_Cotainer">
                <button className="Submit" onClick={() => HandleDataAdd()}>
                    물품 등록
                </button>

                <button className="Cancle" onClick={() => OnClose()}>
                    취소
                </button>
            </div>
        </StockAddDataModalMainDivBox>
    );
};

export default StockAddDataModal;
