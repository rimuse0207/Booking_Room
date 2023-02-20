import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { CgCloseO } from 'react-icons/cg';
import Select from 'react-select';
import axios from 'axios';
import { request } from '../../../../../../API';

const UserSelectModalMainDivBox = styled.div`
    .Close_button_container {
        position: fixed;
        top: 10px;
        right: 10px;
        color: red;
        font-weight: bolder;
        font-size: 1.3em;
        :hover {
            cursor: pointer;
        }
    }

    .ModalSelectBox {
        margin-top: 30px;
    }
`;

const UserSelectModal = ({
    setUserSelectModalOpen,
    Room_Keys,
    SelectedTeam,
    SelectedData,
    setMatchState,
    MatchState,
    setSelectedData,
    setSelectedTeam,
}) => {
    const handleChangeRef = useRef(null);
    const [UserSelectData, setUserSelectData] = useState([]);

    const InsertSelectData = data => {
        if (!data) {
            return;
        }
        if (SelectedTeam === 'Blue') {
            const ChangeData = MatchState.map(list =>
                list.Room_Keys === SelectedData.Room_Keys
                    ? { ...list, Blue_Fighter: data.label.split('||')[0], Blue_Fighter_ID: data.value }
                    : list
            );

            setSelectedData();
            setSelectedTeam();
            setMatchState(ChangeData);
            setUserSelectModalOpen();
        } else {
            const ChangeData = MatchState.map(list =>
                list.Room_Keys === SelectedData.Room_Keys
                    ? { ...list, Red_Fighter: data.label.split('||')[0], Red_Fighter_ID: data.value }
                    : list
            );
            setSelectedData();
            setSelectedTeam();
            setMatchState(ChangeData);
            setUserSelectModalOpen();
        }
    };
    const GetSelect_Person = async () => {
        try {
            const Get_Select_Person_Data_Axios = await request.get(`/LocalPim/Pim_Preson_Keys`, {
                params: {
                    Room_Keys,
                },
            });

            if (Get_Select_Person_Data_Axios.data.dataSuccess) {
                setUserSelectData(Get_Select_Person_Data_Axios.data.Select_Data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        GetSelect_Person();
        if (handleChangeRef.current) {
            handleChangeRef.current.focus();
        }
    }, []);

    return (
        <UserSelectModalMainDivBox>
            <div className="Close_button_container" onClick={setUserSelectModalOpen}>
                <CgCloseO></CgCloseO>
            </div>
            <div>*주의사항</div>
            <div style={{ fontSize: '0.7em', paddingLeft: '10px', marginTop: '5px' }}>해당 방에 접속이 가능한 인원만 선택 가능합니다.</div>
            <div className="ModalSelectBox">
                <Select
                    ref={handleChangeRef}
                    className="basic-single"
                    classNamePrefix="이쪽에서 선택 해주세요."
                    // defaultValue={SelectLeftHeaderInfo}
                    value={null}
                    isClearable={true}
                    isSearchable={true}
                    name="Person"
                    options={UserSelectData}
                    placeholder={'인원을 선택 해주세요.'}
                    onChange={value => InsertSelectData(value)}
                />
            </div>
        </UserSelectModalMainDivBox>
    );
};

export default UserSelectModal;
