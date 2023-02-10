import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CgCloseO } from 'react-icons/cg';
import axios from 'axios';
import { HiOutlinePlusCircle, HiOutlineMinusCircle } from 'react-icons/hi';
import { TbArrowsRandom, TbClick } from 'react-icons/tb';
import { toast } from '../../../../../ToasMessage/ToastManager';

export const RandomUserSelectModalMainDivBox = styled.div`
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

    .Can_Selected_List_Container_Box {
        border: 1px dotted lightgray;
        margin-bottom: 30px;
        h4 {
            margin-top: 0px;
            margin-left: 10px;
        }
        .Can_Selected_List_Container {
            ul {
                display: flex;
                flex-wrap: wrap;
                li {
                    border: 0.5px dashed black;
                    margin: 10px;
                    display: flex;
                    width: 100px;
                    padding: 5px;
                    padding-left: 10px;
                    padding-right: 10px;
                    justify-content: space-between;
                    font-weight: bolder;
                    :hover {
                        cursor: pointer;
                        opacity: 0.8;
                        .Plus_Icon {
                            color: green;
                            transition: all 0.5s;
                        }
                        .Minus_Icon {
                            color: red;
                            transition: all 0.5s;
                        }
                    }
                }
            }
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

const RandomUserSelectModal = ({
    setRandomUserSelectModalOpen,
    Room_Keys,

    setMatchState,
    MatchState,
}) => {
    const [UserSelectData, setUserSelectData] = useState([]);
    const [RandomSelectData, setRandomSelectData] = useState([]);
    const GetSelect_Person = async () => {
        try {
            const Get_Select_Person_Data_Axios = await axios.get(`${process.env.REACT_APP_DB_HOST}/LocalPim/Pim_Preson_Keys`, {
                params: {
                    Room_Keys,
                },
            });

            if (Get_Select_Person_Data_Axios.data.dataSuccess) {
                setUserSelectData(Get_Select_Person_Data_Axios.data.Select_Data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleClickRandomUserData = data => {
        if (
            MatchState.reduce((cnt, element) => cnt + !element.Blue_Fighter_ID, 0) +
                MatchState.reduce((cnt, element) => cnt + !element.Red_Fighter_ID, 0) <
            RandomSelectData.length + 1
        ) {
            toast.show({
                title: ` 대전 수 보다 선택한 인원이 많습니다. 대전을 추가 한 이후에 다시 시도해주세요.`,
                successCheck: false,
                duration: 3000,
            });
        } else {
            setRandomSelectData(RandomSelectData.concat(data));
        }
    };

    const handleClickRandomUserDataDelete = data => {
        setRandomSelectData(RandomSelectData.filter(list => list.value !== data.value));
    };

    const getRandomInt = max => {
        return Math.floor(Math.random() * max);
    };

    const handleSaveRandoms = () => {
        let NowMatchState = MatchState;
        let Can_SelectData = RandomSelectData;

        for (var i = 0; i < NowMatchState.length; i++) {
            if (!NowMatchState[i].Blue_Fighter_ID) {
                const RandomNumber = getRandomInt(Can_SelectData.length);
                NowMatchState[i].Blue_Fighter_ID = Can_SelectData[RandomNumber].value;
                NowMatchState[i].Blue_Fighter = Can_SelectData[RandomNumber].label.split('||')[0];

                delete Can_SelectData[RandomNumber];
                Can_SelectData = Can_SelectData.filter(data => data !== undefined);
            }
            if (!NowMatchState[i].Red_Fighter_ID) {
                const RandomNumber = getRandomInt(Can_SelectData.length);
                NowMatchState[i].Red_Fighter_ID = Can_SelectData[RandomNumber].value;
                NowMatchState[i].Red_Fighter = Can_SelectData[RandomNumber].label.split('||')[0];

                delete Can_SelectData[RandomNumber];
                Can_SelectData = Can_SelectData.filter(data => data !== undefined);
            }
        }

        for (var i = 0; i < NowMatchState.length - 1; i++) {
            if (NowMatchState[i].Blue_Fighter_ID === NowMatchState[i].Red_Fighter_ID) {
                if (NowMatchState[i + 1].Red_Fighter_ID) {
                    const Before_datas = {
                        basic: NowMatchState[i].Red_Fighter,
                        ID: NowMatchState[i].Red_Fighter_ID,
                    };

                    NowMatchState[i].Red_Fighter = NowMatchState[i + 1].Red_Fighter;
                    NowMatchState[i].Red_Fighter_ID = NowMatchState[i + 1].Red_Fighter_ID;

                    NowMatchState[i + 1].Red_Fighter = Before_datas.basic;
                    NowMatchState[i + 1].Red_Fighter_ID = Before_datas.ID;
                } else if (NowMatchState[i - 1].Red_Fighter_ID) {
                    const Before_datas = {
                        basic: NowMatchState[i].Red_Fighter,
                        ID: NowMatchState[i].Red_Fighter_ID,
                    };

                    NowMatchState[i].Red_Fighter = NowMatchState[i - 1].Red_Fighter;
                    NowMatchState[i].Red_Fighter_ID = NowMatchState[i - 1].Red_Fighter_ID;

                    NowMatchState[i - 1].Red_Fighter = Before_datas.basic;
                    NowMatchState[i - 1].Red_Fighter_ID = Before_datas.ID;
                }
            }
        }

        setMatchState(NowMatchState);
        setRandomUserSelectModalOpen(false);
    };

    useEffect(() => {
        GetSelect_Person();
    }, []);

    return (
        <RandomUserSelectModalMainDivBox>
            <div className="Close_button_container" onClick={setRandomUserSelectModalOpen}>
                <CgCloseO></CgCloseO>
            </div>
            <div>*주의사항</div>
            <div style={{ fontSize: '0.7em', paddingLeft: '10px', marginTop: '5px', marginBottom: '10px' }}>
                해당 방에 접속이 가능한 인원만 선택 가능합니다.
            </div>
            <div className="Can_Selected_List_Container_Box">
                <div>
                    <TbClick></TbClick>
                </div>
                <h4>선택 가능 인원</h4>
                <div className="Can_Selected_List_Container">
                    <ul>
                        {UserSelectData.map(list => {
                            return (
                                <li onClick={() => handleClickRandomUserData(list)} key={list.value}>
                                    <div>{list.label.split('||')[0]}</div>
                                    <div className="Plus_Icon">
                                        <HiOutlinePlusCircle></HiOutlinePlusCircle>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>

            <div className="Can_Selected_List_Container_Box">
                <div>
                    <TbArrowsRandom></TbArrowsRandom>
                </div>
                <h4>
                    랜덤 선택 인원 ( 최대{' '}
                    {MatchState.reduce((cnt, element) => cnt + !element.Blue_Fighter_ID, 0) +
                        MatchState.reduce((cnt, element) => cnt + !element.Red_Fighter_ID, 0) -
                        RandomSelectData.length}
                    명까지 선택 가능 )
                </h4>
                <div className="Can_Selected_List_Container">
                    <ul>
                        {RandomSelectData.map(list => {
                            return (
                                <li onClick={() => handleClickRandomUserDataDelete(list)} key={list.value}>
                                    <div>{list.label.split('||')[0]}</div>
                                    <div className="Minus_Icon">
                                        <HiOutlineMinusCircle></HiOutlineMinusCircle>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>

            <div className="Button_Cotainer">
                <button className="Submit" onClick={() => handleSaveRandoms()}>
                    저장
                </button>
                <button className="Cancle" onClick={() => setRandomUserSelectModalOpen(false)}>
                    취소
                </button>
            </div>
        </RandomUserSelectModalMainDivBox>
    );
};

export default RandomUserSelectModal;
