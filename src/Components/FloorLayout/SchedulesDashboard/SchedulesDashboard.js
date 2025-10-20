import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import NavigationMainPage from '../../Navigation/NavigationMainPage';
import FilterContainer from './FilterContainer/FilterContainer';
import ContentTable from './ContentTable/ContentTable';
import { Request_Get_Axios } from '../../../API';
import LoaderMainPage from '../../Loader/LoaderMainPage';
import moment from 'moment';

const SchedulesDashboardMainDivBox = styled.div`
    height: calc(100vh);
    overflow: auto;
    background-color: #e9ecf3;
    .Table_Ctonainers {
        width: 90%;
        background-color: #fff;
        margin: 0 auto;
    }
`;

const SchedulesDashboard = () => {
    const [Loading, setLoading] = useState(true);
    const [Selected_Date, setSelected_Date] = useState(moment().format('YYYY-MM-DD'));
    const [Selected_Lists, setSelected_Lists] = useState([
        { Type: 'place', lists: [] },
        { Type: 'department', lists: [] },
        { Type: 'team', lists: [] },
        { Type: 'division', lists: ['외근', '해외출장', '연차'] },
    ]);

    const [TableData, setTableData] = useState([]);

    const Getting_All_Pims_Data = async () => {
        setLoading(true);
        const All_Pims_Data_Axios = await Request_Get_Axios('/users/All_Pims_Data', {
            Selected_Date,
        });
        if (All_Pims_Data_Axios.status) {
            setTableData(All_Pims_Data_Axios.data);
        }
        setLoading(false);
    };

    useEffect(() => {
        Getting_All_Pims_Data();
    }, [Selected_Date]);
    return (
        <SchedulesDashboardMainDivBox>
            <NavigationMainPage TitleName="전체 일정 조회"></NavigationMainPage>
            <FilterContainer
                Selected_Lists={Selected_Lists}
                setSelected_Lists={data => setSelected_Lists(data)}
                Selected_Date={Selected_Date}
                setSelected_Date={data => setSelected_Date(data)}
            ></FilterContainer>
            <div className="Table_Ctonainers">
                <ContentTable Selected_Lists={Selected_Lists} TableData={TableData}></ContentTable>
            </div>
            <LoaderMainPage loading={Loading}></LoaderMainPage>
        </SchedulesDashboardMainDivBox>
    );
};

export default SchedulesDashboard;
