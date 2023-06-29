import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import RoomNav from '../../../PimNav/RoomNav';
import { FaCrown } from 'react-icons/fa';
import { GiFloorHatch } from 'react-icons/gi';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { request } from '../../../../../API';
import { FaFileExcel } from "react-icons/fa";
import { BrowserView, MobileView } from 'react-device-detect';
const BasicFinishMainPageMainDivBox = styled.div`
    .topyo_money_container {
        background: lightgray;
        padding-top: 10px;
        border-radius: 10px;
        padding-bottom: 10px;
    }
    position:relative;
    .Excel_Download_Container{
        position:absolute;
        top:10px;
        right:10px;
        font-size:2em;
        color:green;
    }
`;

const BasicFinishMainPage = ({ Room_Keys }) => {
    const LoginInfo = useSelector(state => state.LoginInfoDataRedux.Infomation);
    const [Attention, setAttention] = useState([
        { title: '총 투표금액은 자기자신에게까지 투표한 총 금액입니다.' },
        { title: '승패의 결과는 유효한 투표금액 기준으로 나타납니다.' },
        { title: '유효한 투표금액은 자기자신에게 투표한 금액을 제외한 투표금액입니다.' },
    ]);
    const [MatchState, setMatchState] = useState([]);


    const Handle_Excel_Download_Batting_Data = async () => {
        try {
            
            const Handle_Excel_Download_Batting_Data_Axios = await request.get(`/LocalPim/Handle_Excel_Download_Batting_Data`, {
                params: {
                    Room_Keys,
                    ID: LoginInfo.Login_id,
                },
            })

            if (Handle_Excel_Download_Batting_Data_Axios.data.dataSuccess) {
                console.log(Handle_Excel_Download_Batting_Data_Axios)
            }

        } catch (error) {
            console.log(error);
        }
    }


    const getData = async () => {
        try {
            const getData_Result_From_Axios = await request.get(`/LocalPim/Pim_Room_Result_Match_Lists`, {
                params: {
                    Room_Keys,
                    ID: LoginInfo.Login_id,
                },
            });

            if (getData_Result_From_Axios.data.dataSuccess) {
                setMatchState(getData_Result_From_Axios.data.Get_Result_Match_Data_Rows);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
        
    }, []);

    return (
        <BasicFinishMainPageMainDivBox>
            <RoomNav Attention={Attention}></RoomNav>
            <BrowserView>
                <div className="Excel_Download_Container" onClick={()=>Handle_Excel_Download_Batting_Data()}>
                    <FaFileExcel></FaFileExcel>
                </div>
            </BrowserView>
            
            <div className="Fight_Box">
                <div className="Fighter_Team_Division">
                    <h3 style={{ color: 'blue' }}>Blue 팀</h3>
                    <h3 style={{ color: 'red' }}>Red 팀</h3>
                </div>
                <div>
                    {MatchState.map((list, i) => {
                        return (
                            <div className="Matched_container" key={list.local_pim_batting_result_info_match_key}>
                                <h2>{i + 1}</h2>
                                <div className="Fighter_Container">
                                    <div
                                        className="Fighter_Container_Blue"
                                        style={list.local_pim_batting_result_info_team === 'blue' ? {} : { opacity: 0.5 }}
                                    >
                                        <h3>
                                            총 투표금액 :{' '}
                                            {Number(
                                                list.local_pim_batting_result_info_team === 'blue'
                                                    ? list.local_pim_batting_result_info_victory_team_sum_money
                                                    : list.local_pim_batting_result_info_defeat_team_sum_money
                                            ).toLocaleString()}{' '}
                                            Will
                                        </h3>
                                        {list.local_pim_batting_result_info_team === 'blue' ? (
                                            <div>
                                                <h2 style={{ color: '#999900' }}>
                                                    <FaCrown></FaCrown>
                                                </h2>
                                                <h2>승리</h2>
                                            </div>
                                        ) : list.local_pim_batting_result_info_team === 'draw' ? (
                                            <div>
                                                <h2>
                                                    <GiFloorHatch></GiFloorHatch>
                                                </h2>
                                                <h2>무승부</h2>
                                            </div>
                                        ) : (
                                            <div>
                                                <h2>
                                                    <GiFloorHatch></GiFloorHatch>
                                                </h2>
                                                <h2>패배</h2>
                                            </div>
                                        )}
                                        <div>
                                            <div></div>
                                            <h5>{list.local_pim_match_blue_team_info_fighter_name}</h5>
                                            <div>{list.local_pim_match_blue_team_info_fighter_id}</div>

                                            {list.local_pim_batting_info_match_user_id ===
                                            list.local_pim_match_blue_team_info_fighter_id ? (
                                                <h4 className="topyo_money_container">
                                                    투표금액 : {Number(list.local_pim_batting_info_batting_money).toLocaleString()} Will
                                                </h4>
                                            ) : (
                                                ''
                                            )}
                                            {list.local_pim_dividend_info_dividend_money &&
                                            list.local_pim_batting_result_info_team === 'blue' ? (
                                                <h4>
                                                    배당금액 : + {Number(list.local_pim_dividend_info_dividend_money).toLocaleString()} Will
                                                </h4>
                                            ) : (
                                                ''
                                            )}
                                        </div>
                                    </div>
                                    <div className="Fighter_Container_Middle"> VS </div>
                                    <div
                                        className="Fighter_Container_Red"
                                        style={list.local_pim_batting_result_info_team === 'red' ? {} : { opacity: 0.5 }}
                                    >
                                        <h3>
                                            총 투표금액 :{' '}
                                            {Number(
                                                list.local_pim_batting_result_info_team === 'red'
                                                    ? list.local_pim_batting_result_info_victory_team_sum_money
                                                    : list.local_pim_batting_result_info_defeat_team_sum_money
                                            ).toLocaleString()}{' '}
                                            Will
                                        </h3>
                                        {list.local_pim_batting_result_info_team === 'red' ? (
                                            <div>
                                                <h2 style={{ color: '#999900' }}>
                                                    <FaCrown></FaCrown>
                                                </h2>
                                                <h2>승리</h2>
                                            </div>
                                        ) : list.local_pim_batting_result_info_team === 'draw' ? (
                                            <div>
                                                <h2>
                                                    <GiFloorHatch></GiFloorHatch>
                                                </h2>
                                                <h2>무승부</h2>
                                            </div>
                                        ) : (
                                            <div>
                                                <h2>
                                                    <GiFloorHatch></GiFloorHatch>
                                                </h2>
                                                <h2>패배</h2>
                                            </div>
                                        )}
                                        <div>
                                            <h5>{list.local_pim_match_red_team_info_fighter_name}</h5>
                                            <div>{list.local_pim_match_red_team_info_fighter_id}</div>

                                            {list.local_pim_batting_info_match_user_id === list.local_pim_match_red_team_info_fighter_id ? (
                                                <h4 className="topyo_money_container">
                                                    투표금액 : {Number(list.local_pim_batting_info_batting_money).toLocaleString()} Will
                                                </h4>
                                            ) : (
                                                ''
                                            )}
                                            {list.local_pim_dividend_info_dividend_money &&
                                            list.local_pim_batting_result_info_team === 'red' ? (
                                                <h4>
                                                    배당금액 : + {Number(list.local_pim_dividend_info_dividend_money).toLocaleString()} Will
                                                </h4>
                                            ) : (
                                                ''
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </BasicFinishMainPageMainDivBox>
    );
};

export default BasicFinishMainPage;
