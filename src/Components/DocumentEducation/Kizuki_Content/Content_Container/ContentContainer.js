import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import CommentMainPage from './Comment/CommentMainPage';
import { Axios_Post_Moduls, request, Axios_Get_Moduls } from '../../../../API';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import uuid from 'react-uuid';
import { VscNewFile } from 'react-icons/vsc';
import { toast } from '../../../ToasMessage/ToastManager';

const ContentContainerMainDivBox = styled.div`
    /* max-height:400px;
    overflow:auto; */
    .Main_Content_Container {
        @media only screen and (max-width: 800px) {
            img {
                width: 100% !important;
            }
        }
    }

    .Main_Content_Container {
        border: 2px solid lightgray;
        border-radius: 10px;
        min-height: 200px;
        padding: 20px;
    }
    .Main_Content_Review {
        margin-top: 10px;
        .Review_Container {
            display: flex;
            textarea {
                width: 100%;
                border: 2px solid gray;
                border-radius: 10px;
                padding: 10px;
                resize: vertical;
                min-height: 50px;
                :focus {
                    border: 1px solid #368;
                    outline: 1px solid #368;
                }
            }
            button {
                width: 70px;
                /* border:2px solid gray; */
                border-radius: 10px;
                border: none;
                background-color: #368;
                color: white;
                :hover {
                    cursor: pointer;
                    background-color: lightgray;
                    color: #368;
                }
            }
        }
    }

    position: relative;
    .New_Code_Write {
        position: absolute;
        top: -30px;
        right: 10px;
        font-size: 1.5em;
        color: #368;
        :hover {
            cursor: pointer;
            color: blue;
        }
    }
`;
const ContentContainer = ({ list, Kizuki_Conent_Add_Modal_Is_Open, OnClose, setSelect_Kizuki }) => {
    const [commentList, setCommentList] = useState([]);
    const [All_Comment_List, setAll_Comment_List] = useState([]);
    const Login_Info = useSelector(state => state.LoginInfoDataRedux.Infomation);
    const [commentTextBox, setcommentTextBox] = useState('');

    const Handle_Clicks_Comment_Data = async () => {
        try {
            const Random_Comment_code = uuid().split('-');
            const Random_key_Comment = `${moment().format('YYYYMMDD')}_${Random_Comment_code[0]}${Random_Comment_code[1]}`;

            const Handle_Clicks_Comment_Data_Axios = await Axios_Post_Moduls('/LocalPim/Handle_Clicks_Comment_Data', {
                commentTextBox,
                Select_Datas: list,
                id: Login_Info.Login_id,
                Random_key_Comment,
            });

            if (Handle_Clicks_Comment_Data_Axios) {
                Kizuki_Comment_List_Getting();
                setcommentTextBox('');
            } else {
                toast.show({
                    title: `IT팀에 문의바랍니다.`,
                    successCheck: false,
                    duration: 6000,
                });
            }
        } catch (error) {
            console.log(error);
            toast.show({
                title: `IT팀에 문의바랍니다.`,
                successCheck: false,
                duration: 6000,
            });
        }
    };

    useEffect(() => {
        setCommentList(All_Comment_List);
    }, [All_Comment_List]);

    const Kizuki_Comment_List_Getting = async () => {
        try {
            const Kizuki_Comment_List_Getting_Axios = await Axios_Get_Moduls('/LocalPim/Kizuki_Comment_List_Getting', {
                kizuki_key: list.kizuki_notepad_kizuki_content_key,
            });

            if (Kizuki_Comment_List_Getting_Axios) {
                setCommentList(Kizuki_Comment_List_Getting_Axios);
                setAll_Comment_List(Kizuki_Comment_List_Getting_Axios);
            } else {
                toast.show({
                    title: `IT팀에 문의바랍니다.`,
                    successCheck: false,
                    duration: 6000,
                });
            }
        } catch (error) {
            console.log(error);
            toast.show({
                title: `IT팀에 문의바랍니다.`,
                successCheck: false,
                duration: 6000,
            });
        }
    };

    useEffect(() => {
        if (list) {
            Kizuki_Comment_List_Getting();
        }
    }, [list]);

    return (
        <ContentContainerMainDivBox>
            <div className="Main_Content_Container">
                <div
                    className="New_Code_Write"
                    onClick={() => {
                        Kizuki_Conent_Add_Modal_Is_Open();
                        setSelect_Kizuki(list);
                    }}
                >
                    <VscNewFile></VscNewFile>
                </div>
                <div>
                    <div>제 안 자 : {list.kizuki_notepad_kizuki_content_idea_id}</div>
                    <div>작 성 자 : {list.kizuki_notepad_kizuki_content_writer_id}</div>
                    <div>작 성 날 짜 : {moment(list.kizuki_notepad_kizuki_content_writer_date).format('YYYY-MM-DD HH:mm')}</div>
                </div>
                <div style={{ marginTop: '30px', marginBottom: '30px' }}></div>
                <div dangerouslySetInnerHTML={{ __html: list.kizuki_notepad_kizuki_content_main }}></div>
                <div style={{ border: '1px dashed gray', marginTop: '30px', marginBottom: '30px' }}></div>
                <div className="Main_Content_Review">
                    <div className="Review_Container">
                        <textarea
                            placeholder="댓글 작성"
                            value={commentTextBox}
                            onChange={e => setcommentTextBox(e.target.value)}
                        ></textarea>
                        <button onClick={() => Handle_Clicks_Comment_Data()}>등 록</button>
                    </div>

                    <CommentMainPage
                        commentList={commentList}
                        setCommentList={data => setCommentList(data)}
                        All_Comment_List={All_Comment_List}
                        setAll_Comment_List={data => setAll_Comment_List(data)}
                    ></CommentMainPage>
                </div>
            </div>
        </ContentContainerMainDivBox>
    );
};

export default ContentContainer;
