import React from "react";
import { PurposeMainDivBox } from "../Purpose/Purpose";
import DatePicker from "react-datepicker";
import { ko } from 'date-fns/esm/locale';
import { forwardRef } from "react";
import moment from "moment";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Vehicle_Operation_State_Change_Func } from "../../../../Models/ReduxThunk/VehicleOperationReducer/VehicleOperationReducer";
import { request } from "../../../../API";

const DateMainDivBox = styled.div`
background-color:#fff;
padding-top:10px;
margin-bottom:10px;
padding-bottom:10px;
height:60px;
    .Date_Container{
        display:flex;
        align-items:center;
        height:100%;
        .Date_Label{
            padding-left:10px;
            margin-right:20px;
        }
        .Date_Selector{
            width:200px;
            .react-datepicker-wrapper{
                
                button{
                    width:200px;
                    height:40px;
                    border:none;
                    background-color:#fff;
                    font-size:1em;
                }
            }
        }
    }
`

const Date = () => {
    const dispatch = useDispatch();
    const VehicleOperationState = useSelector(state => state.VehicleOperationRedux.Vehicle_Operation_Input_State);
    const LoginInfo = useSelector(state => state.LoginInfoDataRedux.Infomation);


    const handleChangeData = async(e) => {

        const Vehicle_Operation_Car_Change_Rendering_Axios = await request.get(`/DepartmentRouter/Vehicle_Operation_Car_Change_Rendering`, {
            params: {
                car_id:VehicleOperationState.company_car_epid ,
                Login_id: LoginInfo.Login_id,
                selcet_date: e,
                company_car_erp_id:VehicleOperationState.company_car_erp_id
            }
        })
        const Change_Datas = {
            ...VehicleOperationState,
             company_car_keys:"",
                        company_car_start_dispatnce:Vehicle_Operation_Car_Change_Rendering_Axios.data.Last_Distance,
                        company_car_end_dispatnce:Vehicle_Operation_Car_Change_Rendering_Axios.data.Last_Distance,
                        company_car_use_date:e
        }
        if (Vehicle_Operation_Car_Change_Rendering_Axios.data.dataSuccess) {
            if (Vehicle_Operation_Car_Change_Rendering_Axios.data.Vehicle_Operation_Car_Change_Rendering_Rows.length > 0) {
               const Change_Data = {
                        ...VehicleOperationState,
                     
                        company_car_keys:Vehicle_Operation_Car_Change_Rendering_Axios.data.Vehicle_Operation_Car_Change_Rendering_Rows[0].company_input_list_keys,
                        company_car_use_purpose_select: {
                            value: Vehicle_Operation_Car_Change_Rendering_Axios.data.Vehicle_Operation_Car_Change_Rendering_Rows[0].company_input_list_purpose,
                            label:Vehicle_Operation_Car_Change_Rendering_Axios.data.Vehicle_Operation_Car_Change_Rendering_Rows[0].company_input_list_purpose
                        },
                        company_car_start_place:Vehicle_Operation_Car_Change_Rendering_Axios.data.Vehicle_Operation_Car_Change_Rendering_Rows[0].company_input_start_history_place,
                        company_car_end_place:Vehicle_Operation_Car_Change_Rendering_Axios.data.Vehicle_Operation_Car_Change_Rendering_Rows[0].company_input_end_history_place,
                        company_car_start_dispatnce:Vehicle_Operation_Car_Change_Rendering_Axios.data.Last_Distance,
                        company_car_end_dispatnce:Vehicle_Operation_Car_Change_Rendering_Axios.data.Last_Distance,
                        company_car_oil_cost:Vehicle_Operation_Car_Change_Rendering_Axios.data.Vehicle_Operation_Car_Change_Rendering_Rows[0].company_input_list_oil_cost,
                        company_car_road_cost:Vehicle_Operation_Car_Change_Rendering_Axios.data.Vehicle_Operation_Car_Change_Rendering_Rows[0].company_input_list_road_cost,
                        company_car_etc_cost: Vehicle_Operation_Car_Change_Rendering_Axios.data.Vehicle_Operation_Car_Change_Rendering_Rows[0].company_input_list_etc_cost,
                        company_car_use_date:e
                }
                dispatch(Vehicle_Operation_State_Change_Func(Change_Data))
            } else {
                dispatch(Vehicle_Operation_State_Change_Func(Change_Datas))    
            }

        } else {
                dispatch(Vehicle_Operation_State_Change_Func(Change_Datas))
        }

        
    }


    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <button className="example-custom-input" onClick={onClick} ref={ref}>
            {value}
        </button>
    ));


    return (
        <DateMainDivBox>
     
            <div className="Date_Container">
                <div className="Date_Label">이용날짜 : </div>
                <div className="Date_Selector">
                      <DatePicker
                            locale={ko}
                            selected={VehicleOperationState.company_car_use_date}
                            onChange={(data)=>handleChangeData(data)}
                            dateFormat="yyyy-MM-dd"
                            highlightDates={[new window.Date()]}
                            maxDate={new window.Date()}
                            popperModifiers={{
                                                // 모바일 web 환경에서 화면을 벗어나지 않도록 하는 설정
                                                preventOverflow: {
                                                    enabled: true,
                                                },
                                            }}
                                            customInput={<ExampleCustomInput />}
                                        />
                </div>
            </div>
          
        </DateMainDivBox>
    )
}

export default Date;