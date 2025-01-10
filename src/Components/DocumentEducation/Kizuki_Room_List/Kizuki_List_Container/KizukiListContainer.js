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

    .Search_Container{
        input{
            width:100%;
            border:1px solid gray;
            height:50px;
            border-radius:10px;
            padding-left:20px;
            font-size:1.2em;
        }
    }
   
`

const KizukiListContainer = ({Kizuki_Division_State,Kizuki_List_State,Search_kizuki,setSearch_kizuki,Handle_Submit_For_Search}) => {
    
    

    return (
        <KizukiListContainerMainDivBox>
            <div className="Search_Container">
                <form onSubmit={(e)=>Handle_Submit_For_Search(e)}>
                    <input type="text" placeholder="Search..." value={Search_kizuki} onChange={(e) => setSearch_kizuki(e.target.value)}></input>
                </form>
            </div>
          
            
            <KizukiList Kizuki_Division_State={Kizuki_Division_State} Kizuki_List_State={Kizuki_List_State} Search_kizuki={Search_kizuki}></KizukiList>
          
        </KizukiListContainerMainDivBox>
    )
}

export default KizukiListContainer;