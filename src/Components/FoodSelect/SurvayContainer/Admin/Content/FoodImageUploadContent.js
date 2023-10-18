import React from 'react';
import { Axios_Get_Moduls } from '../../../../../API';
import { useEffect } from 'react';
import { useState } from 'react';
import moment from 'moment';
import { FoodWeekSurvayContentTableMainDivBox } from './FoodWeekSurvayContent';

const FoodImageUploadContent = ({ NowDates }) => {
    const [Food_Image_Table_Data, setFood_Image_Table_Data] = useState([]);

    const Food_Image_Upload_Getting_Func = async () => {
        try {
            const Food_Image_Upload_Getting_Func_Axios = await Axios_Get_Moduls('/FoodApp/Food_Image_Upload_Getting_Func', { NowDates });
            console.log(Food_Image_Upload_Getting_Func_Axios);
            if (Food_Image_Upload_Getting_Func_Axios) {
                setFood_Image_Table_Data(Food_Image_Upload_Getting_Func_Axios);
            } else {
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        Food_Image_Upload_Getting_Func();
    }, [NowDates]);

    return (
        <FoodWeekSurvayContentTableMainDivBox>
            <div>
                <table className="member">
                    <thead>
                        <tr style={{ background: 'gray' }}>
                            <th>날짜</th>
                            <th>이름</th>

                            <th>회사</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Food_Image_Table_Data.map(list => {
                            return (
                                <tr key={list.food_image_info_indexs}>
                                    <td>{moment(list.food_image_info_applydate).format('YYYY-MM-DD')}</td>
                                    <td>{list.brity_works_user_info_name}</td>
                                    <td>{list.brity_works_user_info_company}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </FoodWeekSurvayContentTableMainDivBox>
    );
};

export default FoodImageUploadContent;
