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


const KizukiListContent = () => {
    return (
        <KizukiListContentMainDivBox>
            Kizuki 1
        </KizukiListContentMainDivBox>
    )
}

export default KizukiListContent