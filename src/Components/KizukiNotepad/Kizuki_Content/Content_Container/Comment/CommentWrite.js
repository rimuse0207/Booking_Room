import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { request } from "../../../../../API";
import { useSelector } from "react-redux";
import moment from "moment";
import uuid from "react-uuid";

const CommentWriteMainDivBox = styled.div`
    margin-top:15px;
    display:flex;
    input{
        border:2px solid darkgray;
        padding-left:20px;
        height:50px;
        border-radius:10px;
        width:100%;
        :focus{
            border:1px solid #368;
            outline:1px solid #368;
        }
    }
    button{
        width:50px;
        height:50px;
        border-radius:10px;
        border:none;
        background-color:#368;
        color:white;
        :hover{
            cursor: pointer;
            background-color:lightgray;
            color:#368;
        }
    }
`

const CommentWrite = ({list,All_Comment_List,setAll_Comment_List}) => {
    const [Comment_Write_State, setComment_Write_State] = useState("");
    const Login_Info = useSelector((state) => state.LoginInfoDataRedux.Infomation);
    
    const Handle_Click_Save_New_Comment = async () => {
        try {
            const Random_Comment_code = uuid().split("-");
            const Random_key_Comment = `${moment().format("YYYYMMDD")}_${Random_Comment_code[0]}${Random_Comment_code[1]}`

            const Handle_Click_Save_New_Comment_Axios = await request.post('/LocalPim/Handle_Click_Save_New_Comment', {
                Select_Data: list,
                Comment_Write_State,
                id: Login_Info.Login_id,
                Random_key_Comment
            })

            if (Handle_Click_Save_New_Comment_Axios.data.dataSuccess) {
                Insert_Data(Random_key_Comment)    
                setComment_Write_State("");
            }
                
            
        } catch (error) {
            console.log(error);
        }
    }


    const Insert_Data_Func_Cal = (All_Data, Random_key_Comment, InsertData) => {
        return All_Data.map((item) => {
            if (item.kizuki_notepad_kizuki_comment_code === (list.kizuki_notepad_kizuki_comment_parent_code === "TOP" ? list.kizuki_notepad_kizuki_comment_code:list.kizuki_notepad_kizuki_comment_parent_code)  ) {
                return {
                ...item,
                    children: item.children.concat(InsertData),
                };
            } else if (item.children.length > 0) {
                return {
                ...item,
                children: Insert_Data_Func_Cal(item.children,Random_key_Comment,InsertData),
                };
            }
            return item;
                });
    }
    

    const Insert_Data = async (Random_key_Comment) => {
        const InsertData={
                        kizuki_notepad_kizuki_comment_indexs:9999,
                        kizuki_notepad_kizuki_comment_code:Random_key_Comment,
                        kizuki_notepad_kizuki_comment_writer_id: Login_Info.Login_id,
                        kizuki_notepad_kizuki_comment_content :Comment_Write_State,
                        kizuki_notepad_kizuki_comment_parent_code: (list.kizuki_notepad_kizuki_comment_parent_code === "TOP" ? list.kizuki_notepad_kizuki_comment_code:list.kizuki_notepad_kizuki_comment_parent_code),
                        kizuki_notepad_kizuki_comment_kizuki_key : list.kizuki_notepad_kizuki_comment_kizuki_key,
                        kizuki_notepad_kizuki_comment_write_date: moment(),
                           children:[],
                        reply_show: false,
                        reply_write_show:false,
                }
        const UpdateData = await Insert_Data_Func_Cal(All_Comment_List,Random_key_Comment,InsertData)
        setAll_Comment_List(UpdateData);    
    }

    return (
        <CommentWriteMainDivBox>
            <input type="text" value={Comment_Write_State} onChange={(e) => setComment_Write_State(e.target.value)} placeholder="댓글을 작성 바랍니다."></input>
            
                <button onClick={()=>Handle_Click_Save_New_Comment()}>등 록</button>
            
        </CommentWriteMainDivBox>
    )
}

export default CommentWrite;