import React from "react";
import styled from "styled-components";

const ContentContainerMainDivBox = styled.div`
    border:2px solid lightgray;
    border-radius:10px;
    min-height:200px;
    padding:20px;
`
const ContentContainer = () => {
    return (
        <ContentContainerMainDivBox>
            <pre>
                dadadasdasdasdasdasd
                dadadasdasdasdasdasd
                dadadasdasdasdasdasd
                dadadasdasdasdasdasd
                dadadasdasdasdasdasd
            </pre>
          
        </ContentContainerMainDivBox>
    )
}

export default ContentContainer;