import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const FloorLayoutModalMainDivBox = styled.div`
    border: 1px solid lightgray;
    position: fixed;
    bottom: 0px;
    width: 100%;
    left: 0px;
    height: 100px;
    background-color: #fff;
    .Select_Info_Container {
        display: flex;
        justify-content: space-around;
    }
`;

const FloorLayoutModal = ({ list, setPlaceState, PlaceState, setSelected_Data, setPlace_Room_State, Place_Room_State }) => {
    const HandleChange = (e, targeting) => {
        if (targeting === '명칭') {
            setSelected_Data({ ...list, name: e.target.value });
        } else if (targeting === '넓이') {
            setSelected_Data({ ...list, width: Number(e.target.value) });
        } else if (targeting === '높이') {
            setSelected_Data({ ...list, height: Number(e.target.value) });
        } else if (targeting === 'X위치') {
            setSelected_Data({ ...list, PositionX: Number(e.target.value) });
        } else if (targeting === 'Y위치') {
            setSelected_Data({ ...list, PositionY: Number(e.target.value) });
        } else if (targeting === '이메일') {
            setSelected_Data({ ...list, user_id: e.target.value });
        }
    };
    const handleClcks = () => {
        setPlaceState(
            PlaceState.map((item, j) => {
                return item.state_id === list.state_id ? list : item;
            })
        );
        setPlace_Room_State(
            Place_Room_State.map((item, j) => {
                return item.state_id === list.state_id ? list : item;
            })
        );
    };

    useEffect(() => {
        console.log('list', list);
    }, [list]);

    return (
        <FloorLayoutModalMainDivBox>
            {list ? (
                <div className="Select_Info_Container">
                    <div>
                        <div>명칭</div>
                        <div>
                            <input type="text" value={list?.name} onChange={e => HandleChange(e, '명칭')}></input>
                        </div>
                    </div>
                    <div>
                        <div>넓이</div>
                        <div>
                            <input type="number" value={list?.width} onChange={e => HandleChange(e, '넓이')}></input>
                        </div>
                    </div>
                    <div>
                        <div>높이</div>
                        <div>
                            <input type="number" value={list?.height} onChange={e => HandleChange(e, '높이')}></input>
                        </div>
                    </div>
                    <div>
                        <div>X위치</div>
                        <div>
                            <input type="number" value={list?.PositionX} onChange={e => HandleChange(e, 'X위치')}></input>
                        </div>
                    </div>
                    <div>
                        <div>Y위치</div>
                        <div>
                            <input type="number" value={list?.PositionY} onChange={e => HandleChange(e, 'Y위치')}></input>
                        </div>
                    </div>

                    <div>
                        <div>유저 이메일</div>
                        <div>
                            <input type="text" value={list?.user_id} onChange={e => HandleChange(e, '이메일')}></input>
                        </div>
                    </div>
                    <div>
                        <button onClick={() => handleClcks()}>저장</button>
                    </div>
                </div>
            ) : (
                <div>선택 한 이후에 정보 수정 가능</div>
            )}
        </FloorLayoutModalMainDivBox>
    );
};

export default FloorLayoutModal;
