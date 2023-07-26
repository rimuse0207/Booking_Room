import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { request } from "../../API";
import { BsFillTelephoneOutboundFill } from "react-icons/bs";
import {useParams} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { Loader_Check_For_False, Loader_Check_For_True } from "../../Models/LoaderCheckReducer/LoaderCheckReducer";
import LoaderMainPage from "../Loader/LoaderMainPage";

const CarContactMainDivBox = styled.div`
    text-align:center;
    .Content_Container{
        margin-top:20px;
        margin-bottom:20px;
    }
    .Ci_Container{
        margin-top:50px;
        margin-bottom:50px;
    }
    .Phone_Icon_Container{
        margin:0 auto;    
        padding:10px;
        width:120px;
        border-radius:50%;
        height:120px;
        display:flex;
        align-items:center;
        justify-content:center;
        background-color:darkgray;
        color:#fff;
        margin-top:30px;
        font-size:1.8em;            
    }
`

const CarContact = () => {
    const dispatch = useDispatch();
    const {car_Target_ID,car_User_ID} = useParams();
    const [PhoneNumber, setPhoneNumber] = useState("+82-31-639-9026");
    const Loading = useSelector(state => state.LoaderCheckingRedux.loading);
    const Contact_Reservation = async () => {
        try {
            dispatch(Loader_Check_For_True());
            const Contact_Reservation_Axios = await request.get('/DepartmentRouter/Contact_Reservation', {
                params: {
                    car_Target_ID,
                    car_User_ID
                }
            });            
            console.log(Contact_Reservation_Axios);
            if (Contact_Reservation_Axios.data.dataSuccess) {
                if (Contact_Reservation_Axios.data.dataNothing) {
                    setPhoneNumber("+82-31-639-9026");
                    dispatch(Loader_Check_For_False());
                } else {
                    if (Contact_Reservation_Axios.data.User_Info_Gettings.mobile) {
                        setPhoneNumber(Contact_Reservation_Axios.data.User_Info_Gettings.mobile);    
                    } else {
                        setPhoneNumber("+82-31-639-9026");
                    }
                    
                    dispatch(Loader_Check_For_False());
                }
            } else {
                setPhoneNumber("+82-31-639-9026");
                dispatch(Loader_Check_For_False());
            }

        } catch (error) {
            console.log(error);
            setPhoneNumber("+82-31-639-9026");
            dispatch(Loader_Check_For_False());
        }
    }

    useEffect(() => {
        Contact_Reservation(); 
    },[])

    return (
        <CarContactMainDivBox>
            <div style={{ marginTop: "80px" }}>
                <h2>불편함을 드려 죄송합니다.</h2>
            </div>
            <div className="Content_Container">
             
                <a href={`tel:${PhoneNumber}`}>
                 <div className="Phone_Icon_Container">
                    
                            <BsFillTelephoneOutboundFill></BsFillTelephoneOutboundFill>
                    
                    </div>
                    </a>
                <div style={{lineHeight:"30px",fontSize:"1.2em",marginTop:"40px"}}>
                    {/* <h2>디에이치케이솔루션</h2> */}
                    <div>상기의 아이콘을 클릭하시면</div>
                    <div><strong>전화연결</strong> 화면으로 연결됩니다.</div>
                </div>
               
            </div>
            {/* 로딩 컴포넌트 시작 */}
            <LoaderMainPage loading={Loading}></LoaderMainPage>
        </CarContactMainDivBox>

    )
}

export default CarContact;