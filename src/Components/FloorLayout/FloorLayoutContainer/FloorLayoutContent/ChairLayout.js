import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import { TiDelete } from 'react-icons/ti';

const ChairPickerMainDivBox = styled.div`
    .delete_button {
        display: none;
    }
    :hover {
        .delete_button {
            display: block;
            position: absolute;
            top: -15px;
            right: -15px;
            :hover {
                cursor: pointer;
                color: red;
            }
        }
    }
`;
const ChairLayout = ({ list, setPlaceState, PlaceState, setSelected_Data, setDelete_Data, Delete_Data }) => {
    const Selected_Data = useRef(null);
    const trackPos = data => {
        setPlaceState(
            PlaceState.map((item, j) => (item.state_id === list.state_id ? { ...item, PositionX: data.x, PositionY: data.y } : item))
        );
    };
    const handleDeleteButton = () => {
        setPlaceState(PlaceState.filter((item, j) => (item.state_id !== list.state_id ? item : '')));
        setDelete_Data(Delete_Data.concat(list));
    };

    const handleClicksData = e => {
        if (Selected_Data.current) {
            for (var i = 0; i < Selected_Data.current.parentElement.parentElement.childNodes.length; i++) {
                Selected_Data.current.parentElement.parentElement.childNodes[i].children[0].style.border = '';
            }
            Selected_Data.current.style.border = '1px solid blue';
            e.stopPropagation();
            setSelected_Data(list);
        }
    };

    return (
        <ChairPickerMainDivBox>
            <Draggable onDrag={(e, data) => trackPos(data)} defaultPosition={{ x: list.PositionX, y: list.PositionY }}>
                <div
                    ref={Selected_Data}
                    className="box"
                    style={{ width: `${list.width ? list.width : 0}px`, height: `${list.height ? list.height : 0}px`, background: 'black' }}
                    onDoubleClick={e => handleClicksData(e)}
                >
                    <div className="delete_button" onClick={() => handleDeleteButton()}>
                        <TiDelete></TiDelete>
                    </div>
                    <div></div>
                </div>
            </Draggable>
        </ChairPickerMainDivBox>
    );
};
export default ChairLayout;
