import React from 'react';
import styled from 'styled-components';
import { BsPersonSquare } from 'react-icons/bs';
const FloorLayoutUserSelectMainDivBox = styled.div`
    border-left: 1px solid lightgray;
    position: fixed;
    top: 0vh;
    right: -400px;
    height: 100vh;
    background-color: #fff;
    animation: ${props => (props.UserSelect ? `slidein  0.5s forwards` : `slideOut  0.5s forwards`)};
    width: 400px;
    animation-fill-mode: forwards;
    @keyframes slidein {
        from {
            right: -400px;
        }

        to {
            right: 0px;
        }
    }
    @keyframes slideOut {
        from {
            right: 0px;
        }

        to {
            right: -400px;
        }
    }

    .User_Detail_Info {
        display: flex;
        justify-content: center;
        flex-flow: wrap;
        font-size: 1.2em;
        div {
            width: 100%;

            text-align: center;
        }
    }
`;

const FloorLayoutUserSelect = ({ UserSelect }) => {
    return (
        <FloorLayoutUserSelectMainDivBox UserSelect={UserSelect}>
            <div className="User_Detail_Info">
                <h2 style={{ fontSize: '4em', marginBottom: '10px' }}>
                    <BsPersonSquare></BsPersonSquare>
                </h2>
                <div>{UserSelect?.company}</div>
                <div>{UserSelect?.team}</div>
                <h3>{UserSelect?.name}</h3>
                <div>{UserSelect?.user_id}</div>
                <div>{UserSelect?.phone_number}</div>
            </div>
        </FloorLayoutUserSelectMainDivBox>
    );
};

export default FloorLayoutUserSelect;
