import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Axios_Get_Moduls, request } from '../../../../API';
import { useEffect } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { toast } from '../../../ToasMessage/ToastManager';

const PartyPostListMainDivBox = styled.div`
    padding-left: 10px;

    .Main_Containers {
        display: flex;
        .Select_Choice_Container {
            border: 1px solid lightgray;
            width: 100%;
            height: 100%;
            min-height: 80vh;
            padding-left: 10px;
            padding-right: 20px;
        }
    }

    .User_List_Container {
        display: flex;
        justify-content: space-around;
        padding: 10px;
        border-bottom: 1px solid lightgray;
        margin-top: 10px;
        margin-bottom: 10px;

        .Delete_User_List {
            :hover {
                cursor: pointer;
                color: red;
            }
        }
    }

    input {
        min-width: 400px;
        height: 50px;
        border: none;
        border-bottom: 3px solid black;
        padding-left: 10px;
        :focus {
            outline: none;
            border-bottom: 3px solid blue;
        }
    }
    button {
        width: 100px;
        height: 50px;
        border: none;
        border-bottom: 3px solid black;
        background-color: none;
        margin-left: 10px;
        :hover {
            cursor: pointer;
            background-color: #368;
            color: #fff;
            border-bottom: 3px solid #368;
        }
    }
`;

const PartyPostList = () => {
    const [Mail_Input_Date, setMail_Input_Data] = useState('');
    const [SMS_Input_Date, setSMS_Input_Data] = useState('');

    const [Mail_List_State, setMail_List_State] = useState([]);
    const [SMS_List_State, setSMS_List_State] = useState([]);

    const Handle_Admit_Mail_Address = async e => {
        e.preventDefault();
        const Handle_Admit_Mail_Address_Axios = await request.post('/PartyPost/Handle_Admit_Mail_Address', {
            Mail_Input_Date,
        });
        if (Handle_Admit_Mail_Address_Axios.data.dataSuccess) {
            setMail_Input_Data('');
            await Getting_Mail_And_SMS_List_Getting_Func();
            toast.show({
                title: `메일 등록처리 완료하였습니다.`,
                successCheck: true,
                duration: 6000,
            });
        } else {
            toast.show({
                title: `메일 등록 에러 발생 IT팀에 문의바랍니다.`,
                successCheck: false,
                duration: 6000,
            });
        }
    };

    const Handle_Admit_SMS_Address = async e => {
        e.preventDefault();
        const Handle_Admit_SMS_Address_Axios = await request.post('/PartyPost/Handle_Admit_SMS_Address', {
            SMS_Input_Date,
        });
        if (Handle_Admit_SMS_Address_Axios.data.dataSuccess) {
            setSMS_Input_Data('');
            await Getting_Mail_And_SMS_List_Getting_Func();
            toast.show({
                title: `SMS 등록처리 완료하였습니다.`,
                successCheck: true,
                duration: 6000,
            });
        } else {
            toast.show({
                title: `SMS 등록 에러 발생 IT팀에 문의바랍니다.`,
                successCheck: false,
                duration: 6000,
            });
        }
    };

    const Handle_Delete_SMS_Data = async data => {
        const Handle_Delete_SMS_Data_Axios = await request.post('/PartyPost/Handle_Delete_SMS_Data', { data });
        if (Handle_Delete_SMS_Data_Axios.data.dataSuccess) {
            await Getting_Mail_And_SMS_List_Getting_Func();
            toast.show({
                title: `SMS 삭제처리 완료하였습니다.`,
                successCheck: true,
                duration: 6000,
            });
        } else {
            alert('에러발생');
            toast.show({
                title: `SMS 삭제 에러 발생 IT팀에 문의바랍니다.`,
                successCheck: false,
                duration: 6000,
            });
        }
    };
    const Handle_Delete_Mails_Data = async data => {
        const Handle_Delete_Mails_Data_Axios = await request.post('/PartyPost/Handle_Delete_Mails_Data', { data });
        if (Handle_Delete_Mails_Data_Axios.data.dataSuccess) {
            await Getting_Mail_And_SMS_List_Getting_Func();
            toast.show({
                title: `메일 삭제처리 완료하였습니다.`,
                successCheck: true,
                duration: 6000,
            });
        } else {
            alert('에러발생');
            toast.show({
                title: `메일 삭제 에러 발생 IT팀에 문의바랍니다.`,
                successCheck: false,
                duration: 6000,
            });
        }
    };

    const Getting_Mail_And_SMS_List_Getting_Func = async () => {
        const Getting_Mail_And_SMS_List_Getting_Func_Axios = await request.get('/PartyPost/Getting_Mail_And_SMS_List_Getting_Func');
        if (Getting_Mail_And_SMS_List_Getting_Func_Axios) {
            setMail_List_State(Getting_Mail_And_SMS_List_Getting_Func_Axios.data.Getting_Mail_And_SMS_List_Getting_Func_MAIL_Rows);
            setSMS_List_State(Getting_Mail_And_SMS_List_Getting_Func_Axios.data.Getting_Mail_And_SMS_List_Getting_Func_SMS_Rows);
        }
    };

    useEffect(() => {
        Getting_Mail_And_SMS_List_Getting_Func();
    }, []);

    return (
        <PartyPostListMainDivBox>
            <div className="Main_Containers">
                <div className="Select_Choice_Container">
                    <h2>Mail</h2>
                    <div>
                        <form onSubmit={e => Handle_Admit_Mail_Address(e)}>
                            <input
                                value={Mail_Input_Date}
                                placeholder="Mail주소를 입력 해주세요."
                                onChange={e => setMail_Input_Data(e.target.value)}
                            ></input>
                            <button onClick={e => Handle_Admit_Mail_Address(e)}>등록</button>
                        </form>
                    </div>
                    <div>
                        <h4>현재 등록 Mail LIST</h4>
                        <div>
                            <ul>
                                {Mail_List_State.map((list, j) => {
                                    return (
                                        <li className="User_List_Container" key={list.partypost_send_mail_list_indexs}>
                                            <div>{j + 1}. </div>
                                            <div>{list.name}</div>
                                            <div>{list.team}</div>
                                            <div>{list.partypost_send_mail_list_id}</div>
                                            <div className="Delete_User_List" onClick={() => Handle_Delete_Mails_Data(list)}>
                                                <IoCloseSharp></IoCloseSharp>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
                <div style={{ width: '100px' }}></div>
                <div className="Select_Choice_Container">
                    <h2>SMS</h2>
                    <div>
                        <form onSubmit={e => Handle_Admit_SMS_Address(e)}>
                            <input
                                value={SMS_Input_Date}
                                placeholder="핸드폰 번호를 입력 해주세요."
                                onChange={e => setSMS_Input_Data(e.target.value)}
                            ></input>
                            <button onClick={e => Handle_Admit_SMS_Address(e)}>등록 </button>
                        </form>
                    </div>
                    <div>
                        <h4>현재 등록 SMS 번호 LIST</h4>
                        <div>
                            <ul>
                                {SMS_List_State.map((list, j) => {
                                    return (
                                        <li className="User_List_Container" key={list.partypost_send_telephone_list_indexs}>
                                            <div>{j + 1}.</div>
                                            <div>{list.partypost_send_telephone_list_number}</div>
                                            <div className="Delete_User_List" onClick={() => Handle_Delete_SMS_Data(list)}>
                                                <IoCloseSharp></IoCloseSharp>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </PartyPostListMainDivBox>
    );
};

export default PartyPostList;
