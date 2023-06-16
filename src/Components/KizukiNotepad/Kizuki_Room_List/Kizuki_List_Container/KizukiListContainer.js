import React from "react";
import styled from "styled-components";
import KizukiListContent from "./KizukiListContent/KizukiListContent";
import { Link } from "react-router-dom";
import { request } from "../../../../API";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import KizukiList from "./KizukiLst";

const KizukiListContainerMainDivBox = styled.div`
    padding:10px;
    .Kizuki_List_Container{
        border:1px dashed black;
        padding:10px;
    }
   
`

const KizukiListContainer = ({Kizuki_Division_State}) => {
    
    const { team_code } = useParams();
    
    const [Kizuki_List_State, setKizuki_List_State] = useState([]);


    const Kizuki_list_Getting = async () => {
        const Kizuki_list_Getting_Axios = await request.get(`/LocalPim/Kizuki_list_Getting`, {
            params: {
               team_code
           }
        })
        console.log(Kizuki_list_Getting_Axios)
        if (Kizuki_list_Getting_Axios.data.dataSuccess) {
            setKizuki_List_State(Kizuki_list_Getting_Axios.data.Kizuki_list_Getting_Rows);
        }
    }

    useEffect(() => {
        if(team_code) Kizuki_list_Getting(); 
    },[team_code])

    return (
        <KizukiListContainerMainDivBox>
            <div><input type="text" placeholder="Search..."></input></div>
          
            
            <KizukiList Kizuki_Division_State={Kizuki_Division_State} Kizuki_List_State={Kizuki_List_State}></KizukiList>
          
        </KizukiListContainerMainDivBox>
    )
}

export default KizukiListContainer;