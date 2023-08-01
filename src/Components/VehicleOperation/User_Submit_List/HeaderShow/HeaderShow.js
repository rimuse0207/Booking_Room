import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { RiArrowRightSFill,RiArrowLeftSFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Vehicle_Operation_Date_Change_Func, Vehicle_Operation_Show_Content_Reduce_Thunk } from '../../../../Models/ReduxThunk/VehicleOperationShowContentRedux/VehicleOperationShowContent';

const HeaderShowMainDivBox = styled.div`
    width:90%;
    margin:0 auto;
    background-color:#002FEF;
    margin-top:20px;
    color:#fff;
    border-radius:20px;
    font-weight:bolder;
    margin-bottom:20px;
    .Main_Header_Container{
        display:flex;
        .Sub_Header_Container{
            text-align:center;
            padding:15px;
            .Date_Container{
                display:flex;
                justify-content:space-around;
                margin-top: 10px;
                font-size: 1.3em;
            }
            .Sub_Text_Container{
                display:flex;
                padding-left:20px;
                align-items:center;
                .Sub_Text_Title{
                    margin-right:20px;
                    color:lightgray;
                }
            }
        }
    }
`

const HeaderShow = () => {
    const dispatch = useDispatch();
    const Vehicle_Operation_State = useSelector((state) => state.VehicleOperationShowContentReduxThunk.Vehicle_Operation_Getting_Data_State);
    const LoginInfo = useSelector(state => state.LoginInfoDataRedux.Infomation);
    const HandlePreDateChange = () => {
        const Change_Date = moment(Vehicle_Operation_State.Vehilce_Selected_Date).subtract(1, 'months')
        dispatch(Vehicle_Operation_Date_Change_Func(Change_Date))
        dispatch(Vehicle_Operation_Show_Content_Reduce_Thunk(Vehicle_Operation_State.Vehicle_Selected_Car,Change_Date,LoginInfo.Login_id))
    }

    const HandleNextDateChange = () => {
         const Change_Date = moment(Vehicle_Operation_State.Vehilce_Selected_Date).add(1, 'months')
        dispatch(Vehicle_Operation_Date_Change_Func(Change_Date))
        dispatch(Vehicle_Operation_Show_Content_Reduce_Thunk(Vehicle_Operation_State.Vehicle_Selected_Car,Change_Date,LoginInfo.Login_id))
    }


    const Sum_Distance = (data) => {
        const filteredData = data.filter(item => item.company_input_start_history_distance > 0 && item.company_input_end_history_distance > 0);

        const sum = filteredData.reduce((total, item) => total + (item.company_input_end_history_distance - item.company_input_start_history_distance), 0);
        return sum;
    }

    return (
        <HeaderShowMainDivBox> 
            <div className="Main_Header_Container">
                <div className="Sub_Header_Container" style={{width:"35%"}}>
                    <div style={{fontSize:"0.7em"}}>{ moment(Vehicle_Operation_State.Vehilce_Selected_Date).format("YYYY")}</div>
                    <div className="Date_Container">
                        <div onClick={()=>HandlePreDateChange()}>
                            <RiArrowLeftSFill></RiArrowLeftSFill>
                        </div>
                        <div>{ moment(Vehicle_Operation_State.Vehilce_Selected_Date).format("M")}월</div>
                        <div onClick={()=>HandleNextDateChange()}>
                            <RiArrowRightSFill></RiArrowRightSFill>
                        </div>
                    </div>
                </div>
                <div className="Sub_Header_Container" style={{width:"65%",borderLeft:"1px solid black"}}>
                    <div className="Sub_Text_Container">
                        <div className="Sub_Text_Title">운행거리</div>
                        <div className="Sub_Text_Content">{ Sum_Distance(Vehicle_Operation_State.Vehicle_Operation_State)}KM</div>
                    </div>
                    <div className="Sub_Text_Container" style={{marginTop:"15px"}}>
                        <div className="Sub_Text_Title">운행기록</div>
                        <div className="Sub_Text_Content">{ Vehicle_Operation_State.Vehicle_Operation_State.length}건</div>
                    </div>
                </div>
            </div>

        </HeaderShowMainDivBox>
    )
}

export default HeaderShow;