import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { toast } from '../Components/ToasMessage/ToastManager';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();
export const getCookie = name => {
    return cookies.get(name);
};
export const request = axios.create({
    baseURL: process.env.REACT_APP_DB_HOST,
    headers: {
        Authorization: getCookie('Login_token') ? getCookie('Login_token') : localStorage.getItem('Login_token'),
        id: localStorage.getItem('Login_id'),
    },
});

export const Axios_Get_Moduls = async (Path_URL, Params_Data) => {
    try {
        const Axios_Get_Moduls_Axios = await request.get(`${Path_URL}`, {
            params: Params_Data,
        });
        console.log(Axios_Get_Moduls_Axios);
        if (Axios_Get_Moduls_Axios.data.status === 200) {
            return Axios_Get_Moduls_Axios.data.data;
        } else if (Axios_Get_Moduls_Axios.data.status === 401) {
            alert('세션이 종료되었습니다. 재 로그인 바랍니다.');
            window.location.href = '/Login_Page';
        } else {
            alert('Error 발생. Axios_Error_Code 1999 IT팀에 문의바랍니다.');
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};
export const Axios_Post_Moduls = async (Path_URL, Post_Data) => {
    try {
        const Axios_Post_Moduls_Axios = await request.post(`${Path_URL}`, Post_Data);
        console.log(Axios_Post_Moduls_Axios);
        if (Axios_Post_Moduls_Axios.data.status === 200) {
            return Axios_Post_Moduls_Axios.data.data;
        } else if (Axios_Post_Moduls_Axios.data.status === 401) {
            alert('세션이 종료되었습니다. 재 로그인 바랍니다.');
            window.location.href = '/Login_Page';
        } else {
            alert('Error 발생. Axios_Error_Code 2000 IT팀에 문의바랍니다.');
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};
