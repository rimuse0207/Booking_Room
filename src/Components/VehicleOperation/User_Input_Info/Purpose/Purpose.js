import React, { useState } from "react";
import styled from "styled-components";
import  Select  from 'react-select';
import { useDispatch, useSelector } from "react-redux";
import { Vehicle_Operation_State_Change_Func } from "../../../../Models/ReduxThunk/VehicleOperationReducer/VehicleOperationReducer";

export const PurposeMainDivBox = styled.div`

    .Purpose_Container{
        padding-top:10px;
        padding-bottom:10px;
        display:flex;
        align-items:center;
        background-color:#fff;
        margin-top:10px;
        margin-bottom:10px;
          @media only screen and (max-width: 500px) {
                display:block;
                .Purpose_Label{
                    margin-bottom:10px;
                }
            }
        .Purpose_Label{
            margin-left:10px;
            margin-right:10px;
        }
        .Purpose_Selector{
            min-width:350px;
        }
    }
`

const Purpose = () => {
    const dispatch = useDispatch();
    const VehicleOperationState = useSelector(state => state.VehicleOperationRedux.Vehicle_Operation_Input_State);
    const [Purpose_List, setPurpost_List] = useState([
        {
            value: "a",
            label:"a:제조. 판매시설 등 해당 법인의 사업장 방문"
        },
        {
            value: "b",
            label:"b:거래처.대리점 방문"
        },
        {
            value: "c",
            label:"c:회의참석"
        },
        {
            value: "d",
            label:"d:판촉활동"
        },
        {
            value: "e",
            label:"e:출.퇴근"
        },
        {
            value: "f",
            label:"f:교육.훈련등 기타위에서 정하지 않은 업무"
        },
    
    ])
    const handleChangeData = (e) => {
        const Change_Data = {
            ...VehicleOperationState,
          company_car_use_purpose_select:e
        }

        dispatch(Vehicle_Operation_State_Change_Func(Change_Data))
        
    }
    return (
        <PurposeMainDivBox>
            <div className="Purpose_Container">
                <div className="Purpose_Label">운행목적</div>
                <div className="Purpose_Selector">
                    <Select
                            onChange={e => handleChangeData(e)}
                            name="colors"
                            options={Purpose_List}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            isReadOnly={true}
                            isSearchable={false}
                        placeholder="선택바랍니다."
                        value={VehicleOperationState.company_car_use_purpose_select}
                            />
                </div>
            </div>
        </PurposeMainDivBox>
    )
}

export default Purpose;