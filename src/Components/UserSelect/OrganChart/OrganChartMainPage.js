import React from "react";
import styled from "styled-components";
import Modal from 'react-modal';
import { useEffect } from "react";
import { request } from "../../../API";
import { useState } from "react";
import OrganChartData from "./OrganChartData/OrganChartData";
import Tree from 'react-animated-tree-v2';
import { IoCloseSharp } from "react-icons/io5";
import Select from "react-select";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '70%',
        height: '80%',
    },
};
Modal.setAppElement('#AddUserModal');

const OrganChartMainPageMainDivBox = styled.div`



    position:relative;
    .CloseModal{
        position:absolute;
        top:-30px;
        right:5px;
        color:red;
        font-size:1.1em;
        :hover{
            cursor: pointer;
        }
    }

    .Float_Main_Container_Organ{
        display:flex;
        width:100%;
        position:relative;
        .SearchNames_container{
            position:absolute;
              top: -39px;
            right: 0px;
            height: 40px;
            width: 300px;
            form{
                width:100%;
                height:100%;
                input{
                width:100%;
                height:100%;
                border:1px solid lightgray;
                padding-left:10px;
                border-radius:3px;
            }
            }
            
        }

        .Float_Left_Container_Organ{
            width:35%;
            height:100%;
            border:1px solid lightgray;
            padding:10px;
            height:60vh;
            overflow:auto;
        }
        .Float_Right_Container_Organ{
            width:65%;
            height:100%;
            border:1px solid lightgray;
            height:60vh;
            overflow:auto;
            table{
                width:100%;
                border-collapse: collapse;
                empty-cells:show;
                
               thead{
                    tr{
                        background-color:#efefef;
                        padding:10px;
                        th{
                            text-align:start;
                            border-right:1px dashed gray;
                            padding:5px;
                            padding-left:10px;
                            font-weight:lighter;
                        }
                        
                    }
                }
                .table_tbody{
                    tr{
                        height:10px;
                        :hover{
                            background-color:skyblue;
                        }
                        td{
                            white-space:nowrap;
                            padding:8px;
                            border-bottom:1px solid gray;
                            font-weight:10;
                            
                            a{
                                color:black;
                                :hover{
                                    color:blue;
                                }
                            }
                        }
                    }
                }
            }
            
            .Float_Right_Container_Footer{
                    background-color: #fff;
                    position: sticky;
                    bottom: 1px;
                    height: 40px;
                    padding-left:10px;
                    border-top:1px solid black;
                    h4{
                        margin-top:10px;
                    }
                }
            }

        }
    
    

.treeview{
    span{
        :hover{
            cursor: pointer;
            color:blue;
        }
    }
}
`

