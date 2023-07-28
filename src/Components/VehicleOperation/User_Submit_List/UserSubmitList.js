import React from "react";
import styled from "styled-components";
import HeaderShow from "./HeaderShow/HeaderShow";
import BodyShow from "./BodyShow/BodyShow";
import CarSelector from "./CarSelector/CarSelector";

const UserSubmitListMainDivBox = styled.div`
`

const UserSubmitList = () => {
    return (
        <UserSubmitListMainDivBox>
            <CarSelector></CarSelector>
            <HeaderShow></HeaderShow>
            <BodyShow></BodyShow>
        </UserSubmitListMainDivBox>
    )
}

export default UserSubmitList;