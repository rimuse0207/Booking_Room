import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { UserManageTableMainDivBox } from '../../../UserManage/UserManageTable/UserManageTable';
import { Axios_Get_Moduls, Axios_Post_Moduls, request } from '../../../../API';
import Toggle from '../Toggle/Toggle';
import { RiDeleteBack2Fill } from 'react-icons/ri';

const ManageMainDivBox = styled.div`
    td {
        width: auto !important;
    }
    .Delete_Tables_Room_Info {
        color: red;
        :hover {
            cursor: pointer;
        }
    }
`;

const Manage = () => {
    const [Admin_Room_Info, setAdmin_Room_Info] = useState([]);

    // Handle_Delete_Company_Room

    const Handle_Delete_Company_Room = async data => {
        if (!window.confirm('정말로 삭제하시겠습니까?')) {
            return;
        }
        try {
            const Handle_Delete_Company_Room_Axios = await Axios_Post_Moduls('/users/Handle_Delete_Company_Room', {
                data,
            });

            if (Handle_Delete_Company_Room_Axios) {
                alert('삭제처리 하였습니다.');
                setAdmin_Room_Info(Handle_Delete_Company_Room_Axios);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const Change_Room_Info_State = async (data, select_menu) => {
        try {
            const Change_Room_Info_State_axios = await Axios_Post_Moduls('/users/Change_Room_Info_State', {
                data,
                select_menu,
            });

            if (Change_Room_Info_State_axios) setAdmin_Room_Info(Change_Room_Info_State_axios);
        } catch (error) {
            console.log(error);
        }
    };

    const Company_Room_Info_Admin_State_Getting = async () => {
        try {
            const Company_Room_Info_Admin_State_Getting_Axios = await Axios_Get_Moduls('/users/Company_Room_Info_Admin_State_Getting');
            if (Company_Room_Info_Admin_State_Getting_Axios) setAdmin_Room_Info(Company_Room_Info_Admin_State_Getting_Axios);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        Company_Room_Info_Admin_State_Getting();
    }, []);

    return (
        <ManageMainDivBox>
            <UserManageTableMainDivBox style={{ maxHeight: '100%' }}>
                <table className="type09">
                    <thead>
                        <tr className="PostionFixedFromScroll">
                            <th scope="cols">No.</th>
                            <th scope="cols">회의실 명</th>
                            <th scope="cols">회의실 종류</th>
                            <th scope="cols">Brity_Works epid</th>
                            <th scope="cols">Brity_Works uid</th>
                            <th scope="cols">Brity_Works cn(표현이름)</th>
                            <th scope="cols">숨김 처리</th>
                            <th scope="cols">예약 허용 여부</th>
                            <th scope="cols">삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Admin_Room_Info.map((list, j) => {
                            return (
                                <tr key={list.brity_works_room_info_userId}>
                                    <td>{j + 1}. </td>
                                    <td>{list.brity_works_room_info_name}</td>
                                    <td>{list.brity_works_room_info_division === 'Company_Room' ? '회의실' : '법인 차량'}</td>
                                    <td>{list.brity_works_room_info_targetId}</td>
                                    <td>{list.brity_works_room_info_userId}</td>
                                    <td>{list.brity_works_room_info_label}</td>
                                    <td>
                                        <Toggle
                                            isOn={list.brity_works_room_info_disabled === 1 ? true : false}
                                            Change_Room_Info_State={() => Change_Room_Info_State(list, 'brity_works_room_info_disabled')}
                                        ></Toggle>
                                    </td>
                                    <td>
                                        <Toggle
                                            isOn={list.brity_works_room_info_permission === 1 ? true : false}
                                            Change_Room_Info_State={() => Change_Room_Info_State(list, 'brity_works_room_info_permission')}
                                        ></Toggle>
                                    </td>
                                    <td className="Delete_Tables_Room_Info" onClick={() => Handle_Delete_Company_Room(list)}>
                                        <RiDeleteBack2Fill></RiDeleteBack2Fill>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </UserManageTableMainDivBox>
        </ManageMainDivBox>
    );
};

export default Manage;
