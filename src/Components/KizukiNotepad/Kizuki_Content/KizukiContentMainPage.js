import React from 'react';
import styled from 'styled-components';
import NavigationMainPage from '../../Navigation/NavigationMainPage';
import ContentContainer from './Content_Container/ContentContainer';
import { BsArrow90DegUp } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";
import { useHistory } from 'react-router-dom';



const KizukiListMainPageMainDivBox = styled.div`
    
    .List_Container{
        padding:20px;
    }
    .Content_Container{
        position:relative;
        
        .Arrow_Icons_Cotainer{
            position:absolute;
            left:10px;
            bottom:-30px;
            font-size:1.5em;
            color:gray;
        }
    }

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
`

const KizukiContentMainPage = () => {
    const history = useHistory();
    const dada = [1,2,3,4];
    return (
        <KizukiListMainPageMainDivBox>
            <NavigationMainPage TitleName="KIZUKI 노트"></NavigationMainPage>
             <div className="List_Move_Container">
                <h2 className="List_Move" onClick={() => history.push('/KIZUKI_Notepad/Closer')}>
                    <FaArrowLeft></FaArrowLeft>
                </h2>
                <h2>Closer 팀</h2>
            </div>
            <div className="List_Container">
                <div>
                    <h3>제목이 들어갑니다...</h3>
                    <button>발표</button>
                    <button>폐기</button>
                </div>
                {dada.map((list,j) => {
                    return <div className="Content_Container" style={{width:`calc(100% - ${j*35}px)`,marginLeft:`${j * 35 }px`,marginTop:`${j * 3}px`}}>
                    <ContentContainer></ContentContainer>
                        { j === dada.length -1 ?<div></div>:<div className="Arrow_Icons_Cotainer">
                        <BsArrow90DegUp></BsArrow90DegUp>
                    </div> }
                </div>
                })}
                
               
            </div>
        </KizukiListMainPageMainDivBox>
    )
}

export default KizukiContentMainPage