import React from 'react';

import GuidelineList from './GuidelineList';
import styled from 'styled-components';

const CustomerSecurityMainDivBox = styled.div`
    .CustomerSecurity {
        text-align: center;
        font-family: Arial, sans-serif;
    }

    .CustomerSecurity-header {
        background-color: #282c34;
        padding: 20px;
        color: white;
    }

    .guideline-list {
        padding: 20px;
        text-align: left;
    }

    .tree-node {
        margin-bottom: 15px;
    }

    .tree-node h2 {
        cursor: pointer;
        color: #007bff;
    }

    .tree-content {
        margin-left: 20px;
    }

    .tree-content p {
        margin: 10px 0;
        white-space: pre-line; /* 이 속성을 추가합니다 */
    }

    @media (max-width: 600px) {
        .tree-node h2 {
            font-size: 1.2em;
        }

        .tree-content p {
            font-size: 0.9em;
        }
    }
`;

function CustomerSecurity() {
    return (
        <CustomerSecurityMainDivBox className="CustomerSecurity">
            <header className="CustomerSecurity-header">
                <h1>고객사별 방문 시 주의사항</h1>
            </header>
            <main>
                <GuidelineList />
            </main>
        </CustomerSecurityMainDivBox>
    );
}

export default CustomerSecurity;
