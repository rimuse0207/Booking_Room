import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import UserBattingModal from './UserSelectModal/UserBattingModal';
import { FaArrowLeft } from 'react-icons/fa';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RoomNav from '../../../PimNav/RoomNav';
import { IoQrCodeSharp } from 'react-icons/io5';
import { request } from '../../../../../API';
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '500px',
        minHeight: '300px',
        width: '90%',
        maxHeight: '90%',
    },
};
Modal.setAppElement('#SelectModal');

const BasicOngoingMainPageMainDivBox = styled.div`
    .Fighter_Container_Blue,
    .Fighter_Container_Red {
        position: relative;
        :hover {
            cursor: pointer;
        }
        .Batting_Finished {
            position: absolute;
            top: -20px;
            left: 10px;
            background-color: #efefef;
            border-radius: 5px;
            font-size: 1.2em;
            font-weight: bolder;
            width: 90%;
            min-height: 40px;
            line-height: 40px;
            border: 2px solid gray;
            background-color: #fff;
        }
    }
`;

const BasicOngoingMainPage = ({ Room_Keys }) => {
    const { Room_Title } = useParams();
    const [MatchState, setMatchState] = useState([]);
    const [BattingModalOpen, setBattingModalOpen] = useState(false);
    const [SelectedBattingData, setSelectedBattingData] = useState(null);
    const LoginInfo = useSelector(state => state.LoginInfoDataRedux.Infomation);
    const [Attention, setAttention] = useState([
        { title: '게임당 투표는 최대 3만Will까지 투표가 가능합니다.' },
        { title: '자신에게 한 투표는 결과합계에 반영되지 않습니다.' },
        { title: '투표금액은 자기자신밖에 볼 수 없습니다.' },
    ]);
    const handleClickTeamBeating = (data, team) => {
        if (team === 'blue') {
            setSelectedBattingData({
                MatchState: data,
                Select_Team: team,
            });
            setBattingModalOpen(true);
        } else if (team === 'red') {
            setSelectedBattingData({
                MatchState: data,
                Select_Team: team,
            });
            setBattingModalOpen(true);
        }
    };

    const Get_Pim_Room_Now_Match_Lists = async () => {
        try {
            const Get_Pim_Room_Info_Axios = await request.get(`/LocalPim/Pim_Room_Now_Match_Lists`, {
                params: {
                    Room_Keys,
                    ID: LoginInfo.Login_id,
                },
            });
            if (Get_Pim_Room_Info_Axios.data.dataSuccess) {
                setMatchState(Get_Pim_Room_Info_Axios.data.Match_lists_Rows);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleQRCode_Make = () => {
        window.open(`/PIM/QRCode/${Room_Keys}/${Room_Title}`);
    };
    useEffect(() => {
        Get_Pim_Room_Now_Match_Lists();
    }, []);

    return (
        <BasicOngoingMainPageMainDivBox>
            <RoomNav Attention={Attention}></RoomNav>
            <div>
                <div>
                    <IoQrCodeSharp></IoQrCodeSharp>
                </div>
                <button onClick={() => handleQRCode_Make()}>QR코드 생성</button>
            </div>

            <div className="Fight_Box">
                <div className="Fighter_Team_Division">
                    <h3 style={{ color: 'blue' }}>Blue 팀</h3>
                    <h3 style={{ color: 'red' }}>Red 팀</h3>
                </div>
                <div>
                    {MatchState.map((list, i) => {
                        return (
                            <div className="Matched_container" key={list.local_pim_match_red_team_info_match_key}>
                                <h2>{i + 1}</h2>
                                <div className="Fighter_Container">
                                    <div className="Fighter_Container_Blue" onClick={() => handleClickTeamBeating(list, 'blue')}>
                                        <div>
                                            <h5>{list.local_pim_match_blue_team_info_fighter_name}</h5>
                                            <div>{list.local_pim_match_blue_team_info_fighter_id}</div>
                                        </div>

                                        {list.local_pim_batting_info_batting_user_id &&
                                        list.local_pim_batting_info_match_user_id === list.local_pim_match_blue_team_info_fighter_id ? (
                                            <div className="Batting_Finished">
                                                {Number(list.local_pim_batting_info_batting_money).toLocaleString()}
                                            </div>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                    <div className="Fighter_Container_Middle"> VS </div>
                                    <div className="Fighter_Container_Red" onClick={() => handleClickTeamBeating(list, 'red')}>
                                        <div>
                                            <h5>{list.local_pim_match_red_team_info_fighter_name}</h5>
                                            <div>{list.local_pim_match_red_team_info_fighter_id}</div>
                                            <div>
                                                {list.local_pim_batting_info_batting_user_id &&
                                                list.local_pim_batting_info_match_user_id ===
                                                    list.local_pim_match_red_team_info_fighter_id ? (
                                                    <div className="Batting_Finished">
                                                        {Number(list.local_pim_batting_info_batting_money).toLocaleString()}
                                                    </div>
                                                ) : (
                                                    ''
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <Modal isOpen={BattingModalOpen} style={customStyles} contentLabel="Select Modal">
                <UserBattingModal
                    setBattingModalOpen={() => setBattingModalOpen(false)}
                    SelectedBattingData={SelectedBattingData}
                    Get_Pim_Room_Now_Match_Lists={() => Get_Pim_Room_Now_Match_Lists()}
                ></UserBattingModal>
            </Modal>
        </BasicOngoingMainPageMainDivBox>
    );
};

export default BasicOngoingMainPage;
