import React from 'react';
import MeetingForm from './MeetingForm';
import styled from 'styled-components';

const MeetingRoomOfficeSuppliesDiv = styled.div`
    min-height: 100vh;
    h1 {
        margin-top: 0px;
        padding-top: 10px;
    }
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        max-width: 400px;
        margin: 0 auto;
    }
    label {
        margin-right: 10px;
    }

    select,
    textarea {
        width: 100%;
        padding: 10px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    textarea {
        height: 100px;
        resize: none;
    }

    button {
        padding: 10px 20px;
        background-color: #61dafb;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
    }

    button:hover {
        background-color: #21a1f1;
    }

    @media (max-width: 600px) {
        .App-header {
            padding: 10px;
        }

        form {
            width: 90%;
            gap: 15px;
        }

        select,
        textarea {
            padding: 8px;
            font-size: 14px;
        }

        button {
            padding: 8px 16px;
            font-size: 14px;
        }
    }
`;

function Room() {
    return (
        <MeetingRoomOfficeSuppliesDiv>
            <h1 style={{ marginTop: '0px', paddingTop: '10px' }}>회의실 요청 사항</h1>
            <MeetingForm />
        </MeetingRoomOfficeSuppliesDiv>
    );
}

export default Room;
