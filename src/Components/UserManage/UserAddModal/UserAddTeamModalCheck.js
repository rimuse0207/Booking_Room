import React from "react";
import styled from "styled-components";
import Modal from 'react-modal';
import {IoCloseSharp} from "react-icons/io5";
import { request } from "../../../API";
import { useEffect } from "react";
import { useState } from "react";
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        minHeight: "50vh",
    minWidth:"30vw"
  },
};

Modal.setAppElement('#AddUserModal');

const UserAddTeamModalCheckMainDivBox = styled.div`
    
    position:relative;
    .CloseModal{
        position:absolute;
        top:-20px;
        right:5px;
        color:red;
        font-size:1.1em;
        :hover{
            cursor: pointer;
        }
    }
    table{
        width: 100%;
        border-top: 1px solid lightgray;
        border-collapse: collapse;
        tbody{
            tr{
             :hover{
                cursor: pointer;
                background-color:skyblue;
            }
        td{
                :hover{
                    cursor: pointer;
                    background-color:skyblue;
                }
            }
        }
        
    }
    }
    th, td {
    border-bottom: 1px solid lightgray;
    padding: 10px;
    
  }
  
`

const UserAddTeamModalCheck = ({ AddUserModalIsOpen, setAddUserModalIsOpen, setAddUserInfoData, AddUserInfoData }) => {
    const [Department_Data, setDepartment_Data] = useState([]);


    const handleClickData = async (data) => {
        setAddUserInfoData({ ...AddUserInfoData, Team: data.department_name, Team_Code: data.department_code })
        setAddUserModalIsOpen();
    }


    const Department_Data_Getting = async () => {
        try {
            
            const Department_Data_Getting_Axios = await request.get(`/DepartmentRouter/Department_Data_Getting`);

            if (Department_Data_Getting_Axios.data.dataSuccess) {
                setDepartment_Data(Department_Data_Getting_Axios.data.Department_Data_Getting_Rows);
                
                }

        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        Department_Data_Getting(); 
    },[])

    return (
        <Modal isOpen={AddUserModalIsOpen} contentLabel="Team Select Modal" style={customStyles} >
            <UserAddTeamModalCheckMainDivBox>
                <div className="CloseModal" onClick={()=>setAddUserModalIsOpen()}>
                    <IoCloseSharp></IoCloseSharp>
                </div>
                <h4>팀명 선택</h4>
                <table>
                    <thead>
                        <tr>
                            <th>부서명</th>
                            <th>부서 코드</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Department_Data.map((list) => {
                            return <tr key={list.department_code} onClick={()=>handleClickData(list)}>
                                <td style={{fontWeight:"bolder"}}>{list.department_name}</td>
                                <td>{list.department_code}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </UserAddTeamModalCheckMainDivBox>
        </Modal>
    )
}

export default UserAddTeamModalCheck;