import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { toast } from '../Components/ToasMessage/ToastManager';
import { Cookies } from 'react-cookie';

export const getCookie = name => {
    const cookies = new Cookies();
    return cookies.get(name);
};

export const Axios_Get_Moduls = async (Path_URL, Params_Data) => {
    try {
        const token = localStorage.getItem('Login_token');
        const id = localStorage.getItem('Login_id');

        const Axios_Get_Moduls_Axios = await axios.get(`${process.env.REACT_APP_DB_HOST}${Path_URL}`, {
            params: Params_Data,
            headers: {
                Authorization: token,
                id: id,
            },
        });

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
export const request = axios.create({
    baseURL: process.env.REACT_APP_DB_HOST,
});

// export const Axios_Get_Moduls = async (Path_URL, Params_Data) => {
//     try {
//         const Axios_Get_Moduls_Axios = await request.get(`${Path_URL}`, {
//             params: Params_Data,
//         });
//         console.log(Axios_Get_Moduls_Axios);
//         if (Axios_Get_Moduls_Axios.data.status === 200) {
//             return Axios_Get_Moduls_Axios.data.data;
//         } else if (Axios_Get_Moduls_Axios.data.status === 401) {
//             alert('세션이 종료되었습니다. 재 로그인 바랍니다.');
//             window.location.href = '/Login_Page';
//         } else {
//             alert('Error 발생. Axios_Error_Code 1999 IT팀에 문의바랍니다.');
//             return false;
//         }
//     } catch (error) {
//         console.log(error);
//         return false;
//     }
// };
export const Axios_Post_Moduls = async (Path_URL, Post_Data) => {
    try {
        const token = localStorage.getItem('Login_token');
        const id = localStorage.getItem('Login_id');
        const Axios_Post_Moduls_Axios = await axios.post(`${process.env.REACT_APP_DB_HOST}${Path_URL}`, Post_Data, {
            headers: {
                Authorization: token,
                id: id,
            },
        });

        if (Axios_Post_Moduls_Axios.data.status === 200) {
            return Axios_Post_Moduls_Axios.data.data;
        } else if (Axios_Post_Moduls_Axios.data.status === 401) {
            alert('세션이 종료되었습니다. 재 로그인 바랍니다.');
            return (window.location.href = '/Login_Page');
        } else if (Axios_Post_Moduls_Axios.data.status === 400) {
            return Axios_Post_Moduls_Axios.data.data;
        } else {
            alert('Error 발생. Axios_Error_Code 2000 IT팀에 문의바랍니다.');
            // return false;
            throw new Error();
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};
