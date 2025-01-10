import React from 'react';
import styled from 'styled-components';
import { BsPersonCircle } from "react-icons/bs";
import moment from "moment";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import CommentWrite from './CommentWrite';


const CommentMainPageMainDivBox = styled.div`
    border-bottom:1px solid lightgray;


    .Comment_Main_Container{
        border-top:1px solid lightgray;
       padding-bottom: 20px;
    padding-top: 20px;

    @media only screen and (max-width: 800px) {
    padding-bottom: 10px;
    padding-top: 10px;
        }
    }

    .User_Info_Container{
        display:flex;
        align-items:center;
        .User_Info_Icons{
            font-size:2em;
            color:gray;
        }
        .User_Info_Detail{
            margin-left:10px;
        }
    }

    .Reply_Container{
        :hover{
            cursor: pointer;
        }
    }
    .FirstContainer{
        margin-left:20px;
        padding-top:10px;
          @media only screen and (max-width: 800px) {
              margin-left:0px;
            padding-top:0px;
        }
        li{
            background-color:#FAFBFC;    
            padding-left:10px;
          
        }
    }
    .SecondContainer{
        background-color:#fff;
    }
    .Reply_Container_Close{
        display:flex;
        align-items:center;
        justify-content:center;
        margin-top:10px;
        span{
            margin-right:10px;
            margin-left:10px;
        }
    }

      @media only screen and (max-width: 800px) {
            ul{
                padding:0px;
                
            }
        }

        pre{
            white-space: pre-wrap;
            line-height: 1.5;
        }

`

const CommentMainPage = ({commentList,setCommentList,All_Comment_List,setAll_Comment_List}) => {

    const Handle_Clicks_Reply_Open_And_Close_Func_Cal = (All_Data,Select_data) => {
       
        return All_Data.map((item) => {
            if (item.kizuki_notepad_kizuki_comment_code === Select_data.kizuki_notepad_kizuki_comment_code) {
                return {
                ...item,
                    reply_show: !item.reply_show,
                reply_write_show:!item.reply_write_show
                };
            } else if (item.children.length > 0) {
                return {
                ...item,
                children: Handle_Clicks_Reply_Open_And_Close_Func_Cal(item.children, Select_data),
                };
            }
            return item;
                });
        

    }

    const Handle_Clicks_Reply_Open_And_Close = async (All_Data,Select_data) => {
        const UpdateData = await Handle_Clicks_Reply_Open_And_Close_Func_Cal(All_Data, Select_data);
        
        await setAll_Comment_List(UpdateData);   
        
    }

    const Handle_Clicks_Reply_Write_Open_And_Close_Func_Cal = (All_Data, Select_data) => {
        
        return All_Data.map((item) => {
            if (item.kizuki_notepad_kizuki_comment_code === Select_data.kizuki_notepad_kizuki_comment_code) {
                return {
                ...item,
                    reply_write_show: !item.reply_write_show,
                    reply_show: !item.reply_show,
                };
            } else if (item.children.length > 0) {
                return {
                ...item,
                children: Handle_Clicks_Reply_Write_Open_And_Close_Func_Cal(item.children, Select_data),
                };
            }
            return item;
                });
    }
    

    const Handle_Clicks_Reply_Write_Open_And_Close =async (All_Data, Select_data) => {
        const UpdateData =await Handle_Clicks_Reply_Write_Open_And_Close_Func_Cal(All_Data, Select_data)
        await setAll_Comment_List(UpdateData);   
     
    }


    return (
        <CommentMainPageMainDivBox>
            <div>
                <ul>
                    {commentList.length > 0 ? commentList.map((list,j) => {
                       return <li className="Comment_Main_Container" key={list.kizuki_notepad_kizuki_comment_code}>
                        <div>
                            <div className="User_Info_Container">
                                <div className="User_Info_Icons">
                                    <BsPersonCircle></BsPersonCircle>
                                </div>
                                <div className="User_Info_Detail">
                                       <div>{ list.kizuki_notepad_kizuki_comment_writer_id}</div>
                                       <div style={{ marginTop: '5px', color: "gray", fontSize: "0.6em" }}>{ moment(list.kizuki_notepad_kizuki_comment_write_date).format("YYYY-MM-DD HH:mm")}</div>
                                </div>
                            </div>
                            <div>
                                <pre>
                                       { list.kizuki_notepad_kizuki_comment_content}
                                </pre>
                               </div>
                             </div>

                           <div className={list.kizuki_notepad_kizuki_comment_parent_code === "TOP" ? "FirstContainer" : "SecondContainer"} >
                               {/* 답글이 있을때 없을떄 */}
                               { list.kizuki_notepad_kizuki_comment_parent_code === "TOP"  && list.children.length > 0 ? <div className="Reply_Container" onClick={() => Handle_Clicks_Reply_Open_And_Close(All_Comment_List, list)}>답글 {list.children.length}</div> : list.kizuki_notepad_kizuki_comment_parent_code === "TOP" ? <div className="Reply_Container" style={{color:"darkgray"}}  onClick={() => Handle_Clicks_Reply_Write_Open_And_Close(All_Comment_List, list)}>답글 작성</div>:<></>}
                               {/* 답글을 클릭 했을 때 */}

                               {list.reply_show ? <div>{<CommentMainPage commentList={list.children} setCommentList={(data)=>setCommentList(data)} All_Comment_List={All_Comment_List} setAll_Comment_List={(data)=>setAll_Comment_List(data)}></CommentMainPage>}</div>:<div></div>}
                                    
                               {list.reply_write_show ? <div >
                                   <CommentWrite list={list} All_Comment_List={All_Comment_List} setAll_Comment_List={(data) => setAll_Comment_List(data)}></CommentWrite>
                                   <div  className="Reply_Container_Close" >
                                        <span className="Reply_Container" onClick={() => Handle_Clicks_Reply_Write_Open_And_Close(All_Comment_List, list)}>답글 접기 </span>
                                        <span className="Reply_Container" onClick={() => Handle_Clicks_Reply_Write_Open_And_Close(All_Comment_List, list)}><MdOutlineKeyboardArrowUp></MdOutlineKeyboardArrowUp></span>
                                       
                                   </div>
                               </div> : <></>}

                           </div>
                            
                    </li>    
                    }) : <div>
                  
                    </div>}
                    
                </ul>
            </div>
        </CommentMainPageMainDivBox>
    )
}

export default CommentMainPage;