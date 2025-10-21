import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
const KizukiListContentMainDivBox = styled.div`
    border: 1.5px solid lightgray;
    background-color: #efefef;
    border-radius: 5px;
    padding: 10px;
    height: 100px;
    margin-bottom: 20px;
    color: black;
`;

const KizukiListContent = ({ item }) => {
    return (
        <KizukiListContentMainDivBox>
            <div>
                <h3 style={{ margin: '0px' }}>{item.kizuki_notepad_kizuki_list_title}</h3>
                <div>
                    <span>제 안 자 : {item.idea_name}</span>
                    <span style={{ marginRight: '10px', marginLeft: '10px' }}></span>
                    <span>작 성 자 : {item.name}</span>
                </div>

                <div style={{ color: 'gray', marginTop: '5px' }}>
                    작 성 일 : {moment(item.kizuki_notepad_kizuki_list_create_date).format('YYYY-MM-DD HH:mm')}
                </div>
            </div>
        </KizukiListContentMainDivBox>
    );
};

export default KizukiListContent;