const OrganChartMainPage = ({ UserSearchModalOn, setUserSearchModalOn, ClickedUser }) => {
    const [OrganChartState, setOrganChartState] = useState([]);
    const [ClickItemSelected, setClickItemSelected] = useState(null);
    const [UserDetailInfo, setUserDetailInfo] = useState([]);
    const [SearchUser, setSearchUser] = useState("");
    const [SelectUserInfoData, setSelectUserInfoData] = useState([]);
    const [SelectUserNames, setSelectUserNames] = useState("");


    const UserClickFunction = () => {
        const data = {
            value: ClickedUser.email_address,
            department_code :ClickedUser.department_code
        }
        SelectHandleChange(data);
    }

    const SelectHandleChange = async (e) => {
        if (e) {
             setSelectUserNames(e.value);
            await Upper_Department_Select_Getting(e.department_code)
            setClickItemSelected(e.department_code)   
        } else {
            setSearchUser('');
        }
    }

    const Upper_Department_Select_Getting = async (departmentCode) => {
        try {

            const Upper_Department_Select_Getting_Axios = await request(`/DepartmentRouter/Upper_Department_Select_Getting`, {
                params: {
                    departmentCode
                }
            })

            if (Upper_Department_Select_Getting_Axios.data.dataSuccess) {
                setOrganChartState(Upper_Department_Select_Getting_Axios.data.Tree_DepartMent)
             
            }

        } catch (error) {
            console.log(error);
        }
    }


    const HandleClickItemShowInfo = (item) => {
        try {
            setClickItemSelected(item);
        } catch (error) {
            console.log(error);
        }
    }


    const Select_UserInfoDataGetting = async () => {
        try {
            
            const Select_UserInfoDataGetting_Axios = await request.get(`/DepartmentRouter/Select_UserInfoDataGetting`)
            if (Select_UserInfoDataGetting_Axios.data.dataSuccess) {
                setSelectUserInfoData(Select_UserInfoDataGetting_Axios.data.Select_User_datas)
                
            }
        } catch (error) {
            console.log(error);
        
        }
    }


    const OrganDataGetting = async () => {
        try {
            
            const OrganDataGetting_Axios = await request.get(`/DepartmentRouter/DepartMent_Data`, {
                params: {
                    SearchUser
                }
            });
            if (OrganDataGetting_Axios.data.dataSuccess) {
                setOrganChartState(OrganDataGetting_Axios.data.Tree_DepartMent)
            }

        } catch (error) {
            console.log(error);
        }
    }
    
    const ChangeSelectedInfoGettingPersonInfo = async () => {
        try {
            
            const ChangeSelectedInfoGettingPersonInfo_Axios = await request.get(`/DepartmentRouter/ChangeSelectedInfoGettingPersonInfo`, {
                params: {
                    ClickItemSelected
                }
            })
            if (ChangeSelectedInfoGettingPersonInfo_Axios.data.dataSuccess) {
                setUserDetailInfo(ChangeSelectedInfoGettingPersonInfo_Axios.data.ChangeSelectedInfoGettingPersonInfo_Rows)
            }

        } catch (error) {
            console.log(error);
        }
    }
    

    useEffect(() => {
        if (UserSearchModalOn) {
            OrganDataGetting();
            Select_UserInfoDataGetting();
        } else {
            setClickItemSelected(null);
            setUserDetailInfo([]);
        }
    },[UserSearchModalOn])

    useEffect(() => {
        
        if (ClickItemSelected) {
            ChangeSelectedInfoGettingPersonInfo();
        }

    },[ClickItemSelected])
    
    useEffect(() => {
        if (ClickedUser) {
            UserClickFunction()
        } else {
            
        }
    },[ClickedUser])

    return (
        
        <Modal isOpen={UserSearchModalOn} style={customStyles} contentLabel="AddUser Modal" onRequestClose={() => setUserSearchModalOn()}>
            <OrganChartMainPageMainDivBox>
                <div className="CloseModal" onClick={()=>setUserSearchModalOn()}>
                    <IoCloseSharp></IoCloseSharp>
                </div>
            <h4 style={{ borderBottom: "1px solid light gray" }}>조직도</h4>
                <div className="Float_Main_Container_Organ">
                    <div className="SearchNames_container">
                            <Select
                                    className="basic-single"
                                    classNamePrefix="이름 또는 이메일 검색..."
                                    placeholder='이름 또는 이메일 검색...'
                                    // defaultValue={SelectLeftHeaderInfo}
                                    isClearable={true}
                                    isSearchable={true}
                                    name="User_Search"
                                    options={SelectUserInfoData}
                            onChange={(e) => SelectHandleChange(e)}
                            
                                />
                    </div>
                    <div className="Float_Left_Container_Organ">
                        {OrganChartState.map((list) => {
                            return list.children.length > 0 ?
                                    (<Tree
                                        key={list.department_code}
                                content={list.department_name}  
                                itemId={list.department_code}
                                onItemClick={(content) => HandleClickItemShowInfo(content)}
                                        open={list.openChecking}
                                        visible={list.openChecking}
                            >
                                <OrganChartData items={list.children} HandleClickItemShowInfo={(content)=>HandleClickItemShowInfo(content)}></OrganChartData>
                                    </Tree>) : 
                                    (<Tree
                                    key={list.department_code}    content={list.department_name}
                                         open={list.openChecking}
                                        visible={list.openChecking}
                                itemId={list.department_code}
                                        onItemClick={(content) => HandleClickItemShowInfo(content)}></Tree>)
                            })}
                        
                    </div>
                    <div className="Float_Right_Container_Organ">
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>성명</th>
                                        <th>소속</th>
                                        <th>부서</th>
                                        <th>이메일</th>
                                        <th>휴대폰</th>
                                    </tr>
                                </thead>
                                <tbody className="table_tbody">
                                    {UserDetailInfo.map(list => {
                                        return <tr key={list.brity_works_detail_user_info_id} style={SelectUserNames === list.brity_works_detail_user_info_id ? {backgroundColor:"yellow"}:{}} >
                                            <td>{list.brity_works_user_info_name}</td>
                                            <td>{ list.brity_works_user_info_company}</td>
                                            <td>{ list.brity_works_detail_user_info_team}</td>
                                            <td>
                                                <a href={`mailto:${list.brity_works_detail_user_info_id}`}>{list.brity_works_detail_user_info_id}</a>
                                            </td>
                                            <td>{ list.brity_works_detail_user_info_phone_number}</td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>    
                             <div className="Float_Right_Container_Footer">
                                <h4>총 {UserDetailInfo.length }</h4>
                             </div>
                        </div>

                         
                    </div>
                </div>
                </OrganChartMainPageMainDivBox>
            </Modal>
        
    )
}

export default OrganChartMainPage;