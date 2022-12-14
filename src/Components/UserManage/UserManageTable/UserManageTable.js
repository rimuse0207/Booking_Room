import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { toast } from '../../ToasMessage/ToastManager';
import { TiUserDelete } from 'react-icons/ti';
import { RiLockPasswordFill } from 'react-icons/ri';
import UserAddMainModal from '../UserAddModal/UserAddMainModal';

const UserManageTableMainDivBox = styled.div`
    width: 95%;
    max-height: 80vh;
    overflow: auto;
    background-color: #fff;
    margin: 0 auto;
    border-radius: 10px;
    padding-top: 20px;
    padding-left: 10px;
    margin-right: 20px;
    margin-top: 30px;
    margin-bottom: 30px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
        rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
    direction: ltr;
    scrollbar-color: #d4aa70 #e4e4e4;
    scrollbar-width: thin;
    ::-webkit-scrollbar {
        width: 20px;
    }

    ::-webkit-scrollbar-track {
        background-color: #e4e4e4;
        border-radius: 100px;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 100px;
        border: 7px solid transparent;
        background-clip: content-box;
        background-color: #368;
    }
    table {
        font-size: 0.8em;
        position: relative;
        width: 100%;
    }

    table.type09 {
        border-collapse: collapse;
        text-align: left;
        line-height: 1.5;
    }
    table.type09 thead th {
        padding: 10px;
        font-weight: bold;
        vertical-align: top;
        color: #369;
        border-bottom: 3px solid #036;
    }
    table.type09 tbody th {
        width: 150px;
        padding: 10px;
        font-weight: bold;
        vertical-align: top;
        border-bottom: 1px solid #ccc;
        background: #f3f6f7;
    }
    table.type09 td {
        width: 350px;
        padding: 10px;
        vertical-align: center;
        border-bottom: 1px solid #ccc;
    }
    .UserMinusIcons,
    .UserPlusIcons {
        font-size: 1.5em;
        display: inline-block;
    }
    .UserMinusIcons {
        :hover {
            cursor: pointer;
            color: red;
        }
    }
    .UserPlusIcons {
        :hover {
            cursor: pointer;
            color: limegreen;
        }
    }

    .Delete_icons {
        color: red;
        display: inline-block;
        font-size: 1.3em;
        :hover {
            cursor: pointer;
            color: blue;
        }
    }
    .Reset_Password {
        color: green;
        display: inline-block;
        font-size: 1.3em;

        :hover {
            cursor: pointer;
            color: blue;
        }
    }
`;

