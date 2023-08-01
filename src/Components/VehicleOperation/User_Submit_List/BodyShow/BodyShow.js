import React from "react";
import styled from "styled-components";
import { BsCircle,BsArrowDown } from "react-icons/bs";
import { useSelector } from "react-redux";
import moment from "moment";
import { TbArrowAutofitHeight } from "react-icons/tb";
import { useDispatch } from 'react-redux';
import { Vehicle_Operation_State_Change_Func } from "../../../../Models/ReduxThunk/VehicleOperationReducer/VehicleOperationReducer";
import { useHistory } from "react-router-dom";
const BodyShowMainDivBox = styled.div`
    margin-top:20px;
    .Body_Container{
        margin-top:20px;
        margin-bottom:20px;
        border-bottom:1px solid lightgray;
    }
    .Body_Main_Container{
        margin-top:20px;
        margin-bottom:20px;
        .Body_Box_Container{
            width:90%;
            float:right;
            padding:20px;
            border-top-left-radius:20px;
            border-bottom-left-radius:20px;
            /* background: linear-gradient(-45deg, #f3f5f0 50%, #dfe8eb 50%) */
            background-color: #dfe8eb;
            background-image: linear-gradient(-45deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 44%, rgba(255, 255, 255, 0.3) 45%, rgba(255, 255, 255, 0.3) 55%, rgba(255, 255, 255, 0) 56%, rgba(255, 255, 255, 0) 100%);
            background-size: 10px 10px;
            background-repeat: repeat;

            .Main_Title_Header_Title_Container{
                  display: flex;
                width: 100%;
                justify-content: space-between;
                align-items: center;    
            }

            .Content_Time_Explain_Container{
                display:flex;
               align-items:center;
               margin-bottom:5px;
               .Time{
                width:50px;
               }
               .Address{
                margin-left:20px;
               }
            }
        }
        ::after{
            clear: both;
            content:"";
            display:block;
        }

        .Content_Box_Container{
            display:flex;
            justify-content:space-between;
            margin-top:30px;
            align-items:center;
            .Content_Explain{
                color:gray;
                font-size:0.8em;
                line-height:20px;
            }
            .Content_Distance{
                margin-right:30px;
            }
        }
    }


    .Body_Header_Container{
        margin-left:10px;
        strong{
            font-size:1.3em;
        }
        
    }
`

const BodyShow = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const Vehicle_Operation_State = useSelector((state) => state.VehicleOperationShowContentReduxThunk.Vehicle_Operation_Getting_Data_State);

    const Change_Vehicle_Data = (data) => {        
        const Changes_Data = {
        company_car_keys:data.company_input_list_keys,
        company_car_epid: data.company_car_epid,
        company_car_userId:data.company_car_userId,
        company_car_name: data.company_car_name,
        company_car_place: data.company_car_place,
        company_car_explain: data.company_car_explain,
            company_select: {
                value: data.company_input_list_select_car,
                label: `${ data.company_car_place}_${data.company_car_name}`
        },
            company_car_use_purpose_select: {
                value: data.company_input_list_purpose,
                label:data.company_input_list_purpose
        },
        company_car_use_date: new Date(data.company_input_list_date),
        company_car_start_place: data.company_car_start_place,
        company_car_end_place: data.company_input_start_history_place,
        company_car_start_dispatnce: data.company_input_start_history_distance,
        company_car_end_dispatnce: data.company_input_end_history_distance,
        company_car_oil_cost: data.company_input_list_oil_cost,
        company_car_road_cost: data.company_input_list_road_cost,
        company_car_etc_cost: data.company_input_list_etc_cost,
    }
        dispatch(Vehicle_Operation_State_Change_Func(Changes_Data));
        history.push(`/VehicleOperaion/NewVehicleOperation/${data.company_car_epid}`);
    }

    return (
        <BodyShowMainDivBox>
            
            {Vehicle_Operation_State?.Vehicle_Operation_State.map((list) => {
                return <div className="Body_Container" key={list.company_input_list_keys}>
                <div>
                    <div className="Body_Header_Container">
                            <strong>{ moment(list.company_input_list_date).format("DD")}일</strong>
                        <span style={{fontSize:"0.8em"}}>({ moment(list.company_input_list_date).locale('ko').format("dd")})</span>
                            <span style={{ marginLeft: "10px" }}>{ (list.company_input_end_history_distance-list.company_input_start_history_distance).toLocaleString('ko-KR')}KM</span>
                    </div>
                </div>

                <div className="Body_Main_Container">
                    <div className="Body_Box_Container">
                         <div className="Main_Title_Header_Title_Container">
                                <h4 style={{ marginTop: "0px" }}>[법인] {list.company_car_name}</h4>
                                <h4 style={{marginTop:"0px",fontSize:"1.3em"}} onClick={()=>Change_Vehicle_Data(list)}><TbArrowAutofitHeight></TbArrowAutofitHeight></h4>
                        </div>
                        <div>
                            <div className="Content_Time_Explain_Container">
                                {/* <div className="Time">07:29</div> */}
                                <div style={{color:"blue",fontSize:"0.5em"}}> <BsCircle></BsCircle> </div>
                                    <div className="Address"> { list.company_input_start_history_place} </div>
                            </div>
                        </div>
                        <div>
                            <div className="Content_Time_Explain_Container">
                                <div className="Time"></div>
                                <div style={{fontSize:"0.5em"}}> <BsArrowDown></BsArrowDown> </div>
                                <div className="Address">  </div>
                            </div>
                        </div>
                        <div>
                            <div className="Content_Time_Explain_Container">
                                {/* <div className="Time">07:29</div> */}
                                <div style={{color:"red" ,fontSize:"0.5em"}}> <BsCircle></BsCircle> </div>
                                <div className="Address"> { list.company_input_end_history_place} </div>
                            </div>
                        </div>

                            <div className="Content_Box_Container">
                                
                                            <div className="Content_Explain">
                                                    {/* <div>
                                                        <span>- 주행시간</span>
                                                        <span style={{paddingLeft:"10px"}}>1시 17분</span>
                                                    </div> */}
                                                    <div>
                                                        <span>- 운행목적  </span>
                                                        <div style={{ paddingLeft: "10px" }}>{ list.company_input_list_purpose}</div>
                                                    </div>
                                                                <div>
                                                                    <span>- 유류비</span>
                                                                    <span style={{ paddingLeft: "10px" }}>{list.company_input_list_oil_cost.toLocaleString('ko-KR')}원</span>
                                                                </div>
                                                                <div>
                                                                    <span>- 통행료</span>
                                                                    <span style={{paddingLeft:"10px"}}>{list.company_input_list_road_cost.toLocaleString('ko-KR')}원</span>
                                                                </div>
                                                                <div>
                                                                    <span>- 기타비용</span>
                                                                    <span style={{paddingLeft:"10px"}}>{list.company_input_list_etc_cost.toLocaleString('ko-KR')}원</span>
                                                                </div>
                                            </div>
                                        <div className="Content_Distance">
                                    <strong style={{ fontSize: "2em", marginRight: "10px" }}>{ (list.company_input_end_history_distance-list.company_input_start_history_distance).toLocaleString('ko-KR')}</strong>
                                            <strong>KM</strong>
                                        </div>
                            </div>
                        </div>
                </div>
            </div>
            })}
            
        </BodyShowMainDivBox>
    )
}

export default BodyShow;