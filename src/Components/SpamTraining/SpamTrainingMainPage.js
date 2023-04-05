import React from "react";
import styled from "styled-components";
import SpamTrainingContainer from "./SpamTrainingContainer/SpamTrainingContainer";

const SpamTrainingMainPageMainDivBox = styled.div`
    min-height:100vh;
`

const SpamTrainingMainPage = () => {
    return (
        <SpamTrainingMainPageMainDivBox>
            <SpamTrainingContainer></SpamTrainingContainer>
        </SpamTrainingMainPageMainDivBox>
    )
}

export default SpamTrainingMainPage;