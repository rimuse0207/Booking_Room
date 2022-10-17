import React, { useEffect, useRef } from 'react';
import HourShowTable from '../../RoomTables/ContentHeaderTable/HourShowTable';
import LeftHeaderShowTable from '../../RoomTables/ContentHeaderTable/LeftHeaderShowTable';
import MinuteShowTable from '../../RoomTables/ContentHeaderTable/MinuteShowTable';
import SelectFloorRoomTable from './SelectFloorRoomTable';

const SelectModalTable = ({ RoomDatas, SelectModalData, Room_Datas, setSelectModalData }) => {
    const scrollViewSetting = useRef(null);

    useEffect(() => {
        if (scrollViewSetting.current) scrollViewSetting.current.scrollLeft = 561.6;
    }, [RoomDatas]);
    return (
        <div className="Modal_Apply_Mian_Table_Container">
            <div className="Modal_Apply_Room_title_container">
                <div className="Modal_Apply_Room_title_container">
                    <div className="Modal_Apply_Main_Room_Time_title"></div>
                    {RoomDatas ? <LeftHeaderShowTable InfoDatas={RoomDatas}></LeftHeaderShowTable> : <></>}
                </div>
            </div>
            <div className="Modal_Apply_Room_Content_container" ref={scrollViewSetting}>
                <div className="Modal_Apply_Main_Room_Time_title_Main_Container">
                    <HourShowTable></HourShowTable>
                    <MinuteShowTable></MinuteShowTable>
                </div>
                <div className="Modal_Apply_Main_TimeLine_Table_Contents">
                    <SelectFloorRoomTable
                        RoomDatas={RoomDatas}
                        SelectModalData={SelectModalData}
                        Room_Datas={Room_Datas}
                        setSelectModalData={data => setSelectModalData(data)}
                    ></SelectFloorRoomTable>
                </div>
            </div>
        </div>
    );
};

export default SelectModalTable;
