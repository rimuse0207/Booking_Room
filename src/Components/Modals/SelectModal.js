import React from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { CgCloseO } from 'react-icons/cg';
import SelectModalContent from './SelectModalTable/SelectModalContent';
import SelectFloorRoomTable from './SelectModalTable/SelectFloorRoomTable';
import SelectModalTable from './SelectModalTable/SelectModalTable';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from '../ToasMessage/ToastManager';
import { request } from '../../API';
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        height: '90%',
    },
};
Modal.setAppElement('#SelectModal');

const SelectModalMainDivBox = styled.div`
    .Close_button_container {
        position: fixed;
        top: 10px;
        right: 10px;
        color: red;
        font-weight: bolder;
        font-size: 1.3em;
        :hover {
            cursor: pointer;
        }
    }
    //Modal창 회의실 조회 테이블 CSS
    .Modal_Apply_Mian_Table_Container {
        margin-top: 20px;
        margin-bottom: 20px;
        border: 1px solid #b0b0b0;
        display: flex;
        min-width: 880px;
        background-color: #fff;
        position: relative;
        @media only screen and (max-width: 800px) {
            width: 100% !important;
            min-width: 0px;
        }
    }
    .Modal_Apply_Room_title_container {
        width: 190px;
        @media only screen and (max-width: 800px) {
            width: 80px !important;
        }
        .Modal_Apply_Main_Room_Time_title {
            height: 50px;
            text-align: center;
            width: 190px;
            @media only screen and (max-width: 800px) {
                width: 80px !important;
            }
        }
        .Main_Room_title {
            border: 1px solid #b0b0b0;
            height: 70px;
            text-align: center;
            font-weight: bold;
            width: 190px;
            line-height: 40px;
            @media only screen and (max-width: 800px) {
                width: 80px !important;
                font-size: 0.7em;
            }
        }
    }
    .Modal_Apply_Room_Content_container {
        /* width: calc(100%-300px); */

        /* min-width: 880px; */
        overflow-x: scroll;
        @media only screen and (max-width: 800px) {
            width: 90% !important;
            font-size: 0.7em;
            min-width: 0px;
        }
        ::-webkit-scrollbar {
            width: 5px;
            height: 10px;
        }
        ::-webkit-scrollbar-thumb {
            background-color: red;
            border-radius: 10px;
        }
        ::-webkit-scrollbar-track {
            background-color: grey;
            border-radius: 10px;
            box-shadow: inset 0px 0px 2px white;
        }
        .Modal_Apply_Main_Room_Time_title {
            border-top: 1px solid #b0b0b0;
            height: 50px;
            text-align: center;
        }
        ///Room에 따른 시간 Table CSS
        .Modal_Apply_Main_TimeLine_Table_Contents {
            width: 1922px;
            .Main_Room_title {
                border-top: 1px solid #b0b0b0;
                height: 70px;
                text-align: center;
                font-weight: bold;
                .TableInTableLine {
                    display: flex;
                    height: 100%;
                    position: relative;

                    ///예약된 테이블 색깔 표시
                    .Reservation_Room_Container {
                        position: absolute;
                        top: 0px;
                        padding-top: 5px;
                        padding-bottom: 5px;
                        .Reservation_Room_date {
                            border-width: 1px;
                            border-color: #97b0f8;
                            background-color: #f1f1f5;
                            height: 100%;
                            border-radius: 5px;
                            box-shadow: 0.5px 0.5px 0.5px 0.5px #d5ddf6;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            :hover {
                                cursor: pointer;
                                opacity: 0.9;
                            }

                            .ContentTextCotainer {
                                font-size: 0.7em;
                                overflow: hidden;
                                font-weight: light;
                                white-space: nowrap;
                                padding-top: 2px;
                                .ContentTitle {
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                }
                                .Content_useId {
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                }
                                .Content_times {
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                }
                            }
                        }
                    }
                }
                .Main_TimeLine_Content {
                    border-right: 1px solid #b0b0b0;
                    width: 60px;
                    text-align: center;
                    flex-grow: 1;
                    /* :hover {
                        cursor: pointer;
                        background-color: gray;
                    } */
                }
            }
        }

        .Modal_Apply_Main_TimeLine_Table_Container {
            top: 40px;
            .Modal_Apply_Main_TimeLine_Content {
                border: 1px solid red;
                display: table-cell;
                width: 22px;
                text-align: center;
                height: 71vh;
                /* :hover {
                    cursor: pointer;
                    background-color: #efefef;
                } */
            }
        }
    }
    .Modal_Apply_Main_Room_Time_title_Main_Container {
        /* border: 1px solid #b0b0b0; */
        height: 50px;
        text-align: center;
        font-weight: bold;
        width: 1922px;
        position: relative;
        .TableInTableLine_Hours {
            display: flex;
            padding-top: 7px;
            .Main_TimeLine_Hour_content {
                width: 80px;
                text-align: center;
            }
        }

        .TableInTableLine {
            display: flex;
            height: 100%;
            position: absolute;
            bottom: 0px;
            height: 18px;
            left: 0px;
            color: gray;
            .Main_TimeLine_Content {
                font-size: 0.8em;
                width: 40px;
                text-align: center;
            }
        }
    }

    .ApplyModal_Input_Container {
        margin-top: 10px;
        border-top: 1px solid gray;
    }

    .Float_cotainer_box {
        min-width: 500px;
        max-width: 800px;
        height: 40px;
        margin-bottom: 30px;

        ::after {
            display: block;
            content: '';
            clear: both;
        }
        .Float_cotainer_box_Left {
            float: left;
            width: 100px;
            font-size: 1em;

            font-weight: bold;
            line-height: 40px;
        }
        .Float_cotainer_box_Right {
            margin-left: 10px;
            float: left;
            width: calc(100%-100px);
            display: flex;
            height: 100%;
            .Float_cotainer_box_Right_InpuBox_cotainer {
                min-width: 400px;
                height: 100%;
                input {
                    height: 100%;
                    width: 100%;
                    border: 1px solid light gray;
                    padding-left: 10px;
                }
            }
            .DatePickerUseContainer {
                border: 1px solid gray;
                margin-right: 10px;
                height: 100%;
                padding-left: 5px;
                padding-right: 5px;
                .example-custom-input {
                    border: none;
                    width: 100%;
                    height: 38px;
                    background-color: #fff;
                }
            }
            .TimePickerUserContainer {
                border: 1px solid gray;
                height: 100%;
                select {
                    border: none;
                    width: 100%;
                    height: 100%;
                    font-size: 0.9em;
                    padding-left: 10px;
                    padding-right: 10px;
                }
            }
        }
    }
    .Button_Cotainer {
        text-align: center;
        button {
            width: 120px;
            height: 40px;
            border: none;
            font-weight: bolder;
            font-size: 1.1em;
            border-radius: 5px;
            :hover {
                cursor: pointer;
            }
            @media only screen and (max-width: 800px) {
                width: 90px !important;
                font-size: 0.9em;
            }
        }
        .Cancle {
            background-color: orange;
            margin-left: 30px;
            margin-right: 30px;
            color: #fff;
            :hover {
                background-color: #efefef;
                color: orange;
            }
            @media only screen and (max-width: 800px) {
                margin-right: 10px;
            }
        }
        .Delete {
            background-color: red;
            margin-left: 30px;
            margin-right: 30px;
            color: #fff;
            :hover {
                background-color: #efefef;
                color: red;
            }
            @media only screen and (max-width: 800px) {
                margin-left: 10px;
            }
        }
    }
`;

