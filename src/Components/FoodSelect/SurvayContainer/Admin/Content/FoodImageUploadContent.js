import React from 'react';
import { Axios_Get_Moduls } from '../../../../../API';
import { useEffect } from 'react';
import { useState } from 'react';
import moment from 'moment';
import { FoodWeekSurvayContentTableMainDivBox } from './FoodWeekSurvayContent';

const FoodImageUploadContent = ({ NowDates }) => {
    return (
        <FoodWeekSurvayContentTableMainDivBox>
            <div>
                <table className="member">
                    <thead>
                        <tr style={{ background: 'gray' }}>
                            <th>
                                ---------------------------------------------
                                <br>안녕하세요 임직원여러분 그 동안 잔반줄이기 이벤트를</br>
                                <br>참여해주셔서 대단히 감사드립니다. </br>
                                <br>여러분들의 적극적인 참여로 그 목적에 맞게 이벤트가 진행될 수 있었습니다.</br>
                                <br>6월부터는 이 이벤트를 잠시 쉬어가며, 또 다른 이벤트로 찾아뵙겠습니다. 감사합니다. </br>
                                --------------------------------------------
                            </th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </FoodWeekSurvayContentTableMainDivBox>
    );
};

export default FoodImageUploadContent;
