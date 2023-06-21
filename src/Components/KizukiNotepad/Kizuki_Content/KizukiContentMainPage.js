import React from 'react';
import styled from 'styled-components';
import NavigationMainPage from '../../Navigation/NavigationMainPage';
import ContentContainer from './Content_Container/ContentContainer';
import { FaArrowLeft } from "react-icons/fa";
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { request } from '../../../API';
import { useEffect } from 'react';
import { useState } from 'react';
import Modal from "react-modal";
import KizukiContentModal from './Kizuki_Cotent_Modal/KizukiContentModal';
import { toast } from '../../ToasMessage/ToastManager';
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


const KizukiListMainPageMainDivBox = styled.div`
    
    .List_Container{
        padding:20px;
    }
    .Content_Container{
        position:relative;
        

        .New_Content_Add_Container{
            position:absolute;
            right:0px;
            top:20px;
        }

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


    .Kizuki_Division_Main_Box{
        ul{
            display:flex;
            padding:0px;
            margin-left:10px;
            li{
                margin-right:10px;
                :hover{
                    cursor: pointer;
                }
            }
            .checked{
                background-color:lightgray;
                
            }
            .Kizuki_Division_Container{
                display:flex;
                align-items:center;
                border: 1px solid lightgray;
                padding: 10px;
                border-radius:10px;
                .Kizuki_Division_Text_Container{
                  font-size:1.5em;  
                  margin-left:10px;
                }
            }
        }
        
    }
`

