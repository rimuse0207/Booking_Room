import React, { useEffect, useRef } from 'react';
import HourShowTable from '../../RoomTables/ContentHeaderTable/HourShowTable';
import LeftHeaderShowTable from '../../RoomTables/ContentHeaderTable/LeftHeaderShowTable';
import MinuteShowTable from '../../RoomTables/ContentHeaderTable/MinuteShowTable';
import ApplyFloorRoomTable from './ApplyFloorRoomTable';

const ApplyModalTable = ({ SelectLeftHeaderInfo, SelectRoom_Info_Data, SelectedShowTableTimes, setApplyModalData, ApplyModalData }) => {
    const scrollViewSetting = useRef(null);

    useEffect(() => {
        if (scrollViewSetting.current) scrollViewSetting.current.scrollLeft = 561.6;
    }, [SelectLeftHeaderInfo]);

    return (
        <div className="Modal_Apply_Mian_Table_Container">
            <div className="Modal_Apply_Room_title_container">
                <div className="Modal_Apply_Room_title_container">
                    <div className="Modal_Apply_Main_Room_Time_title"></div>
                    {SelectLeftHeaderInfo ? <LeftHeaderShowTable InfoDatas={SelectLeftHeaderInfo}></LeftHeaderShowTable> : <></>}
                </div>
            </div>

            <div className="Modal_Apply_Room_Content_container" ref={scrollViewSetting}>
                <div className="Modal_Apply_Main_Room_Time_title_Main_Container">
                    <HourShowTable></HourShowTable>
                    <MinuteShowTable></MinuteShowTable>
                </div>
                <div className="Modal_Apply_Main_TimeLine_Table_Contents">
                    <ApplyFloorRoomTable
                        Room_Datas={SelectRoom_Info_Data}
                        SelectedShowTableTimes={SelectedShowTableTimes}
                        setApplyModalData={data => setApplyModalData(data)}
                        ApplyModalData={ApplyModalData}
                    ></ApplyFloorRoomTable>
                </div>
            </div>
        </div>
    );
};

export default ApplyModalTable;