const SelectModal = ({
    SelectModalIsOpen,
    setSelectModalIsOpen,
    SelectModalData,
    RoomDatas,
    SelectModalRomms_Data,
    setSelectModalData,
    getDatas,
}) => {
    const LoginInfo = useSelector(state => state.LoginInfoDataRedux.Infomation);
    const ModalPopUpClose = () => {
        setSelectModalIsOpen();
    };

    const handleDeleteBooking = async () => {
        try {
            const DeleteFromBookingData = await request.post(`/users/BrityWorks_Delete_From_Data`, {
                SelectModalData,
                LoginInfo,
            });
            if (DeleteFromBookingData.data.dataSuccess) {
                getDatas();
                ModalPopUpClose();
                toast.show({
                    title: `요청하신 예약을 삭제 완료하였습니다.`,
                    successCheck: true,
                    duration: 5000,
                });
            } else {
                toast.show({
                    title: `Error 발생. IT팀에 문의바랍니다. `,
                    successCheck: false,
                    duration: 5000,
                });
            }
        } catch (error) {
            console.log(error);
            toast.show({
                title: `Error 발생. IT팀에 문의바랍니다. `,
                successCheck: false,
                duration: 5000,
            });
        }
    };

    return (
        <Modal isOpen={SelectModalIsOpen} style={customStyles} contentLabel="Select Modal">
            <SelectModalMainDivBox>
                <div className="Close_button_container" onClick={ModalPopUpClose}>
                    <CgCloseO></CgCloseO>
                </div>
                <div>
                    {RoomDatas.length > 0 && SelectModalRomms_Data.SelectRoom
                        ? RoomDatas.map((list, i) => {
                              return list.name === SelectModalRomms_Data.SelectRoom ? (
                                  <SelectModalTable
                                      RoomDatas={list}
                                      SelectModalData={SelectModalData}
                                      Room_Datas={SelectModalRomms_Data.SelectRoomInfo}
                                      setSelectModalData={data => setSelectModalData(data)}
                                  ></SelectModalTable>
                              ) : (
                                  ''
                              );
                          })
                        : ''}
                </div>
                <div>
                    <SelectModalContent SelectModalData={SelectModalData}></SelectModalContent>
                </div>
                <div className="Button_Cotainer">
                    {LoginInfo.Login_name === SelectModalData.subject.split('____')[1] ||
                    LoginInfo.Login_name === SelectModalData.attendees[0].displayName.split('/')[0] ? (
                        <button className="Delete" onClick={() => handleDeleteBooking()}>
                            삭제
                        </button>
                    ) : (
                        <></>
                    )}
                    <button className="Cancle" onClick={() => ModalPopUpClose()}>
                        취소
                    </button>
                </div>
            </SelectModalMainDivBox>
        </Modal>
    );
};

export default SelectModal;