const KizukiContentMainPage = () => {
    const { team_code ,kizuki_code} = useParams();
    const history = useHistory();
    const [Kizuki_Content, setKizuki_Content] = useState([]);
    const [Kizuki_Conent_Add_Modal_Is_Open, setKizuki_Conent_Add_Modal_Is_Open] = useState(false);
    const [Select_Kizuki, setSelect_Kizuki] = useState(null);
    const [Kizuki_Division, setKizuki_Division] = useState(null);
    
 const OnClose = () => {
    setKizuki_Conent_Add_Modal_Is_Open(false);
     Get_Kizuki_list_Data();
    };

    useEffect(() => {
        if (Kizuki_Conent_Add_Modal_Is_Open) {
            document.body.style.overflow = 'hidden'; // 스크롤 방지        
        } else {
            document.body.style.overflow = ''; // 스크롤 방지 스타일 제거 
        }   
    
  }, [Kizuki_Conent_Add_Modal_Is_Open]);


    const handleChangeDivison = async (Select_Code,Select_Name) => {
        try {
            
            const handleChangeDivison_Axios = await request.post('/LocalPim/handleChangeDivison', {
                Select_Code,
                kizuki_code
            })

            if (handleChangeDivison_Axios.data.dataSuccess) {
                setKizuki_Division({
                    ...Kizuki_Division,
                    kizuki_notepad_kizuki_list_division_code:Select_Code
                })
                toast.show({
                    title: `${Kizuki_Division.kizuki_notepad_kizuki_list_title}의 Kizuki를 ${Select_Name} 처리 하였습니다.`,
                    successCheck: true,
                    duration: 6000,
                });
            }else{
            toast.show({
                    title: `${Select_Name} 처리 실패 IT팀에 문의바랍니다.`,
                    successCheck: false,
                    duration: 6000,
                });
            }

        } catch (error) {
            console.log(error);
             toast.show({
                    title: `${Select_Name} 처리 실패 IT팀에 문의바랍니다.`,
                    successCheck: false,
                    duration: 6000,
                });
            }
        
    }

    const Get_Kizuki_Division = async () => {
        try {

            const Get_Kizuki_Division_Axios = await request.get('/LocalPim/Get_Kizuki_Division', {
                params: {
                    kizuki_code
                }
            })
            
            if (Get_Kizuki_Division_Axios.data.dataSuccess) {
                setKizuki_Division(Get_Kizuki_Division_Axios.data.Get_Kizuki_Division_Rows)
            }
            
        } catch (error) {
            console.log(error);
        }
    }
  
    const Get_Kizuki_list_Data = async () => {
        try {
            
            const Get_Kizuki_list_Data_Axios = await request.get('/LocalPim/Get_Kizuki_list_Data', {
                params: {
                    kizuki_code
                }
            })

            if (Get_Kizuki_list_Data_Axios.data.dataSuccess) {
                setKizuki_Content(Get_Kizuki_list_Data_Axios.data.Get_Kizuki_list_Data_Rows)
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        Get_Kizuki_list_Data();
        Get_Kizuki_Division();
    },[])



    return (
        <KizukiListMainPageMainDivBox>
            <NavigationMainPage TitleName="KIZUKI 노트"></NavigationMainPage>
             <div className="List_Move_Container">
                <h2 className="List_Move" onClick={() => history.push(`/KIZUKI_Notepad/${team_code}`)}>
                    <FaArrowLeft></FaArrowLeft>
                </h2>
                <h2>KIZUKI LIST</h2>
            </div>
            { Kizuki_Division?<div className="Kizuki_Division_Main_Box">
                <ul>
                    <li>
                        <div className={`Kizuki_Division_Container ${Kizuki_Division?.kizuki_notepad_kizuki_list_division_code === '34e6b5e6dd3b' ? "checked":""}`} onClick={()=>handleChangeDivison("34e6b5e6dd3b","미발표")}>
                            <div className="Kizuki_Division_Image_Container"><img width={50} src={`/free-icon-idea-hand-drawn-symbol-of-a-side-head-with-a-lightbulb-inside-35497.png`}></img></div>
                            <div className="Kizuki_Division_Text_Container">미발표</div>
                        </div>
                    </li>
                    <li>
                        <div className={`Kizuki_Division_Container ${Kizuki_Division?.kizuki_notepad_kizuki_list_division_code === '34e6b5e6dd3c' ? "checked":""}`} onClick={()=>handleChangeDivison("34e6b5e6dd3c","발표")}>
                            <div  className="Kizuki_Division_Image_Container"><img width={50} src={`/free-icon-presentation-1513622.png`}></img></div>
                            <div  className="Kizuki_Division_Text_Container">발표</div>
                        </div>
                    </li>
                    <li>
                        <div className={`Kizuki_Division_Container ${Kizuki_Division?.kizuki_notepad_kizuki_list_division_code === '34e6b5e6dd3d' ? "checked":""}`} onClick={()=>handleChangeDivison("34e6b5e6dd3d",'폐기')}>
                            <div className="Kizuki_Division_Image_Container"><img width={50} src={`/free-icon-bags-5765600.png`}></img></div>
                            <div  className="Kizuki_Division_Text_Container">폐기</div>
                        </div>
                    </li>
                </ul>
                            
            </div>:<></>}
            
            <div className="List_Container">
                {Kizuki_Content.map((list, j) => {

                    
                    return <div>
                {j === 0 ? <div>
                            <h1>{list.kizuki_notepad_kizuki_content_title}</h1>
                        </div>:<></>}
                        <div className="Content_Container">
                            <h5 style={{marginBottom:"0px"}}>{ Kizuki_Content.length -j}. </h5>
                        <ContentContainer list={list} Kizuki_Conent_Add_Modal_Is_Open={()=>setKizuki_Conent_Add_Modal_Is_Open(true)} OnClose={()=>OnClose()} setSelect_Kizuki={data=>setSelect_Kizuki(data)}></ContentContainer>
                           
                </div>
                </div>
                })}
                
               
            </div>

         

              <Modal isOpen={Kizuki_Conent_Add_Modal_Is_Open} style={customStyles} contentLabel="Select Modal">
                <KizukiContentModal OnClose={()=>OnClose()} Select_Kizuki={Select_Kizuki}></KizukiContentModal>
            </Modal>

        </KizukiListMainPageMainDivBox>
    )
}

export default KizukiContentMainPage