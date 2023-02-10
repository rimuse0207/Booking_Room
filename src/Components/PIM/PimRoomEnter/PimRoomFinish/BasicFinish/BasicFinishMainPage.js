import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import RoomNav from '../../../PimNav/RoomNav';
import { FaCrown } from 'react-icons/fa';
import { GiFloorHatch } from 'react-icons/gi';

const BasicFinishMainPageMainDivBox = styled.div``;

const BasicFinishMainPage = () => {
    const [Attention, setAttention] = useState([
        { title: '게임당 투표는 최대 3만Will까지 투표가 가능합니다.' },
        { title: '자신에게 한 투표는 결과합계에 반영되지 않습니다.' },
        { title: '투표금액은 자기자신밖에 볼 수 없습니다.' },
    ]);
    const [MatchState, setMatchState] = useState([
        {
            local_pim_match_blue_team_info_fighter_name: '유성재',
            local_pim_match_blue_team_info_fighter_id: '',
            local_pim_match_red_team_info_fighter_name: '김성준',
            local_pim_match_red_team_info_fighter_id: '',
            local_pim_match_red_team_info_match_key: 'adadad',
        },
    ]);

    return (
        <BasicFinishMainPageMainDivBox>
            <RoomNav Attention={Attention}></RoomNav>
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
                                    <div className="Fighter_Container_Blue" onClick={{}}>
                                        <h2>
                                            <FaCrown></FaCrown>승리
                                        </h2>
                                        <div>
                                            <div></div>
                                            <h5>{list.local_pim_match_blue_team_info_fighter_name}</h5>
                                            <div>{list.local_pim_match_blue_team_info_fighter_id}</div>
                                            <div>투표금액 : 10,000 Will</div>
                                            <div>배당금액 : +5,000 Will</div>
                                        </div>
                                    </div>
                                    <div className="Fighter_Container_Middle"> VS </div>
                                    <div className="Fighter_Container_Red" onClick={{}} style={{ opacity: 0.5 }}>
                                        <h2>
                                            <GiFloorHatch></GiFloorHatch>패배
                                        </h2>
                                        <div>
                                            <h5>{list.local_pim_match_red_team_info_fighter_name}</h5>
                                            <div>{list.local_pim_match_red_team_info_fighter_id}</div>
                                            <div>투표금액 : 10,000 Will</div>
                                            <div>배당금액 : -10,000 Will</div>
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
