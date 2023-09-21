import React, { useState } from 'react';
import styled from 'styled-components';
import { UserAddMainModalMainDivBox } from '../../../UserManage/UserAddModal/UserAddMainModal';
import { Axios_Post_Moduls } from '../../../../API';
import { toast } from '../../../ToasMessage/ToastManager';

const RegisteredMainDivBox = styled.div`
    .Float_cotainer_box_Left {
        width: 300px !important;
    }
    select {
        height: 100%;
        width: 100%;
        border: 1px solid light gray;
        padding-left: 10px;
    }
`;

const Registered = () => {
    const [Room_Register_State, setRoom_Register_State] = useState({
        brity_works_room_info_name: '',
        brity_works_room_info_targetId: '',
        brity_works_room_info_userId: '',
        brity_works_room_info_label: '',
        brity_works_room_info_division: 'Company_Room',
    });

    const HandleUserAdd = async () => {
        try {
            const Room_Booking_Store_Axios = await Axios_Post_Moduls('/users/Room_Booking_Store_Axios', {
                Room_Register_State,
            });

            if (Room_Booking_Store_Axios) {
                toast.show({
                    title: `정상적으로 회의실 등록이 완료되었습니다.`,
                    successCheck: true,
                    duration: 6000,
                });
            } else {
                toast.show({
                    title: `IT팀에게 문의바랍니다.`,
                    successCheck: false,
                    duration: 6000,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <RegisteredMainDivBox>
            <UserAddMainModalMainDivBox>
                <div>
                    <h2>회의실 추가.</h2>
                    <div className="ApplyModal_Input_Container">
                        <div style={{ marginTop: '20px' }}>
                            <div className="Float_cotainer_box">
                                <div className="Float_cotainer_box_Left">회의실 구분</div>
                                <div className="Float_cotainer_box_Right">
                                    <div className="Float_cotainer_box_Right_InpuBox_cotainer">
                                        <select
                                            value={Room_Register_State.brity_works_room_info_division}
                                            onChange={e =>
                                                setRoom_Register_State({
                                                    ...Room_Register_State,
                                                    brity_works_room_info_division: e.target.value,
                                                })
                                            }
                                        >
                                            <option value={'Company_Room'}>회의실</option>
                                            <option value={'Company_Car'}>법인차량</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="Float_cotainer_box">
                                <div className="Float_cotainer_box_Left">
                                    {Room_Register_State.brity_works_room_info_division === 'Company_Room' ? '회의실명' : '차량 번호명'}
                                </div>
                                <div className="Float_cotainer_box_Right">
                                    <div className="Float_cotainer_box_Right_InpuBox_cotainer">
                                        <input
                                            type="text"
                                            value={Room_Register_State.brity_works_room_info_name}
                                            onChange={e =>
                                                setRoom_Register_State({
                                                    ...Room_Register_State,
                                                    brity_works_room_info_name: e.target.value,
                                                })
                                            }
                                            placeholder="2F_A_ROOM"
                                        ></input>
                                    </div>
                                </div>
                            </div>

                            <div className="Float_cotainer_box">
                                <div className="Float_cotainer_box_Left">Brity_Works epid</div>
                                <div className="Float_cotainer_box_Right">
                                    <div className="Float_cotainer_box_Right_InpuBox_cotainer">
                                        <input
                                            type="text"
                                            placeholder="M220506085327A348577"
                                            value={Room_Register_State.brity_works_room_info_targetId}
                                            onChange={e =>
                                                setRoom_Register_State({
                                                    ...Room_Register_State,
                                                    brity_works_room_info_targetId: e.target.value,
                                                })
                                            }
                                        ></input>
                                    </div>
                                </div>
                            </div>
                            <div className="Float_cotainer_box">
                                <div className="Float_cotainer_box_Left">Brity_Works uid</div>
                                <div className="Float_cotainer_box_Right">
                                    <div className="Float_cotainer_box_Right_InpuBox_cotainer">
                                        <input
                                            type="text"
                                            placeholder="a34dhk02.a"
                                            value={Room_Register_State.brity_works_room_info_userId}
                                            onChange={e =>
                                                setRoom_Register_State({
                                                    ...Room_Register_State,
                                                    brity_works_room_info_userId: e.target.value,
                                                })
                                            }
                                        ></input>
                                    </div>
                                </div>
                            </div>
                            <div className="Float_cotainer_box">
                                <div className="Float_cotainer_box_Left">Brity_Works cn(표현이름)</div>
                                <div className="Float_cotainer_box_Right">
                                    <div className="Float_cotainer_box_Right_InpuBox_cotainer">
                                        <input
                                            type="text"
                                            placeholder="판교 2층 A룸  (  2F_A_ROOM )"
                                            value={Room_Register_State.brity_works_room_info_label}
                                            onChange={e =>
                                                setRoom_Register_State({
                                                    ...Room_Register_State,
                                                    brity_works_room_info_label: e.target.value,
                                                })
                                            }
                                        ></input>
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
            </UserAddMainModalMainDivBox>
        </RegisteredMainDivBox>
    );
};

export default Registered;
