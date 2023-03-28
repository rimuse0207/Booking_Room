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
    const LoginInfo = useSelector(state => state.LoginInfoDataRedux.Infomation);
    const FileUploadInput = useRef(null);
    const [ImageCheckingModal, setImageCheckingModal] = useState(false);

    const handleSlideOut = e => {
        handleClicksNotUser(e);
    };

    const handleImageChange = () => {
        setImageCheckingModal(true);
        if (FileUploadInput.current) {
            FileUploadInput.current.click();
        }
    };
    const ImageChange = async e => {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        formData.append('selectUser', UserSelect);

        const ImageSending = await axios({
            baseURL: `${process.env.REACT_APP_DB_HOST}`,
            url: '/users/Detail_Person_Image_Upload',
            method: 'POST',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                User_ID: UserSelect?.user_id,
            },
        })
            .then(response => {
                if (response.data.dataSuccess) {
                    ChnagingData(response.data.url_string, UserSelect);
                } else {
                    alert('에러 발생 다시 시도');
                }
            })
            .catch(error => {
                console.error(error);
                alert('에러 발생');
            });
    };

    const ChnagingData = (data, UserData) => {
        setUserSelect({ ...UserSelect, person_Image: data });
        Get_Floor_Room_Position();
    };

    const handleDeleteImage = async () => {
        const Checking_Delete = window.confirm('정말 삭제 하시겠습니까?');
        if (Checking_Delete) {
            try {
                const Delete_Image_Data = await request.post(`/users/Detail_Person_Image_Delete`, {
                    UserSelect,
                });

                if (Delete_Image_Data.data.dataSuccess) {
                    setUserSelect({ ...UserSelect, person_Image: null });
                    Get_Floor_Room_Position();
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            return;
        }
    };

    return (
        <FloorLayoutUserSelectMainDivBox UserSelect={UserSelect}>
            <div className="User_Detail_Info">
                {LoginInfo.Login_Admin_Access ? (
                    <div className="User_Image_Container">
                        <h2 style={{ fontSize: '3em', marginBottom: '10px' }}>
                            {UserSelect?.person_Image ? (
                                <div className="User_Image_Something">
                                    <img
                                        src={`${process.env.REACT_APP_DB_HOST}/public/images/${UserSelect?.person_Image}`}
                                        width="150px"
                                        alt={UserSelect?.name}
                                    ></img>
                                    <span className="ImageDeleteButton" onClick={() => handleDeleteImage()}>
                                        <TiDelete></TiDelete>
                                    </span>
                                </div>
                            ) : (
                                <div className="User_Image_Nothing" onClick={() => handleImageChange()}>
                                    <div className="ClickUserIcon">
                                        <BsPersonSquare></BsPersonSquare>
                                    </div>
                                    <div className="ClickButton">+</div>
                                    <input
                                        type="file"
                                        ref={FileUploadInput}
                                        accept="image/*"
                                        onChange={ImageChange}
                                        style={{ display: 'none' }}
                                    ></input>
                                </div>
                            )}
                        </h2>
                    </div>
                ) : (
                    <div className="User_Image_Container">
                        <h2 style={{ fontSize: '3em', marginBottom: '10px' }}>
                            {UserSelect?.person_Image ? (
                                <div>
                                    <img
                                        src={`${process.env.REACT_APP_DB_HOST}/public/images/${UserSelect?.person_Image}`}
                                        width="150px"
                                        height="200px"
                                        alt={UserSelect?.name}
                                    ></img>
                                </div>
                            ) : (
                                <div>
                                    <div className="ClickUserIcon">
                                        <BsPersonSquare></BsPersonSquare>
                                    </div>
                                </div>
                            )}
                        </h2>
                    </div>
                )}
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