const UserManageTable = ({ AddUserModalIsOpen, setAddUserModalIsOpen }) => {
    const [UsersInfoDatas, setUsersInfoDatas] = useState([]);
    const [SearchData, setSearchData] = useState({
        Email_Search: '',
        Name_Search: '',
    });

    useEffect(() => {
        getUserInfoData();
    }, []);

    ///????????? ??????
    const getUserInfoData = async () => {
        try {
            const GetUserInfoDataFromServer = await axios.get(`${process.env.REACT_APP_DB_HOST}/users/User_Data_Getting_From_Admin`);

            if (GetUserInfoDataFromServer.data.dataSuccess) {
                setUsersInfoDatas(GetUserInfoDataFromServer.data.Datas);
            } else {
                toast.show({
                    title: `?????? ????????? ????????????. DHKS_IT????????? ??????????????????.`,
                    successCheck: false,
                    duration: 6000,
                });
            }
        } catch (error) {
            console.log(error);
            toast.show({
                title: `BrityWorks API Error??????. DHKS_IT????????? ??????????????????.`,
                successCheck: false,
                duration: 6000,
            });
        }
    };

    //????????? ??????
    const handleDeleteButton = async UserInfoData => {
        try {
            if (!window.confirm(`${UserInfoData.brity_works_user_info_name}?????? ?????? ?????? ???????????????????`)) {
                return;
            }

            const DeleteUserInfoDataFromServer = await axios.post(`${process.env.REACT_APP_DB_HOST}/users/User_Data_Delete_From_Admin`, {
                UserInfoData,
            });

            if (DeleteUserInfoDataFromServer.data.dataSuccess) {
                getUserInfoData();
                toast.show({
                    title: `${UserInfoData.brity_works_user_info_name}?????? ID??? ?????? ???????????????.`,
                    successCheck: true,
                    duration: 6000,
                });
            } else {
                toast.show({
                    title: `?????? ??????. DHKS_IT????????? ??????????????????.`,
                    successCheck: false,
                    duration: 6000,
                });
            }
        } catch (error) {
            console.log(error);
            toast.show({
                title: `?????? ??????. DHKS_IT????????? ??????????????????.`,
                successCheck: false,
                duration: 6000,
            });
        }
    };

    //???????????? ?????????
    const handleResetPassword = async UserInfoData => {
        try {
            if (!window.confirm(`${UserInfoData.brity_works_user_info_name}?????? ??????????????? ????????? ???????????????????`)) {
                return;
            }

            const ResetPasswordUserInfoDataFromServer = await axios.post(
                `${process.env.REACT_APP_DB_HOST}/users/User_Data_Reset_Password_From_Admin`,
                {
                    UserInfoData,
                }
            );

            if (ResetPasswordUserInfoDataFromServer.data.dataSuccess) {
                toast.show({
                    title: `${UserInfoData.brity_works_user_info_name}?????? ??????????????? ????????? ???????????????.`,
                    successCheck: true,
                    duration: 6000,
                });
            } else {
                toast.show({
                    title: `???????????? ????????? ??????. DHKS_IT????????? ??????????????????.`,
                    successCheck: false,
                    duration: 6000,
                });
            }
        } catch (error) {
            console.log(error);
            toast.show({
                title: `???????????? ????????? ??????. DHKS_IT????????? ??????????????????.`,
                successCheck: false,
                duration: 6000,
            });
        }
    };

    return (
        <UserManageTableMainDivBox>
            <table className="type09">
                <thead>
                    <tr className="PostionFixedFromScroll">
                        <th scope="cols">?????????</th>
                        <th scope="cols">?????????</th>
                        <th scope="cols">
                            <div>?????????(ID)</div>
                            <div>
                                <input
                                    placeholder="????????? ??????...."
                                    value={SearchData.Email_Search}
                                    onChange={e => setSearchData({ ...SearchData, Email_Search: e.target.value })}
                                ></input>
                            </div>
                        </th>
                        <th scope="cols">
                            <div>??????</div>
                            <div>
                                <input
                                    placeholder="?????? ??????...."
                                    value={SearchData.Name_Search}
                                    onChange={e => setSearchData({ ...SearchData, Name_Search: e.target.value })}
                                ></input>
                            </div>
                        </th>
                        <th scope="cols">????????????</th>
                        <th scope="cols">???????????? ?????????</th>
                        <th scope="cols">??????</th>
                    </tr>
                </thead>
                <tbody>
                    {UsersInfoDatas.filter(list => list.brity_works_user_info_id.includes(SearchData.Email_Search))
                        .filter(list => list.brity_works_user_info_name.includes(SearchData.Name_Search))
                        .map((list, i) => {
                            return (
                                <tr
                                    key={list.brity_works_user_info_indexs}
                                    style={
                                        moment(list.brity_works_user_info_create_date).format('YYYY-MM-DD') ===
                                        moment().format('YYYY-MM-DD')
                                            ? { background: 'lightgray' }
                                            : {}
                                    }
                                >
                                    <td>{i + 1}</td>
                                    <td>{list.brity_works_user_info_company}</td>
                                    <td>{list.brity_works_user_info_id}</td>
                                    <td>{list.brity_works_user_info_name}</td>
                                    <td>{moment(list.brity_works_user_info_create_date).format('YYYY-MM-DD HH:mm')}</td>
                                    <td>
                                        <div className="Reset_Password" onClick={() => handleResetPassword(list)}>
                                            <RiLockPasswordFill></RiLockPasswordFill>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="Delete_icons" onClick={() => handleDeleteButton(list)}>
                                            <TiUserDelete></TiUserDelete>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
            <UserAddMainModal
                getUserInfoData={() => getUserInfoData()}
                AddUserModalIsOpen={AddUserModalIsOpen}
                setAddUserModalIsOpen={() => setAddUserModalIsOpen(false)}
            ></UserAddMainModal>
        </UserManageTableMainDivBox>
    );
};

export default UserManageTable;
