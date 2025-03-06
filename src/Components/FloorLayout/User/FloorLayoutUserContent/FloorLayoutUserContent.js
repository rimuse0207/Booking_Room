import React from 'react';
import styled from 'styled-components';
import { BsFillCircleFill } from 'react-icons/bs';
const FloorLayoutUserContentMainDivBox = styled.div`
    position: relative;
    height: 100%;

    /* min-height: 110vh; */

    .sdavc {
        .Detail_Info {
            display: none;
        }
        :hover {
            cursor: pointer;
        }
    }
    .box {
        border: 1px solid lightgray;
        position: absolute;
        border-radius: 10px;
        color: black;
        word-break: keep-all;
        :hover {
            cursor: pointer;
            color: #368;
            border: 1px solid #365;
        }
        .Font_Checking {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            text-align: center;

            .Chair {
                position: relative;
            }
            .Chair_container {
                position: absolute;
                top: -30px;
                left: -10px;
            }

            .User_Working_Checking {
                width: 60%;
                height: 2px;
                border-radius: 5px;
                background-color: lime;
                position: absolute;
                top: 3px;
                left: 20%;
                /* right: 8px; */
            }
            .User_Working_Checking_Room {
                width: 4px;
                /* height: 50px; */
                border-radius: 5px;
                background-color: lime;
                position: absolute;
                right: 8px;
            }
            .Font_Checking_Team {
                font-size: 0.7em;
                width: 100%;
                overflow-wrap: break-word;
                position: relative;
            }
            .Font_Checking_Name {
                font-size: 0.9em;
                width: 100%;
            }
        }
    }
    .Explane_Container {
        position: absolute;
        left: 0px;
        top: -70px;
        .Person_Green {
            display: flex;
            align-items: center;
            font-weight: bolder;
            .Person_Color {
                width: 50px;
                height: 10px;
                background-color: lime;
                border-radius: 10px;
            }
        }
        .Person_Red {
            display: flex;
            align-items: center;
            font-weight: bolder;
            margin-top: 10px;
            .Person_Color {
                width: 50px;
                height: 10px;
                background-color: red;
                border-radius: 10px;
            }
        }
    }
`;

const FloorLayoutUserContent = ({ PlaceState, setUserSelect, UserSelect }) => {
    const handleClickUser = (e, data, type) => {
        e.stopPropagation();
        if (type === 'UserSelect' && data.user_id) {
            setUserSelect(data);
        } else if (data.type === 'chair') {
            window.open('/2021Civil_5_4_FireExtinguisher.mp4');
        } else {
            setUserSelect(null);
        }
    };

    return (
        <FloorLayoutUserContentMainDivBox>
            <div onClick={e => handleClickUser(e, null, 'NotUserSelect')}>
                {PlaceState.map((list, i) => {
                    return (
                        <div className="sdavc" key={list.state_id}>
                            <div
                                className="box"
                                style={{
                                    width: `${list.width ? list.width : 0}px`,
                                    height: `${list.height ? list.height : 0}px`,
                                    transform: `translate(${list.PositionX}px, ${list.PositionY}px)`,
                                    border: `${
                                        list.type === 'table'
                                            ? UserSelect?.user_id === list.user_id
                                                ? '1px solid #368'
                                                : ''
                                            : list.type === 'chair'
                                            ? '1px solid red'
                                            : '2px solid darkgray'
                                    }`,
                                    backgroundColor: `${
                                        UserSelect?.user_id === list.user_id ? 'lightgray' : list.type === 'chair' ? 'red' : ''
                                    }`,
                                    color: `${UserSelect?.user_id === list.user_id ? '#368' : ''}`,
                                }}
                                onClick={e => handleClickUser(e, list, 'UserSelect')}
                            >
                                <div className="Font_Checking">
                                    {list.type === 'table' ? (
                                        <div className="Font_Checking_Team" style={{ fontSize: '.7em' }}>
                                            {list?.team}
                                        </div>
                                    ) : (
                                        <div className="Chair">
                                            {list.type === 'chair' ? <div className="Chair_container">소화기</div> : <div></div>}
                                        </div>
                                    )}
                                    {list.name && list.type === 'table' ? (
                                        <div
                                            className="User_Working_Checking"
                                            style={
                                                list.company === 'DHK'
                                                    ? list?.person_state.length > 0
                                                        ? list.person_state[0].status === '판교'
                                                            ? {}
                                                            : { backgroundColor: 'red' }
                                                        : { backgroundColor: 'red' }
                                                    : list.company === 'DHKS'
                                                    ? list?.person_state.length > 0
                                                        ? { backgroundColor: 'red' }
                                                        : {}
                                                    : {}
                                            }
                                        ></div>
                                    ) : (
                                        <div></div>
                                    )}

                                    <div className="Font_Checking_Name" style={{ fontSize: '.9em', fontWeight: 'bolder' }}>
                                        {list.name}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div className="Explane_Container">
                    <div className="Person_Green">
                        <div className="Person_Color"></div>
                        <div style={{ marginLeft: '10px' }}> : 출근</div>
                    </div>
                    <div className="Person_Red">
                        <div className="Person_Color"></div>
                        <div style={{ marginLeft: '10px' }}> : 휴가</div>
                    </div>
                </div>
            </div>
        </FloorLayoutUserContentMainDivBox>
    );
};

export default FloorLayoutUserContent;
