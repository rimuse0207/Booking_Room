import React from "react";
import styled from "styled-components";
import NavigationMainPage from "../../Navigation/NavigationMainPage";
import KizukiListContainer from "./Kizuki_List_Container/KizukiListContainer";
import { FaArrowLeft } from "react-icons/fa";
import { useHistory,useParams } from "react-router-dom";
import { request } from "../../../API";
import { useEffect } from "react";
import { useState } from "react";
import { FloatingMenu, MainButton, ChildButton } from 'react-floating-button-menu';
import { TiThMenu } from 'react-icons/ti';
import { IoCloseSharp } from 'react-icons/io5';
import { HiViewGridAdd } from "react-icons/hi";
import Modal from "react-modal";
import KizukiWriteMainPage from "../Kizuki_Write/KizukiWriteMainPage";
const KizukiRoomListMainPageMainDivBox = styled.div`
    
    .List_Move_Container{
        display:flex;
        
        .List_Move{
            margin-left:20px;
            min-width:50px;
        :hover{
            cursor: pointer;
            color:lightgray;
        }
    }    
    }
    
    .FloatingMenu_Container{
        position:fixed;
        bottom:50px;
        right:50px;
        a,li{
            background-color:#fff;
        }
    }
`
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

 const OnClose = () => {
        setAddDataModalIsOpen(false);
    };


    const Kizuki_Division_Data_Getting = async () => {
        try {
            
            const Kizuki_Division_Data_Getting_Axios = await request.get(`/LocalPim/Kizuki_Division_Data_Getting`, {
                params: {
                    team_code
                }
            });
            if (Kizuki_Division_Data_Getting_Axios.data.dataSuccess) {
                setKizuki_Division_State(Kizuki_Division_Data_Getting_Axios.data.Kizuki_Division_State)
                
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (team_code) {
            Kizuki_Division_Data_Getting()      
        }
       
    },[team_code])
    return (
        <KizukiRoomListMainPageMainDivBox>
            <NavigationMainPage TitleName="KIZUKI 노트"></NavigationMainPage>
            <div className="List_Move_Container">
                <h2 className="List_Move" onClick={() => history.push('/KIZUKI_Notepad')}>
                    <FaArrowLeft></FaArrowLeft>
                </h2>
                <h2>Closer 팀</h2>
            </div>
            <KizukiListContainer Kizuki_Division_State={Kizuki_Division_State}></KizukiListContainer>

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

            <Modal isOpen={AddDataModalIsOpen} style={customStyles} contentLabel="Select Modal">
                <KizukiWriteMainPage OnClose={()=>OnClose()}></KizukiWriteMainPage>
            </Modal>
        </KizukiRoomListMainPageMainDivBox>
    )
}

export default KizukiRoomListMainPage;