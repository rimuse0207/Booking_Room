import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import { request } from "../../../../API";
import { useDispatch, useSelector } from "react-redux";
import { Vehicle_Operation_Select_Car_Change_Func, Vehicle_Operation_Show_Content_Reduce_Thunk } from "../../../../Models/ReduxThunk/VehicleOperationShowContentRedux/VehicleOperationShowContent";

const CarSelectorMainDivBox = styled.div`
background-color:#fff;
padding-top:20px;
padding-bottom:20px;
padding-left:20px;
.Car_Select_Container{
    display:flex;
    width:100%;
    align-items:center;
    .Car_Select_Title{
        margin-right:10px;
        font-size:1.2em;
        font-weight:lighter;
    }
    .Car_Select_Content{
        select{
            border:none;
            font-size:1em;
            height:35px;
        }
    }
}

`

const CarSelector = () => {
    const dispatch = useDispatch();
    const Vehicle_Operation_State = useSelector((state) => state.VehicleOperationShowContentReduxThunk.Vehicle_Operation_Getting_Data_State);
    const LoginInfo = useSelector(state => state.LoginInfoDataRedux.Infomation);
    const [CarList_State, setCarList_State] = useState([{
        company_car_epid: "All",
        company_car_explain: "",
        company_car_indexs: 0,
        company_car_name: "",
        company_car_place: "",
        company_car_userId: "",
        label: "법인차량 전체",
        value: "All",
    }]);


    const handleChangeData = (e) => {
        
        dispatch(Vehicle_Operation_Select_Car_Change_Func(e.target.value))
        dispatch(Vehicle_Operation_Show_Content_Reduce_Thunk(e.target.value,Vehicle_Operation_State.Vehilce_Selected_Date,LoginInfo.Login_id))
        
    }

     const Car_Info_Data_Getting = async () => {
        
         const Car_Info_Data_Getting_Axios = await request.get('/DepartmentRouter/Car_Info_Data_Getting');
        
         if (Car_Info_Data_Getting_Axios.data.dataSuccess) {
             const ChangeData = [{
                    company_car_epid: "All",
                    company_car_explain: "",
                    company_car_indexs: 0,
                    company_car_name: "",
                    company_car_place: "",
                    company_car_userId: "",
                    label: "법인차량 전체",
                    value: "All",
                }]
            setCarList_State(ChangeData.concat(Car_Info_Data_Getting_Axios.data.Car_Info_Data_Getting_Rows));
        }

    }

    useEffect(() => {
        Car_Info_Data_Getting();
        dispatch(Vehicle_Operation_Show_Content_Reduce_Thunk("All",Vehicle_Operation_State.Vehilce_Selected_Date,LoginInfo.Login_id))
    },[])
    return (
        <CarSelectorMainDivBox>
            <div className="Car_Select_Container">
                <div className="Car_Select_Title" style={{ color: "#002FEF" }}>[법인]</div>
                <div className="Car_Select_Content">
                  
                    <select value={Vehicle_Operation_State.Vehicle_Selected_Car} onChange={(e)=>handleChangeData(e)}>
                        {CarList_State.map((list) => {
                            return <option key={list.value} value={list.value}>{list.company_car_explain} { "   "}{ list.label}</option>
                        })}
                    </select>
                </div>
            </div>
        </CarSelectorMainDivBox>
    )
}

export default CarSelector;