import React, { useState, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/ko';

export const InfoBoxMainPageMainDivBox = styled.div`
    border: 1px solid gray;
    border-top: 2px solid gray;
    padding: 20px;
    line-height: 30px;
    border-radius: 10px;
    margin-bottom: 50px;
    background-color: #fff;
    h3 {
        margin-top: 5px;
    }
    .Box_Container {
        padding-left: 40px;
        h4 {
            margin-bottom: 0px;
        }
        .Input_Container {
            padding-left: 40px;
            input {
                border: 2px solid #ccc;
                padding-left: 15px;
                max-width: 80%;
                width: 100%;
                height: 40px;
                border-radius: 5px;
                outline: none;
                background-color: #f2f2f2;
                :focus {
                    border-color: #007bff;
                    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
                }
            }
            textarea {
                background-color: #f2f2f2;
                border: 2px solid #ccc;
                padding: 10px;
                border-radius: 5px;
                scrollbar-width: thin;
                scrollbar-color: #ccc #f2f2f2;
                width: 100%;
                max-width: 80%;
                min-height: 80px;
                height: auto;
                resize: vertical;
                line-height: 2;
                :focus {
                    border-color: #007bff;
                    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
                }
            }
        }
    }
`;

const InfoBoxMainPage = () => {
    return (
        <InfoBoxMainPageMainDivBox>
            <h3>1. 당직 일자 및 당직자</h3>
            <div className="Box_Container">
                <div>
                    <h4>당직 일자 </h4>
                    <div className="Input_Container">
                        <input value={moment().locale('ko').format('YYYY년 MM월 DD일 (dddd)')}></input>
                    </div>
                </div>
                <div>
                    <h4>당직자 </h4>
                    <div className="Input_Container">
                        <input value={moment().format('YYYY년 MM월 DD일 (e요일)')}></input>
                    </div>
                </div>
            </div>
        </InfoBoxMainPageMainDivBox>
    );
};

export default InfoBoxMainPage;
