import React from "react";
import styled from "styled-components";

const ContentContainerMainDivBox = styled.div`
    border:2px solid lightgray;
    border-radius:10px;
    min-height:200px;
    padding:20px;
`
const ContentContainer = ({list}) => {
    return (
        <ContentContainerMainDivBox>
            <div dangerouslySetInnerHTML={{ __html: list.kizuki_notepad_kizuki_content_main }}></div>
            
        </ContentContainerMainDivBox>
    )
}

export default ContentContainer;