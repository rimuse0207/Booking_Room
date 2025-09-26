import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Calendar from './Calendar';
import { Request_Get_Axios } from '../../../../API';
import { useSelector } from 'react-redux';

const HomeCalendarContainer = ({ year, month, setYear, setMonth, PimsLists, Getting_pims_Lists_From_Date }) => {
    const Login_Info = useSelector(state => state.LoginInfoDataRedux.Infomation);
    // const [events, setEvents] = useState(PimsLists);

    // const Change_Color_State = async () => {
    //     const Getting_PIMS_Data = await Request_Get_Axios('/Ce_Route/Tools/Getting_PIMS_Select', {
    //         id: Login_Info.id,
    //         date: `${year}-${month + 1}`,
    //     });
    //     if (Getting_PIMS_Data.status) {
    //         setEvents(Getting_PIMS_Data.data);
    //     }
    // };

    // useEffect(() => {
    //     Change_Color_State();
    // }, [year, month]);

    const handleMonthChange = offset => {
        let newMonth = month + offset;
        let newYear = year;

        if (newMonth < 0) {
            newMonth = 11;
            newYear -= 1;
        } else if (newMonth > 11) {
            newMonth = 0;
            newYear += 1;
        }

        setYear(newYear);
        setMonth(newMonth);
    };

    return (
        <Calendar
            year={year}
            month={month}
            onMonthChange={handleMonthChange}
            events={PimsLists}
            Getting_pims_Lists_From_Date={Getting_pims_Lists_From_Date}
            // Change_Color_State={() => Change_Color_State()}
        />
    );
};

export default HomeCalendarContainer;
