import React from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import { TiDelete } from 'react-icons/ti';
const WindowPickerMainDivBox = styled.div`
    background-color: blue;

    .delete_button {
        display: none;
    }
    :hover {
        .delete_button {
            display: block;
            :hover {
                cursor: pointer;
                color: red;
            }
        }
    }
`;

const WindowLayout = ({ list, setPlaceState, PlaceState, setDelete_Data, Delete_Data }) => {
    const trackPos = data => {
        setPlaceState(
            PlaceState.map((item, j) => (item.state_id === list.state_id ? { ...item, PositionX: data.x, PositionY: data.y } : item))
        );
    };

    const handleDeleteButton = () => {
        setPlaceState(PlaceState.filter((item, j) => (item.state_id !== list.state_id ? item : '')));
        setDelete_Data(Delete_Data.concat(list));
    };

    return (
        <WindowPickerMainDivBox defaultPosition={{ x: list.PositionX, y: list.PositionY }}>
            <Draggable onDrag={(e, data) => trackPos(data)}>
                <div
                    className="box"
                    style={{
                        width: `${list.width ? list.width : 0}px`,
                        height: `${list.height ? list.height : 0}px`,
                        background: 'skyblue',
                    }}
                >
                    <div className="delete_button" onClick={() => handleDeleteButton()}>
                        <TiDelete></TiDelete>
                    </div>
                </div>
            </Draggable>
        </WindowPickerMainDivBox>
    );
};
export default WindowLayout;
