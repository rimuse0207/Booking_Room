import React from "react";
import styled from "styled-components";

const ListContainerMainDivBox = styled.div`
    border:1.5px solid lightgray;
    background-color:#efefef;
    border-radius:5px;
    padding:10px;
    height:100px;
    margin-bottom:30px;
    color:black;
    :hover{
        opacity:0.7;
    }
`

const TeamListContainer = ({data}) => {
    return (
        <ListContainerMainDivBox>
            <h2>{data.kizuki_notepad_team_info_team_name} 팀</h2>
        </ListContainerMainDivBox>
    )
}

export default TeamListContainer