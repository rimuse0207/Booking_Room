import React from 'react';
import { CgCloseO } from 'react-icons/cg';
import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from '../../../../../ToasMessage/ToastManager';

const UserBattingModalMainDivBox = styled.div`
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
    .InputRange_Container {
        width: 80%;
        .Range_Text {
            display: flex;
            justify-content: space-between;
            font-size: 0.5em;
        }
        input {
            width: 100%;
        }
        .ticks {
            display: flex;
            font-size: 0.5em;
        }

        .o_txt {
            flex: 1;
        }
    }

    .BookingCheck_Cotainer {
        display: flex;
        align-items: center;
        @media only screen and (max-width: 800px) {
            /* display: block; */
            width: 90%;
        }

        .BookingCheck_Cotainer_Title {
            width: 100px;
            font-size: 1.1em;
            @media only screen and (max-width: 800px) {
                display: block;
                max-width: 90%;
            }
        }
        .BookingCheck_Cotainer_SubTitle {
            min-width: 200px;
            border-bottom: 1px solid lightgray;
            height: 40px;
            line-height: 42px;
            padding-left: 15px;
            border-radius: 5px;
            position: relative;
            font-weight: bolder;
            input {
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0px;
                top: 0px;
                border: none;
                padding-left: 15px;
                border-radius: 5px;
                :focus {
                    outline: 2px solid #2684ff;
                }
            }
            @media only screen and (max-width: 800px) {
                display: block;
                width: 100% !important;
                min-width: 0px;
            }
        }

        .basic-single {
            max-width: 500px;
            height: 40px;
            width: 100%;
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

const UserBattingModal = ({ SelectedBattingData, setBattingModalOpen, Get_Pim_Room_Now_Match_Lists }) => {
    const [BattingWill, setBattingWill] = useState(
        SelectedBattingData.MatchState.local_pim_batting_info_batting_user_id
            ? SelectedBattingData.MatchState.local_pim_batting_info_batting_money
            : 0
    );
    const LoginInfo = useSelector(state => state.LoginInfoDataRedux.Infomation);
    const handleChangeBattingWill = e => {
        setBattingWill(e.target.value);
    };

    const handleClickBatingUpdate = async () => {
        try {
            const Batting_Update_Axios = await axios.post(`${process.env.REACT_APP_DB_HOST}/LocalPim/Pim_Batting_Person_Update`, {
                SelectedBattingData,
                BattingWill,
                ID: LoginInfo.Login_id,
            });
            if (Batting_Update_Axios.data.dataSuccess && Batting_Update_Axios.data.FinishData) {
                toast.show({
                    title: `투표가 마감되었습니다. 잠시 후 결과페이지로 이동됩니다.`,
                    successCheck: false,
                    duration: 4000,
                });
                setTimeout(() => {
                    window.location.reload();
                }, 4000);
            } else if (Batting_Update_Axios.data.dataSuccess && !Batting_Update_Axios.data.FinishData) {
                Get_Pim_Room_Now_Match_Lists();
                setBattingModalOpen();
                toast.show({
                    title: `${
                        SelectedBattingData.Select_Team === 'blue'
                            ? SelectedBattingData.MatchState.local_pim_match_blue_team_info_fighter_name
                            : SelectedBattingData.MatchState.local_pim_match_red_team_info_fighter_name
                    }님에게 ${Number(BattingWill).toLocaleString()}Will로 투표 변경하였습니다.`,
                    successCheck: true,
                    duration: 6000,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleClickBatingSave = async () => {
        if (BattingWill === 0) {
            toast.show({
                title: `투표금액을 변경 이후에 다시 투표 해주세요.`,
                successCheck: false,
                duration: 3000,
            });
            return;
        }
        try {
            const Batting_Save_Axios = await axios.post(`${process.env.REACT_APP_DB_HOST}/LocalPim/Pim_Batting_Person`, {
                SelectedBattingData,
                BattingWill,
                ID: LoginInfo.Login_id,
            });

            if (Batting_Save_Axios.data.dataSuccess && Batting_Save_Axios.data.FinishData) {
                toast.show({
                    title: `투표가 마감되었습니다. 잠시 후 결과페이지로 이동됩니다.`,
                    successCheck: false,
                    duration: 4000,
                });
                setTimeout(() => {
                    window.location.reload();
                }, 4000);
            } else if (Batting_Save_Axios.data.dataSuccess && !Batting_Save_Axios.data.FinishData) {
                Get_Pim_Room_Now_Match_Lists();
                setBattingModalOpen();
                toast.show({
                    title: `${
                        SelectedBattingData.Select_Team === 'blue'
                            ? SelectedBattingData.MatchState.local_pim_match_blue_team_info_fighter_name
                            : SelectedBattingData.MatchState.local_pim_match_red_team_info_fighter_name
                    }님에게 ${Number(BattingWill).toLocaleString()}Will 투표하였습니다.`,
                    successCheck: true,
                    duration: 6000,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <UserBattingModalMainDivBox>
            <div className="Close_button_container" onClick={setBattingModalOpen}>
                <CgCloseO></CgCloseO>
            </div>

            <div className="BookingCheck_Cotainer">
                <h4 className="BookingCheck_Cotainer_Title">발표 팀 : </h4>
                <div
                    className="BookingCheck_Cotainer_SubTitle"
                    style={SelectedBattingData.Select_Team === 'blue' ? { color: 'blue' } : { color: 'red' }}
                >
                    {SelectedBattingData.Select_Team === 'blue' ? 'Blue 팀' : 'Red 팀'}
                </div>
            </div>

            <div className="BookingCheck_Cotainer">
                <h4 className="BookingCheck_Cotainer_Title">발표자 : </h4>
                <div className="BookingCheck_Cotainer_SubTitle">
                    {SelectedBattingData.Select_Team === 'blue'
                        ? SelectedBattingData.MatchState.local_pim_match_blue_team_info_fighter_name
                        : SelectedBattingData.MatchState.local_pim_match_red_team_info_fighter_name}
                </div>
            </div>

            <h2>{Number(BattingWill).toLocaleString()} Will</h2>
            <div className="InputRange_Container">
                <input
                    type="range"
                    min={0}
                    max={30000}
                    step={1000}
                    value={BattingWill}
                    onInput={e => {
                        handleChangeBattingWill(e);
                    }}
                    list={'steplist'}
                ></input>
                <datalist id="steplist">
                    <option>0</option>
                    <option>5000</option>
                    <option>10000</option>
                    <option>15000</option>
                    <option>20000</option>
                    <option>25000</option>
                    <option>30000</option>
                </datalist>
                <div class="ticks">
                    <span class="o_txt" style={{ paddingLeft: '5px' }}>
                        0
                    </span>
                    <span class="o_txt" style={{ textAlign: 'center' }}>
                        15,000
                    </span>
                    <span class="o_txt" style={{ textAlign: 'end' }}>
                        30,000
                    </span>
                </div>
            </div>
            <div className="Button_Cotainer">
                {SelectedBattingData.MatchState.local_pim_batting_info_batting_user_id ? (
                    <button className="Submit" onClick={() => handleClickBatingUpdate()}>
                        변경
                    </button>
                ) : (
                    <button className="Submit" onClick={() => handleClickBatingSave()}>
                        투표
                    </button>
                )}

                <button className="Cancle" onClick={() => setBattingModalOpen()}>
                    취소
                </button>
            </div>
        </UserBattingModalMainDivBox>
    );
};

export default UserBattingModal;
