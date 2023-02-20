import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CgCloseO } from 'react-icons/cg';
import { FaPersonBooth } from 'react-icons/fa';
import { HiOutlineMinusCircle } from 'react-icons/hi';
import { RandomUserSelectModalMainDivBox } from './RandomUserSelectModal';
import Select from 'react-select';
import axios from 'axios';
import { toast } from '../../../../../ToasMessage/ToastManager';
import { useSelector } from 'react-redux';
import { request } from '../../../../../../API';

const ParticipateModalMainDivBox = styled.div`
    .BookingCheck_Cotainer {
        margin-bottom: 30px;
        .BookingCheck_Cotainer_Title {
            margin-bottom: 10px;
        }
    }
`;

const ParticipateModal = ({ setParticipateModalOpen, Room_Keys, Now_Room_User, setNow_Room_User }) => {
    const LoginInfo = useSelector(state => state.LoginInfoDataRedux.Infomation);
    const [UserSelectLists, setUserSelectLists] = useState([]);
    const [ChangeParticipateUser, setChangeParticipateUser] = useState(Now_Room_User);

    // 인원 추가
    const InsertParticipateData = data => {
        if (!data) {
            return;
        }
        setChangeParticipateUser(
            ChangeParticipateUser.concat({
                brity_works_user_info_id: data.value,
                brity_works_user_info_name: data.label.split('||')[0],
                local_pim_participate_user_id: data.value,
                local_pim_participate_user_room_key: Room_Keys,
            })
        );
        setUserSelectLists(UserSelectLists.filter(list => list.value !== data.value));
    };

    // 인원 삭제
    const HandleDeleteUser = data => {
        if (data.brity_works_user_info_id === LoginInfo.Login_id) {
            toast.show({
                title: `방장은 삭제 할 수 없습니다. `,
                successCheck: false,
                duration: 4000,
            });
            return;
        }
        setChangeParticipateUser(ChangeParticipateUser.filter(list => list.brity_works_user_info_id !== data.brity_works_user_info_id));
        setUserSelectLists(
            UserSelectLists.concat({
                label: `${data.brity_works_user_info_name} || ${data.brity_works_user_info_id}`,
                value: `${data.brity_works_user_info_id}`,
            })
        );
    };

    // 인원 저장
    const HandleDataSaved = async () => {
        const result = ChangeParticipateUser.filter(item => {
            return !Now_Room_User.some(other => other.brity_works_user_info_id === item.brity_works_user_info_id);
        });
        const M_result = Now_Room_User.filter(item => {
            return !ChangeParticipateUser.some(other => other.brity_works_user_info_id === item.brity_works_user_info_id);
        });
        try {
            const ParticipateDataSaved_Axios = await request.post(`/LocalPim/Pim_Room_Getting_Info_Data`, {
                Room_Keys,
                AddUserData: result,
                DeleteUserData: M_result,
            });

            if (ParticipateDataSaved_Axios.data.dataSuccess) {
                setNow_Room_User(ParticipateDataSaved_Axios.data.RoomInfoData_User_Data_Rows);
                setParticipateModalOpen();
                toast.show({
                    title: `입장 인원을 변경 처리 하였습니다.`,
                    successCheck: true,
                    duration: 4000,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const RoomInfoDataGetting = async () => {
        try {
            const RoomInfoData_Getting_Axios = await request.get(`/LocalPim/Pim_Room_Getting_Info_Data`, {
                params: {
                    Room_Keys,
                },
            });

            if (RoomInfoData_Getting_Axios.data.dataSuccess) {
                const result = RoomInfoData_Getting_Axios.data.All_Select_Data.filter(item => {
                    return !Now_Room_User.some(other => other.brity_works_user_info_id === item.value);
                });
                setUserSelectLists(result);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        RoomInfoDataGetting();
    }, []);
    return (
        <RandomUserSelectModalMainDivBox>
            <div className="Close_button_container" onClick={setParticipateModalOpen}>
                <CgCloseO></CgCloseO>
            </div>
            <div>*주의사항</div>
            <div style={{ fontSize: '0.7em', paddingLeft: '10px', marginTop: '5px', marginBottom: '10px' }}>
                이미 입장 가능한 인원은 목록에서 제외 됩니다.
            </div>
            <ParticipateModalMainDivBox>
                <div className="BookingCheck_Cotainer">
                    <h4 className="BookingCheck_Cotainer_Title">참가 가능인원 선택 : </h4>
                    <Select
                        // ref={handleChangeRef}
                        className="basic-single"
                        classNamePrefix="이쪽에서 선택 또는 검색 해주세요."
                        // defaultValue={SelectLeftHeaderInfo}
                        value={null}
                        isClearable={true}
                        isSearchable={true}
                        name="Person"
                        options={UserSelectLists}
                        placeholder={'인원을 선택 해주세요.'}
                        onChange={value => InsertParticipateData(value)}
                    />
                </div>
            </ParticipateModalMainDivBox>
            <div className="Can_Selected_List_Container_Box">
                <div style={{ marginTop: '5px', marginLeft: '5px' }}>
                    <FaPersonBooth></FaPersonBooth>
                </div>
                <h4>현재 입장 가능 인원</h4>
                <div className="Can_Selected_List_Container">
                    <ul>
                        {ChangeParticipateUser.map(list => {
                            return (
                                <li onClick={() => HandleDeleteUser(list)} key={list.brity_works_user_info_id}>
                                    <div>{list.brity_works_user_info_name}</div>
                                    <div className="Minus_Icon">
                                        <HiOutlineMinusCircle></HiOutlineMinusCircle>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>

            <div className="Button_Cotainer">
                <button className="Submit" onClick={() => HandleDataSaved()}>
                    저장
                </button>
                <button className="Cancle" onClick={() => setParticipateModalOpen()}>
                    취소
                </button>
            </div>
        </RandomUserSelectModalMainDivBox>
    );
};

export default ParticipateModal;
