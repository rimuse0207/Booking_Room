import React, { useEffect, useMemo, useRef } from "react";
import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import Select from "react-select";
import { request } from "../../../API";
import uuid from "react-uuid";
import moment from 'moment';
import { useSelector } from "react-redux";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import Quill from 'quill';
import ImageResize from '@looop/quill-image-resize-module-react';
import QuillImageDropAndPaste from 'quill-image-drop-and-paste'
import { toast } from "../../ToasMessage/ToastManager";
import quillTable from "quill-table";
import './quill.table.css';

Quill.register('modules/ImageResize', ImageResize);
Quill.register('modules/imageDropAndPaste', QuillImageDropAndPaste)

Quill.register(quillTable.TableCell);
Quill.register(quillTable.TableRow);
Quill.register(quillTable.Table);
Quill.register(quillTable.Contain);
Quill.register('modules/table', quillTable.TableModule);

const maxRows = 10;
const maxCols = 5;
const tableOptions = [];
for (let r = 1; r <= maxRows; r++) {
    for (let c = 1; c <= maxCols; c++) {
        tableOptions.push('newtable_' + r + '_' + c);
    }
}


const KizukiWriteMainPageMainDivBox = styled.div`

    position:relative;

    

    .Close_Icons{
        position:absolute;
        top:0px;
        right:0px;
        color:red;
        :hover{
            cursor: pointer;
        }
    }


    .Kizuki_Title_Container{
        width:100%;
        max-width:600px;
        height:40px;
        margin-top:10px;
        margin-bottom:10px;
        input{
            height:40px;
            width:100%;
            padding-left:10px;
            font-size:1.2em !important;
            font-weight:bolder;
            border:1px solid lightgray;
            border-radius:5px;
        }

    }
    .Kizuki_User_Container{
          margin-top:10px;
        margin-bottom:10px;
        width:100%;
        max-width:600px;
        height:40px;
    }



    .quill {
        min-height:350px;
        .ql-container,.ql-editor {
            min-height:350px;
            font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif !important;
            
        }
    }
    .Save_Button_Container{
        margin-top:50px;
        margin-bottom:50px;
        button{
        width:50px;
        height:50px;
        border-radius:10px;
        border:none;
        background-color:#368;
        color:white;
        :hover{
            cursor: pointer;
            background-color:lightgray;
            color:#368;
        }
    }
    }
`

