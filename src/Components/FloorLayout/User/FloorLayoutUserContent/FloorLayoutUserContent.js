import React from 'react';
import styled from 'styled-components';
import { BsFillCircleFill } from 'react-icons/bs';
const FloorLayoutUserContentMainDivBox = styled.div`
    position: relative;
    height: 100%;
    min-width: 2000px;
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
`;

const FloorLayoutUserContent = ({ PlaceState, setUserSelect, UserSelect }) => {
    const handleClickUser = (e, data, type) => {
        e.stopPropagation();
        if (type === 'UserSelect' && data.user_id) {
            setUserSelect(data);
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
                                            : '2px solid darkgray'
                                    }`,
                                    backgroundColor: `${UserSelect?.user_id === list.user_id ? 'lightgray' : ''}`,
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
                                        <div>-</div>
                                    )}
                                    {list.name && list.type === 'table' ? (
                                        <div className="User_Working_Checking" style={i % 3 === 1 ? { backgroundColor: 'red' } : {}}></div>
                                    ) : (
                                        <div></div>
                                    )}
                                    {list.type === 'room' ? (
                                        <div
                                            className="User_Working_Checking_Room"
                                            style={
                                                i % 3 === 1
                                                    ? { backgroundColor: 'red', height: `${list.height / 3}px` }
                                                    : { height: `${list.height / 3}px` }
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
            </div>
        </FloorLayoutUserContentMainDivBox>
    );
};

export default FloorLayoutUserContent;
