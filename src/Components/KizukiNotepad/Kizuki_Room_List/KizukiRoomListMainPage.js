import React from 'react';
import styled from 'styled-components';
import NavigationMainPage from '../../Navigation/NavigationMainPage';
import KizukiListContainer from './Kizuki_List_Container/KizukiListContainer';
import { FaArrowLeft } from 'react-icons/fa';
import { useHistory, useParams } from 'react-router-dom';
import { Axios_Get_Moduls, request } from '../../../API';
import { useEffect } from 'react';
import { useState } from 'react';
import { FloatingMenu, MainButton, ChildButton } from 'react-floating-button-menu';
import { TiThMenu } from 'react-icons/ti';
import { IoCloseSharp } from 'react-icons/io5';
import { HiViewGridAdd } from 'react-icons/hi';
import Modal from 'react-modal';
import KizukiWriteMainPage from '../Kizuki_Write/KizukiWriteMainPage';
import { toast } from '../../ToasMessage/ToastManager';
const KizukiRoomListMainPageMainDivBox = styled.div`
    .List_Move_Container {
        display: flex;

        .List_Move {
            margin-left: 20px;
            min-width: 50px;
            :hover {
                cursor: pointer;
                color: lightgray;
            }
        }
    }

    .FloatingMenu_Container {
        position: fixed;
        bottom: 50px;
        right: 50px;
        a,
        li {
            background-color: #fff;
        }
    }
`;
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        height: '90%',
    },
};
Modal.setAppElement('#SelectModal');
const KizukiRoomListMainPage = () => {
    const { team_code } = useParams();
    const history = useHistory();
    const [Kizuki_Division_State, setKizuki_Division_State] = useState([]);
    const [Kizuki_List_State, setKizuki_List_State] = useState([]);
    const [FloatingMenuOnCheck, setFloatingMenuOnCheck] = useState(true);
    const [AddDataModalIsOpen, setAddDataModalIsOpen] = useState(false);
    const [Search_kizuki, setSearch_kizuki] = useState('');

    const OnClose = () => {
        setAddDataModalIsOpen(false);
        Kizuki_Division_Data_Getting();
        Kizuki_list_Getting();
    };

    useEffect(() => {
        if (AddDataModalIsOpen) {
            document.body.style.overflow = 'hidden'; // 스크롤 방지
        } else {
            document.body.style.overflow = ''; // 스크롤 방지 스타일 제거
        }
    }, [AddDataModalIsOpen]);

    const Handle_Submit_For_Search = e => {
        e.preventDefault();
        Kizuki_list_Getting();
    };

    const Kizuki_list_Getting = async () => {
        const Kizuki_list_Getting_Axios = await Axios_Get_Moduls('/LocalPim/Kizuki_list_Getting', {
            team_code,
            Search_kizuki,
        });

        if (Kizuki_list_Getting_Axios) {
            setKizuki_List_State(Kizuki_list_Getting_Axios);
        } else {
            toast.show({
                title: `IT팀에 문의바랍니다.`,
                successCheck: false,
                duration: 6000,
            });
        }
    };

    const Kizuki_Division_Data_Getting = async () => {
        const Kizuki_Division_Data_Getting_Axios = await Axios_Get_Moduls('/LocalPim/Kizuki_Division_Data_Getting', {
            team_code,
        });

        if (Kizuki_Division_Data_Getting_Axios) {
            setKizuki_Division_State(Kizuki_Division_Data_Getting_Axios);
        } else {
            toast.show({
                title: `IT팀에 문의바랍니다.`,
                successCheck: false,
                duration: 6000,
            });
        }
    };

    useEffect(() => {
        if (team_code) {
            Kizuki_Division_Data_Getting();
            Kizuki_list_Getting();
        }
    }, [team_code]);
    return (
        <KizukiRoomListMainPageMainDivBox>
            <NavigationMainPage TitleName="KIZUKI 노트"></NavigationMainPage>
            <div className="List_Move_Container">
                <h2 className="List_Move" onClick={() => history.push('/KIZUKI_Notepad')}>
                    <FaArrowLeft></FaArrowLeft>
                </h2>
                <h2>팀 조회</h2>
            </div>
            <KizukiListContainer
                Kizuki_Division_State={Kizuki_Division_State}
                Kizuki_List_State={Kizuki_List_State}
                Search_kizuki={Search_kizuki}
                setSearch_kizuki={data => setSearch_kizuki(data)}
                Handle_Submit_For_Search={e => Handle_Submit_For_Search(e)}
            ></KizukiListContainer>

            <div className="FloatingMenu_Container">
                <FloatingMenu slideSpeed={500} direction="up" spacing={8} isOpen={FloatingMenuOnCheck}>
                    <MainButton
                        iconResting={<TiThMenu style={{ fontSize: 20, backgroundColor: 'white' }} nativeColor="white" />}
                        iconActive={<IoCloseSharp style={{ fontSize: 20, backgroundColor: 'white' }} nativeColor="white" color="black" />}
                        backgroundColor="black"
                        onClick={() => setFloatingMenuOnCheck(!FloatingMenuOnCheck)}
                        size={56}
                    ></MainButton>
                    <ChildButton
                        icon={<HiViewGridAdd style={{ fontSize: 20, backgroundColor: 'white' }} nativeColor="black" />}
                        backgroundColor="white"
                        size={40}
                        onClick={() => setAddDataModalIsOpen(true)}
                    />
                </FloatingMenu>
            </div>

            <div style={{ marginBottom: '50px', marginTop: '50px' }}></div>
            <div></div>

            <Modal isOpen={AddDataModalIsOpen} style={customStyles} contentLabel="Select Modal">
                <KizukiWriteMainPage OnClose={() => OnClose()} team_code={team_code}></KizukiWriteMainPage>
            </Modal>
        </KizukiRoomListMainPageMainDivBox>
    );
};

export default KizukiRoomListMainPage;
