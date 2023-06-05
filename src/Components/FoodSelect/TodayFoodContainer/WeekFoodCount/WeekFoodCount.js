import React from 'react';
import styled from 'styled-components';
import moment from "moment";
import { FaPlus ,FaMinus } from "react-icons/fa";
import { useState } from 'react';
import {IoIosArrowBack,IoIosArrowForward} from 'react-icons/io'
import { useEffect } from 'react';
import { request } from '../../../../API';
import { useSelector } from 'react-redux';
import { toast } from '../../../ToasMessage/ToastManager';

const WeekFoodCountMainDivBox = styled.div`
    max-width:700px;
    margin:0 auto;
    border-bottom:1px solid lightgray;
    padding:5px;
    .WeekFoodCount_Container{
        display:flex;
        width:100%;
        justify-content:space-around;
        align-items:center;
        .Arrow_Left{
                font-size:2em;
            }
            .Arrow_Right{
                font-size:2em;
            }
        .Day_Container{
            text-align:center;
            
            

            .Days{
                margin-top:5px;
                margin-bottom:5px;
            }
            .Day_Icons{
                color:gray;
                margin-top:5px;
                margin-bottom:5px;
                font-size:1.2em;
            }
            .Select_Count{
                margin:0 auto;
                border:2px solid gray;
                border-radius:50%;
                width:40px;
                height:40px;
                line-height:35px;
                .Select_Number{
                    font-size:1.3em;
                    font-weight:bolder;
                    
                }
            }
        }
    }
    
`

const WeekFoodCount = () => {
    const LoginInfo = useSelector(state => state.LoginInfoDataRedux.Infomation);
    const [Now_Date, setNowDate] = useState(moment().format("YYYY-MM-DD"));
    const [Weeks_Data, setWeeks_Data] = useState([
    ])

    const handlePreDate = () => {
        setNowDate(moment(Now_Date).subtract(7, 'days').format("YYYY-MM-DD"));
    }
    const handleNextDate = () => {
        setNowDate(moment(Now_Date).add(7, 'days').format("YYYY-MM-DD"));
    }



    const HandSaveCount = async () => {
        try {
            
            const Handle_Save_Food_Count_Axios = await request.post(`/FoodApp/Handle_Save_Food_Count`, {
                Now_Date,
                Weeks_Data,
                id:LoginInfo.Login_id
            })
            if (Handle_Save_Food_Count_Axios.data.dataSuccess) {
                 toast.show({
                    title: `데이터 저장 성공`,
                    successCheck: true,
                    duration: 6000,
                });
            }

        } catch (error) {
            console.log(error);
        }
    }


    const Getting_Food_Count_Data = async () => {
        try {
            
            const Getting_Food_Count_Data_Axios = await request.get('/FoodApp/Getting_Food_Count_Data', {
                params: {
                    Now_Date,
                    id:LoginInfo.Login_id
                }
            })

            if (Getting_Food_Count_Data_Axios.data.dataSuccess) {

                setWeeks_Data(Getting_Food_Count_Data_Axios.data.Weeks_Data);
                 
            } else {
                toast.show({
                    title: `서버와의 오류 발생`,
                    successCheck: false,
                    duration: 6000,
                });
                }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        Getting_Food_Count_Data()
    },[Now_Date])

    return (
        <WeekFoodCountMainDivBox>
            <h4>식수 신청</h4>
            <div className="WeekFoodCount_Container">
                <div className="Arrow_Left" onClick={()=>handlePreDate()}>
                        <IoIosArrowBack></IoIosArrowBack>
                </div>
                {Weeks_Data.map((list) => {
                    return    <div className="Day_Container" style={list.Date_Checking?{opacity:0.5}:{}} key={list.date}>
                        <div>{ list.date}</div>
                        <div className="Days">{ list.week}</div>
                    <div className="Select_Count">
                            <div className="Select_Number">{ list.count}</div>
                    </div>
                        <div className="Day_Icons" onClick={() => {
                            if (list.Date_Checking) {
                                
                            } else {
                                setWeeks_Data(Weeks_Data.map((item)=>item.date === list.date ? {...item,count:item.count+1}:item ))
                            }
                    }}><FaPlus></FaPlus></div>
                        <div className="Day_Icons" onClick={() => {
                            if (list.Date_Checking) {
                            
                            } else {
                                setWeeks_Data(Weeks_Data.map((item) => item.date === list.date ? { ...item, count: item.count - 1 >= 0 ? item.count - 1 : 0 } : item))
                            }
                        }}><FaMinus></FaMinus></div>
                </div>
                })}
               
               
                 <div className="Arrow_Right" onClick={()=>handleNextDate()}>
                        <IoIosArrowForward></IoIosArrowForward>
                </div>
            </div>
            <div style={{lineHeight:"30px"}}>
                <div> 0 : 본인 식사 X</div>
                <div> 1 : 본인 식사 O</div>
                <div> 2+ : 본인 식사 O + 외부인식사(수량) </div>
                
            </div>
            <div style={{textAlign:"end"}}>
                <button onClick={() => HandSaveCount()} style={{ width: "80px", height: "50px",border:"none",borderRadius:"10px",background:"#3ca9e2",color:"white",fontSize:"1.2em" }}>저 장</button>
            </div>
        </WeekFoodCountMainDivBox>
    )
}

export default WeekFoodCount;