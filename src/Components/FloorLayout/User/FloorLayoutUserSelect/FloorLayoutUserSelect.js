import React from 'react';
import styled from 'styled-components';
import { BsPersonSquare } from 'react-icons/bs';
import { MdArrowForwardIos } from 'react-icons/md';
import { TiDelete } from 'react-icons/ti';
import { useState } from 'react';
import { useRef } from 'react';
import axios from 'axios';
import { request } from '../../../../API';
import { useSelector } from 'react-redux';
const FloorLayoutUserSelectMainDivBox = styled.div`
    border-left: 1px solid lightgray;
    position: fixed;
    top: 8vh;
    right: -400px;
    height: 92vh;
    background-color: #fff;
    animation: ${props => (props.UserSelect ? `slidein  0.5s forwards` : `slideOut  0.5s forwards`)};
    width: 300px;
    animation-fill-mode: forwards;
    padding: 10px;
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
        font-size: 1.1em;
        border: 1px solid black;
        margin-top: 50px;
        padding-bottom: 40px;
        border-radius: 20px;
        div {
            width: 100%;

            text-align: center;
        }
    }
    .Text_Flex_Container {
        display: flex;
        margin-top: 10px;
        .Text_Flex_Label {
            text-align: end;
            padding-right: 20px;
            width: 35%;
            min-width: 90px;
        }
        .Text_Flex_Content {
            text-align: start;
            width: 65%;
            a {
                color: blue;
                :hover {
                    color: skyblue;
                }
            }
        }
    }
    .arrowSlideOut {
        position: absolute;
        top: 10px;
        font-size: 2em;
        left: 10px;
        color: grey;
        :hover {
            cursor: pointer;
            color: lightgray;
        }
    }
    .User_Image_Container {
        img {
            border-radius: 10px;
            box-shadow: 0px 0px 5px #444;
        }

        .User_Image_Something {
            position: relative;
            .ImageDeleteButton {
                display: inline;
                position: absolute;
                top: -15px;
                right: 50px;
                color: red;
                font-size: 0.5em;
                :hover {
                    cursor: pointer;
                    color: black;
                }
            }
        }
        .User_Image_Nothing {
            position: relative;
            .ClickUserIcon {
                display: block;
            }
            .ClickButton {
                display: none;
            }
            :hover {
                cursor: pointer;
                .ClickUserIcon {
                    opacity: 0.2;
                }
                .ClickButton {
                    display: block;
                    width: 50%;
                    font-size: 1em;
                    position: absolute;
                    top: 0px;
                    left: 25%;
                }
            }
        }
    }
`;

const FloorLayoutUserSelect = ({ UserSelect, handleClicksNotUser, setUserSelect, Get_Floor_Room_Position }) => {
    const handleSlideOut = e => {
        handleClicksNotUser(e);
    };

    return (
        <FloorLayoutUserSelectMainDivBox UserSelect={UserSelect}>
            <div className="User_Detail_Info">
                <div className="User_Image_Container">
                    <h2 style={{ fontSize: '3em', marginBottom: '10px' }}>
                        <div>
                            <div className="ClickUserIcon">
                                <BsPersonSquare></BsPersonSquare>
                            </div>
                        </div>
                    </h2>
                </div>
                <div className="Text_Flex_Container">
                    <div className="Text_Flex_Label">소속 : </div>
                    <div className="Text_Flex_Content">{UserSelect?.company}</div>
                </div>
                <div className="Text_Flex_Container">
                    <div className="Text_Flex_Label">부서 : </div>
                    <div className="Text_Flex_Content">{UserSelect?.team}</div>
                </div>
                <div className="Text_Flex_Container">
                    <div className="Text_Flex_Label">성명 : </div>
                    <div className="Text_Flex_Content">{UserSelect?.name}</div>
                </div>
                <div className="Text_Flex_Container">
                    <div className="Text_Flex_Label">이메일 : </div>
                    <div className="Text_Flex_Content">
                        <a href={`mailto:${UserSelect?.user_id}`}>{UserSelect?.user_id}</a>
                    </div>
                </div>
                <div className="Text_Flex_Container">
                    <div className="Text_Flex_Label">연락처 : </div>
                    <div className="Text_Flex_Content">{UserSelect?.phone_number}</div>
                </div>
            </div>
            <div className="arrowSlideOut" onClick={e => handleSlideOut(e)}>
                <MdArrowForwardIos></MdArrowForwardIos>
            </div>
        </FloorLayoutUserSelectMainDivBox>
    );
};

export default FloorLayoutUserSelect;
