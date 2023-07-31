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
    

       const handleChangeData = (e) => {
        const Change_Data = {
            ...VehicleOperationState,
            company_car_use_date:e
        }

        dispatch(Vehicle_Operation_State_Change_Func(Change_Data))
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