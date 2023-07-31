import React from "react";
import styled from "styled-components";
import HeaderShow from "./HeaderShow/HeaderShow";
import BodyShow from "./BodyShow/BodyShow";
import CarSelector from "./CarSelector/CarSelector";
import { ChildButton, FloatingMenu, MainButton } from "react-floating-button-menu";
import { TiThMenu } from 'react-icons/ti';
import { IoCloseSharp } from "react-icons/io5";
import { RiPlayListAddLine } from "react-icons/ri";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const UserSubmitListMainDivBox = styled.div`
.FloatingMenu_Container{
    position:fixed;
    bottom:50px;
    right:20px;
}
`

const UserSubmitList = () => {
    const history = useHistory();
    const [FloatingMenuOnCheck, setFloatingMenuOnCheck] = useState(true);
    return (
        <UserSubmitListMainDivBox>
            <CarSelector></CarSelector>
            <HeaderShow></HeaderShow>
            <BodyShow></BodyShow>
             {/* 플로팅 메뉴바 컴포넌트 */}
            <div className="FloatingMenu_Container">
                <FloatingMenu slideSpeed={500} direction="up" spacing={8} isOpen={FloatingMenuOnCheck}>
                    <MainButton
                        iconResting={<TiThMenu style={{ fontSize: 20 }} nativecolor="white" />}
                        iconActive={<IoCloseSharp style={{ fontSize: 20 }} nativecolor="white" color="black" />}
                        // backgroundColor="black"
                        onClick={() => setFloatingMenuOnCheck(!FloatingMenuOnCheck)}
                        size={56}
                    ></MainButton>
                    <ChildButton
                        icon={<RiPlayListAddLine style={{ fontSize: 20 }} nativecolor="black" />}
                        // backgroundColor="white"
                        size={40}
                        onClick={() => history.push('/VehicleOperaion/NewVehicleOperation/Cars')}
                    />
                </FloatingMenu>
            </div>
        </UserSubmitListMainDivBox>
    )
}

export default UserSubmitList;