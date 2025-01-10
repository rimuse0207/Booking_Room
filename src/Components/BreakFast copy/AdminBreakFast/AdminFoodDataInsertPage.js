import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { request } from '../../../API';
import { useHistory } from 'react-router-dom';

const AdminFoodDataInsertPageMainDivBox = styled.div`
    .textarea-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .styled-textarea {
        width: 90%;
        height: 150px;
        padding: 10px;
        font-size: 0.8em;
        border: 2px solid #ccc;
        border-radius: 8px;
        outline: none;
        transition: border-color 0.2s;
    }

    .styled-textarea:focus {
        border-color: #007bff;
    }
    .button_Container {
        text-align: center;
        margin-top: 40px;
        margin-bottom: 40px;
        button {
            background-color: #368;
            width: 300px;
            height: 50px;
            border-radius: 10px;
            color: #fff;
            font-size: 1.1em;
            border: none;
            :hover {
                cursor: pointer;
                background-color: #efefef;
                color: #368;
            }
        }
    }
`;

const AdminFoodDataInsertPage = () => {
    const history = useHistory();
    const [FoodTextArea, setFoodTextArea] = useState('');
    const handleClicksFoodData = async () => {
        if (!FoodTextArea) {
            alert('데이터를 입력 해 주세요.');
            return;
        }

        const handleClicksFoodData_Axios = await request.post('/FoodApp/handleClicksFoodData', {
            FoodTextArea,
        });
        if (handleClicksFoodData_Axios.data.dataSuccess) {
            history.push('/Today_Food');
        }
    };

    return (
        <AdminFoodDataInsertPageMainDivBox>
            <h4 style={{ marginLeft: '20px' }}>저장 하실 식단표 데이터를 넣어주세요.</h4>
            <div className="textarea-container">
                <textarea
                    className="styled-textarea"
                    placeholder="Excel에 있는 그대로 넣어주세요."
                    value={FoodTextArea}
                    onChange={e => setFoodTextArea(e.target.value)}
                />
            </div>
            <div className="button_Container">
                <button onClick={() => handleClicksFoodData()}>데이터 추가</button>
            </div>
        </AdminFoodDataInsertPageMainDivBox>
    );
};

export default AdminFoodDataInsertPage;