const KizukiWriteMainPage = ({ OnClose, team_code }) => {
    const quillRef = useRef();
    const [New_Kizuki, setNew_Kizuki] = useState("");
    const [User_Select_Options, setUser_Select_Options] = useState([]);
    const [User_Select, setUser_Select] = useState(null);
    const [Kizuki_Title, setKizuki_Title] = useState('');
    const Login_Info = useSelector((state) => state.LoginInfoDataRedux.Infomation);
    const onChange = (content, delta, source, data) => {
        setNew_Kizuki(data);
    };


    const HandlePaste = async(imageDataUrl, type, imageData) => {
        const file = imageData.toFile()
        const formData = new FormData()
        formData.append('image', file)
        
        if (file) {
             try {
            const editor = quillRef.current.getEditor();         
            const range = editor.getSelection(true);
                        const dataSendImageFromServer = await request.post(`/FoodApp/FoodImageUpload`, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        });
                    if (dataSendImageFromServer.data.dataSuccess) {
                            const URLs = `${process.env.REACT_APP_DB_HOST}/FoodImages/${dataSendImageFromServer.data.Image_data.filename.split(".")[0]}_resize.jpg`
                            editor.insertEmbed(range.index, "image", URLs);
                                    // URL 삽입 후 커서를 이미지 뒷 칸으로 이동
                        editor.setSelection(range.index + 1);
                        
                        } 
             
            } catch (error) {
                console.log(error);
            }
        }
       

    }

    const imageHandler = () => {
        const input = document.createElement('input');

        input.setAttribute("id","File_Upload_ID")
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        document.body.appendChild(input);
        
        input.click();  
        
        
            input.addEventListener("change", async () => {
            const editor = quillRef.current.getEditor();
                const file = input.files[0];
                const range = editor.getSelection(true);
                try {
                    const formData = new FormData();
                    formData.append('image', file);

                        const dataSendImageFromServer = await request.post(`/FoodApp/FoodImageUpload`, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        });
                    if (dataSendImageFromServer.data.dataSuccess) {
                            const URLs = `${process.env.REACT_APP_DB_HOST}/FoodImages/${dataSendImageFromServer.data.Image_data.filename.split(".")[0]}_resize.jpg`
                            editor.insertEmbed(range.index, "image", URLs);
                                    // URL 삽입 후 커서를 이미지 뒷 칸으로 이동
                        editor.setSelection(range.index + 1);
                        input.remove();
                        } 
             
            } catch (error) {
                console.log(error);
            }
            });
    }
    
    const modules = useMemo(() => {
        return {
             
            toolbar: {
                handlers: { image: imageHandler, paste: HandlePaste },
                onPaste: { image: HandlePaste },
                container: [
                // [{table: tableOptions}, {table: 'append-row'}, {table: 'append-col'}],
                // [{ font: ['arial', 'comic-sans', 'courier-new', 'georgia', 'helvetica', 'lucida'] }],
                [{ header: [1, 2, false] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                ['link', 'image'],
                [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
                [{ color: [] }, { background: [] }], // dropdown with defaults from theme
                ['clean'],
             ]},
          table:true,
         clipboard: {
            matchVisual: false, // 이벤트가 발생하도록 설정
            },
            ImageResize: { modules: ['Resize'] },
          imageDropAndPaste: {
                handler: HandlePaste
                }
       
    }
     },[]) 
    const formats = [
        // 'font',
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'align',
        'color',
        'background',
    ];

    const Kizuki_New_Write = async() => {
        try {
            
            if (!Kizuki_Title || !User_Select) {
                 toast.show({
                    title: `공란을 전부 적어주세요.`,
                    successCheck: false,
                    duration: 6000,
                });
            
                return;
                
            }

            const Random_code = uuid().split("-");
            const Random_Key = `${moment().format("YYYYMMDD")}_${Random_code[0]}${Random_code[1]}`
            const Random_Content_code = uuid().split("-");
            const Random_key_content = `${moment().format("YYYYMMDD")}_${Random_Content_code[0]}${Random_Content_code[1]}`

            const Kizuki_New_Write_Axios = await request.post('/LocalPim/Kizuki_New_Write', {
                New_Kizuki,
                Random_Key,
                User_Select,
                team_code,
                Kizuki_Title,
                write_id: Login_Info.Login_id,
                Random_key_content
            })
            if (Kizuki_New_Write_Axios.data.dataSuccess) {
                OnClose();
            }
        } catch (error) {
            console.log(error);
        }
    }

    

   
    
    const Pim_Preson_Getting = async () => {
        try {
            
            const Pim_Preson_Getting_Axios = await request.get('/LocalPim/Pim_Preson_Getting');
            if (Pim_Preson_Getting_Axios.data.dataSuccess) {
                setUser_Select_Options(Pim_Preson_Getting_Axios.data.Select_Data)
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        Pim_Preson_Getting(); 
    },[])


    return (
        <KizukiWriteMainPageMainDivBox>
            <div className="Close_Icons" onClick={()=>OnClose()}>
                    <IoClose></IoClose>
            </div>
            <div>
                <div className="Kizuki_Title_Container">
                    <input placeholder="KIZUKI 제목..." value={Kizuki_Title} onChange={(e)=>setKizuki_Title(e.target.value)}></input>
                </div>
                <div className="Kizuki_User_Container">
                     <Select
                        value={User_Select}
                        onChange={e => setUser_Select(e)}
                        name="colors"
                        options={User_Select_Options}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        isClearable={true}
                        placeholder={"발안자 선택"}
                    />
                </div>
                <div>
                    <ReactQuill
                            ref={quillRef}
                            style={{ fontFamily:"'sans-serif', 'serif', 'monospace', 'cursive', 'fantasy'" }}
                            theme="snow"
                            modules={modules}
                            formats={formats}
                            value={New_Kizuki}
                            onChange={(content, delta, source, editor) => onChange(content, delta, source,editor.getHTML())}
                            
                        />
                </div>
                

            </div>
            <div className="Save_Button_Container">
                <button onClick={() => Kizuki_New_Write()}>등 록</button>
            </div>
        </KizukiWriteMainPageMainDivBox>
    )
}

export default KizukiWriteMainPage;