import React from "react";
import styled from "styled-components";
import KizukiListContent from "./KizukiListContent/KizukiListContent";
import { Link } from "react-router-dom";

const KizukiListContainerMainDivBox = styled.div`
    padding:10px;
    .Kizuki_List_Container{
        border:1px dashed black;
        padding:10px;
    }
   
`

const KizukiListContainer = () => {
    return (
        <KizukiListContainerMainDivBox>
            <div><input type="text" placeholder="Search..."></input></div>
            <div >
                <fieldset className="Kizuki_List_Container">
                    <legend>
                        <h2>미발표</h2>
                    </legend>
                    <div>
                    <div>
                        <Link to='/KIZUKI_Notepad/Closer/ad'>
                            <KizukiListContent></KizukiListContent>
                        </Link>
                            <KizukiListContent></KizukiListContent>
                            <KizukiListContent></KizukiListContent>
                        </div>
                            <div style={{textAlign:'end'}}>
                                    ...더보기
                            </div>
                        </div>
                        
                </fieldset>
                 <fieldset className="Kizuki_List_Container">
                    <legend>
                        <h2>발표 완료</h2>
                    </legend>
                    <div>
                    <div>
                        <Link to='/KIZUKI_Notepad/Closer/ad'>
                            <KizukiListContent></KizukiListContent>
                        </Link>
                            <KizukiListContent></KizukiListContent>
                            <KizukiListContent></KizukiListContent>
                        </div>
                            <div style={{textAlign:'end'}}>
                                    ...더보기
                            </div>
                        </div>
                        
                </fieldset>
                 <fieldset className="Kizuki_List_Container">
                    <legend>
                        <h2>폐기 처리</h2>
                    </legend>
                    <div>
                    <div>
                        <Link to='/KIZUKI_Notepad/Closer/ad'>
                            <KizukiListContent></KizukiListContent>
                        </Link>
                            <KizukiListContent></KizukiListContent>
                            <KizukiListContent></KizukiListContent>
                        </div>
                            <div style={{textAlign:'end'}}>
                                    ...더보기
                            </div>
                        </div>
                        
                </fieldset>
            
            </div>
            
            
            
        </KizukiListContainerMainDivBox>
    )
}

export default KizukiListContainer;