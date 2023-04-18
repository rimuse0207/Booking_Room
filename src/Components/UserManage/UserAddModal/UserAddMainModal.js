import axios from 'axios';
import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { request } from '../../../API';
import { toast } from '../../ToasMessage/ToastManager';
import UserAddTeamModalCheck from './UserAddTeamModalCheck';

const UserAddMainModalMainDivBox = styled.div`
    padding:20px;
    padding-top:0px;
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
        }
        .Cancle {
            background-color: orange;
            margin-right: 30px;
            color: #fff;
            :hover {
                background-color: #efefef;
                color: orange;
            }
        }
        .Delete {
            background-color: red;
            margin-left: 30px;
            color: #fff;
            :hover {
                background-color: #efefef;
                color: red;
            }
        }
        .Submit {
            background-color: green;
            margin-right: 30px;
            color: #fff;
            :hover {
                background-color: #efefef;
                color: green;
            }
        }
    }
`;

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
Modal.setAppElement('#AddUserModal');

const UserAddMainModal = ({ }) => {
    const [AddUserModalIsOpen, setAddUserModalIsOpen] = useState(false);
    const [AddUserInfoData, setAddUserInfoData] = useState({
        Company: 'DHK',
        Email: '',
        Name: '',
        PhoneNumber: "",
        Team : "",
        Team_Code:""
    });

    const HandleUserAdd = async () => {
        try {

            if (!AddUserInfoData.Email || !AddUserInfoData.Name || !AddUserInfoData.PhoneNumber || !AddUserInfoData.Team) {
                 toast.show({
                    title: `공란을 적부 입력 해주세요.`,
                    successCheck: false,
                    duration: 6000,
                });
                return;
            }

            const UserAddInfoDataFromServer = await request.post(`/users/User_Data_Add_From_Admin`, {
                AddUserInfoData,
            });

            if (UserAddInfoDataFromServer.data.dataSuccess) {
                
                toast.show({
                    title: `${AddUserInfoData.Name}님의 인원을 추가하였습니다.`,
                    successCheck: true,
                    duration: 6000,
                });
                setAddUserInfoData({
                    Company: 'DHK',
                    Email: '',
                    Name: '',
                    PhoneNumber: "",
                    Team : "",
                });
            } else {
                toast.show({
                    title: `유저 추가 실패. 중복 ID가 있는지 확인 후 다시 시도 바랍니다.`,
                    successCheck: false,
                    duration: 6000,
                });
            }
        } catch (error) {
            console.log(error);
            toast.show({
                title: `유저 추가 실패. DHKS_IT팀에게 문의바랍니다.`,
                successCheck: false,
                duration: 6000,
            });
        }
    };

    const handleOpenModal = () => {
        setAddUserModalIsOpen(true);
    }
   

    return (
        
            <UserAddMainModalMainDivBox>
                <div>
                    <h2>사용자 추가.</h2>
                    <div className="ApplyModal_Input_Container">
                        <div style={{ marginTop: '20px' }}>
                            <div className="Float_cotainer_box">
                                <div className="Float_cotainer_box_Left">회사</div>
                                <div className="Float_cotainer_box_Right">
                                    <div className="Float_cotainer_box_Right_InpuBox_cotainer">
                                        <input type="text" value={AddUserInfoData.Company}></input>
                                    </div>
                                </div>
                            </div>
                            <div className="Float_cotainer_box">
                                <div className="Float_cotainer_box_Left">Email(ID)</div>
                                <div className="Float_cotainer_box_Right">
                                    <div className="Float_cotainer_box_Right_InpuBox_cotainer">
                                        <input
                                            type="text"
                                            placeholder="이메일을 적어주세요."
                                            value={AddUserInfoData.Email}
                                            onChange={e => setAddUserInfoData({ ...AddUserInfoData, Email: e.target.value })}
                                        ></input>
                                    </div>
                                </div>
                            </div>
                            <div className="Float_cotainer_box">
                                <div className="Float_cotainer_box_Left">이름</div>
                                <div className="Float_cotainer_box_Right">
                                    <div className="Float_cotainer_box_Right_InpuBox_cotainer">
                                        <input
                                            type="text"
                                            placeholder="이름을 적어주세요."
                                            value={AddUserInfoData.Name}
                                            onChange={e => setAddUserInfoData({ ...AddUserInfoData, Name: e.target.value })}
                                        ></input>
                                    </div>
                                </div>
                            </div>
                            <div className="Float_cotainer_box">
                                <div className="Float_cotainer_box_Left">팀명</div>
                                <div className="Float_cotainer_box_Right">
                                    <div className="Float_cotainer_box_Right_InpuBox_cotainer">
                                        <input
                                            type="text"
                                            placeholder="팀을 선택 해 주세요."
                                            value={AddUserInfoData.Team}
                                            // onChange={e => setAddUserInfoData({ ...AddUserInfoData, Team: e.target.value })}
                                        onClick={() => handleOpenModal()}
                                        readOnly
                                        ></input>
                                    </div>
                            </div>
                            
                            </div>
                              <div className="Float_cotainer_box">
                                <div className="Float_cotainer_box_Left">핸드폰 번호</div>
                                <div className="Float_cotainer_box_Right">
                                    <div className="Float_cotainer_box_Right_InpuBox_cotainer">
                                        <input
                                            type="text"
                                            placeholder="핸드폰 번호를 적어주세요."
                                            value={AddUserInfoData.PhoneNumber}
                                            onChange={e => setAddUserInfoData({ ...AddUserInfoData, PhoneNumber: e.target.value })}
                                        ></input>
                                    </div>
                                </div>
                            </div>
                            <div className="Float_cotainer_box">
                                <div className="Float_cotainer_box_Left">초기비밀번호</div>
                                <div className="Float_cotainer_box_Right">
                                    <div className="Float_cotainer_box_Right_InpuBox_cotainer">
                                        <input type="text" value="1234"></input>
                                    </div>
                                </div>
                            </div>

                            <div className="Button_Cotainer">
                                <button className="Submit" onClick={() => HandleUserAdd()}>
                                    추가하기
                                </button>
                               
                            </div>
                        </div>
                    </div>
            </div>
            <UserAddTeamModalCheck AddUserModalIsOpen={AddUserModalIsOpen} setAddUserModalIsOpen={()=>setAddUserModalIsOpen(false)} AddUserInfoData={AddUserInfoData} setAddUserInfoData={(data)=>setAddUserInfoData(data)}></UserAddTeamModalCheck>
            </UserAddMainModalMainDivBox>
       
    );
};

export default UserAddMainModal;
