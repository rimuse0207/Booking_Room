import React from "react";
import styled from "styled-components";
import NavigationMainPage from "../../../Navigation/NavigationMainPage";
import { useState } from "react";
import moment from "moment";
import { request } from "../../../../API";
import { useEffect } from "react";

const SelectWeekFoodCountMainDivBox = styled.div`
    border:1px solid black;
    table{
        width:100%;
        text-align:center;
    }
`

const SelectWeekFoodCount = () => {
    const [NowDate, setNowDate] = useState(moment().add(4,'days').format("YYYY-MM-DD"));

    const [Basic_All_Count, setBasic_All_Count] = useState([]);
    const [Basic_Change_Count, setBasic_Change_Count] = useState([]);
    const [Basic_Not_Eating_Count, setBasic_Not_Eating_Count] = useState([]);

    const [Now_Basic_Want_Eating_Count, setNow_Basic_Want_Eating_Count] = useState([]);

    const Getting_Food_Count_Admin_Select = async () => {
        try {

            const Getting_Food_Count_Admin_Select_Aixos = await request.get('/FoodApp/Getting_Food_Count_Admin_Select', {
                params: {
                    NowDate
                }
            })

            if (Getting_Food_Count_Admin_Select_Aixos.data.dataSuccess) {
                
                setBasic_All_Count(Getting_Food_Count_Admin_Select_Aixos.data.Getting_Food_Count_Admin_Select_ALL_Rows);
                setBasic_Change_Count(Getting_Food_Count_Admin_Select_Aixos.data.Getting_Default_Change_User_Rows);
                setBasic_Not_Eating_Count(Getting_Food_Count_Admin_Select_Aixos.data.Getting_Default_Change_User_Not_Eating_Rows);


                setNow_Basic_Want_Eating_Count(Getting_Food_Count_Admin_Select_Aixos.data.Getting_Want_Eating_Not_Default_User_Rows);
                
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        Getting_Food_Count_Admin_Select();
    },[])

    return (
        <SelectWeekFoodCountMainDivBox>
            <NavigationMainPage TitleName="식수현황 조회"></NavigationMainPage>
            <div>
                <div style={{textAlign:"center"}}>
                    <h2>{moment(NowDate).locale("ko").format("YYYY-MM-DD")}</h2>
                    <h2>{moment(NowDate).locale("ko").format("dddd")}</h2>
                </div>
                <div>
                    <div style={{ marginBottom: "50px", lineHeight: "30px" }}>
                        <div>
                            <span>통상 식수 : </span>
                            <span>{ Basic_All_Count.length} 명</span>
                        </div>
                        <div>
                            <span>추가 식수 (+) : </span>
                            <span>{ Now_Basic_Want_Eating_Count.reduce((pre,next)=>pre+next.food_count_apply_eat_count,0) + Basic_Change_Count.reduce((pre,next)=>pre+next.food_count_apply_eat_count,0) - Basic_Change_Count.length} 명</span>
                        </div>
                        <div>
                            <span>휴가자외 (-) : </span>
                            <span>{ Basic_Not_Eating_Count.length} 명</span>
                        </div>

                        <div style={{border:"1px solid gray"}}>

                        </div>
                        
                        <div style={{fontWeight:"bolder"}}>
                            <span>예상 식수 : </span>
                            <span>{ Basic_All_Count.length +Now_Basic_Want_Eating_Count.reduce((pre,next)=>pre+next.food_count_apply_eat_count,0) + Basic_Change_Count.reduce((pre,next)=>pre+next.food_count_apply_eat_count,0) - Basic_Change_Count.length  } 명 </span>
                        </div>
                        
                    
                        
                    </div>
                </div>

                <div>
                    <div>
                        <div>
                            
                        </div>
                        <div>
                            <div style={{borderTop:"1px solid gray",borderBottom:"1px solid gray"}}>
                                <h5>직원 추가자 List</h5>
                                <table style={{marginBottom:"20px"}}>
                                    <tbody>
                                        <tr>
                                            <td>No.</td>
                                            <td>등록자</td>
                                            <td>추가 인원</td>
                                        </tr>
                                    {Now_Basic_Want_Eating_Count.map((list,i) => {
                                            return <tr>
                                                <td>{i + 1}</td>
                                                <td>{list.food_count_apply_eat_id}</td>
                                                <td>{list.food_count_apply_eat_count } 명</td>
                                            </tr>
                                        })}
                                    
                                    </tbody>

                                </table>
                            </div>
                            <div style={{borderTop:"1px solid gray",borderBottom:"1px solid gray"}}>
                                <h5>외부 손님 추가자 List</h5>
                                <table style={{marginBottom:"20px"}}>
                                    <tbody>
                                        <tr>
                                            <td>No.</td>
                                            <td>등록자</td>
                                            <td>추가 인원</td>
                                        </tr>
                                        {Basic_Change_Count.map((list,i) => {
                                            return <tr>
                                                <td>{i + 1}</td>
                                                <td>{list.food_count_apply_eat_id}</td>
                                                <td>{list.food_count_apply_eat_count - 1} 명</td>
                                            </tr>
                                        })}
                                    </tbody>

                                </table>
                            </div>
                            <div style={{borderTop:"1px solid gray",borderBottom:"1px solid gray"}}>
                                <h5>식사 X List</h5>
                                 <table style={{marginBottom:"20px"}}>
                                  
                                    <tbody>
                                        <tr>
                                            <td>No.</td>
                                            <td>등록자</td>
                                            {/* <td>변경자</td> */}
                                            
                                        </tr>
                                      {Basic_Not_Eating_Count.map((list, i) => {
                                        return <tr>
                                            <td>{i + 1}</td>
                                            <td>{list.food_count_apply_eat_id}</td>
                                            {/* <td>{list.food_count_apply_eat_count} 명</td> */}
                                            
                                          </tr>
                                        })}
                                    </tbody>
                                </table>
                               
                            </div>                            
                        </div>
                    </div>
                   
                </div>
            </div>

        </SelectWeekFoodCountMainDivBox>
    )
}

export default SelectWeekFoodCount;