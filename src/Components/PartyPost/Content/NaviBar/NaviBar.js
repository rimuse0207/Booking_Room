import React from 'react';
import styled from 'styled-components';

const NaviBarMainDivBox = styled.div`
    padding-left: 50px;
    h2 {
        margin-top: 0px;
        padding-top: 20px;
    }
`;

const NaviBar = () => {
    return (
        <NaviBarMainDivBox>
            <h2>당직일지 작성</h2>
        </NaviBarMainDivBox>
    );
};

export default NaviBar;
