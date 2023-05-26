import React from 'react';
import styled from 'styled-components';
import ListContainer from './Team_List_Container/TeamListContainer';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { request } from '../../../API';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const TeamRoomListMainPageMainDivBox = styled.div`
    padding:10px;
`

const TeamRoomListMainPage = () => {
    const LoginInfo = useSelector(state => state.LoginInfoDataRedux.Infomation);
    const [Team_List,setTeam_List] = useState([])

    const Access_Team_List_Getting = async () => {
        try {
            
            const Access_Team_List_Getting_Axios = await request.get(`/LocalPim/Access_Team_List_Getting`, {
                params: {
                    id:LoginInfo.Login_id
                }
            });
            if (Access_Team_List_Getting_Axios.data.dataSuccess) {
                setTeam_List(Access_Team_List_Getting_Axios.data.Access_Team_List_Getting_Rows)
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        Access_Team_List_Getting();
    },[])

    return (
        <TeamRoomListMainPageMainDivBox>
            <h2>PIM팀 선택</h2>
            {Team_List.map((list) => {
                return <Link to='/KIZUKI_Notepad/Closer' key={list.kizuki_notepad_team_info_key}>
                <ListContainer data={list}></ListContainer>
            </Link>
            })}
            
        </TeamRoomListMainPageMainDivBox>
    )
}

export default TeamRoomListMainPage;