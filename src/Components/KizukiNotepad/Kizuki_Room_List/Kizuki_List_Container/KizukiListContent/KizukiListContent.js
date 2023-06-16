import React from "react";
import styled from "styled-components";

const KizukiListContentMainDivBox = styled.div`
    border:1.5px solid lightgray;
    background-color:#efefef;
    border-radius:5px;
    padding:10px;
    height:100px;
    margin-bottom:20px;
    color:black;
`


const KizukiListContent = ({ item }) => {
    

    return (
        <KizukiListContentMainDivBox>
            <div>
                { item.kizuki_notepad_kizuki_list_title}
            </div>
        </KizukiListContentMainDivBox>
    )
}

export default KizukiListContent