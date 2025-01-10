import React, { useState } from 'react';
import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';
import ReactQuill from 'react-quill';
import { Axios_Post_Moduls, request } from '../../../../API';
import { useSelector } from 'react-redux';
import moment from 'moment';
import uuid from 'react-uuid';
import 'react-quill/dist/quill.snow.css';
import Quill from 'quill';
import ImageResize from '@looop/quill-image-resize-module-react';
import QuillImageDropAndPaste from 'quill-image-drop-and-paste';
import { useRef } from 'react';
import { useMemo } from 'react';
import { toast } from '../../../ToasMessage/ToastManager';

Quill.register('modules/ImageResize', ImageResize);
Quill.register('modules/imageDropAndPaste', QuillImageDropAndPaste);

const KizukiContentModalMainBox = styled.div`
    position: relative;
    .Close_Icons {
        position: absolute;
        top: 0px;
        right: 0px;
        color: red;
        :hover {
            cursor: pointer;
        }
    }

    .quill {
        min-height: 350px;
        .ql-container,
        .ql-editor {
            min-height: 350px;
            font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif !important;
        }
    }
    .Save_Button_Container {
        margin-top: 50px;
        margin-bottom: 50px;
        text-align: end;
    }

    .Kizuki_Title_Container {
        width: 100%;
        max-width: 600px;
        height: 40px;
        margin-top: 10px;
        margin-bottom: 10px;
        input {
            height: 40px;
            width: 100%;
            padding-left: 10px;
            font-size: 1.2em !important;
            font-weight: bolder;
            border: 1px solid lightgray;
            border-radius: 5px;
        }
    }
    button {
        width: 50px;
        height: 50px;
        border-radius: 10px;
        border: none;
        background-color: #368;
        color: white;
        :hover {
            cursor: pointer;
            background-color: lightgray;
            color: #368;
        }
    }
`;

const KizukiContentModal = ({ OnClose, Select_Kizuki }) => {
    const quillRef = useRef();
    const Login_Info = useSelector(state => state.LoginInfoDataRedux.Infomation);
    const [Content, setContent] = useState(`
    ${Select_Kizuki.kizuki_notepad_kizuki_content_main}
    `);
    const [Change_Title, setChange_Title] = useState(Select_Kizuki.kizuki_notepad_kizuki_content_title);

    const HandlePaste = async (imageDataUrl, type, imageData) => {
        const blob = imageData.toBlob();
        const file = imageData.toFile();
        const formData = new FormData();
        formData.append('image', file);

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
                    const URLs = `${process.env.REACT_APP_DB_HOST}/FoodImages/${
                        dataSendImageFromServer.data.Image_data.filename.split('.')[0]
                    }_resize.jpg`;
                    editor.insertEmbed(range.index, 'image', URLs);
                    // URL 삽입 후 커서를 이미지 뒷 칸으로 이동
                    editor.setSelection(range.index + 1);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const imageHandler = () => {
        const input = document.createElement('input');

        input.setAttribute('id', 'File_Upload_ID');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        document.body.appendChild(input);

        input.click();

        input.addEventListener('change', async () => {
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
                    const URLs = `${process.env.REACT_APP_DB_HOST}/FoodImages/${
                        dataSendImageFromServer.data.Image_data.filename.split('.')[0]
                    }_resize.jpg`;
                    editor.insertEmbed(range.index, 'image', URLs);
                    // URL 삽입 후 커서를 이미지 뒷 칸으로 이동
                    editor.setSelection(range.index + 1);
                    input.remove();
                }
            } catch (error) {
                console.log(error);
            }
        });
    };

    const modules = useMemo(() => {
        return {
            toolbar: {
                handlers: { image: imageHandler, paste: HandlePaste },
                onPaste: { image: HandlePaste },

                container: [
                    // [{ font: ['arial', 'comic-sans', 'courier-new', 'georgia', 'helvetica', 'lucida'] }],
                    [{ header: [1, 2, false] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                    ['link', 'image'],
                    [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
                    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
                    ['clean'],
                ],
            },

            clipboard: {
                matchVisual: false, // 이벤트가 발생하도록 설정
            },
            ImageResize: { modules: ['Resize'] },
            imageDropAndPaste: {
                handler: HandlePaste,
            },
        };
    }, []);
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

    const onChange = data => {
        setContent(data);
    };

    const Kizuki_Add_Write = async () => {
        const Random_Content_code = uuid().split('-');
        const Random_key_content = `${moment().format('YYYYMMDD')}_${Random_Content_code[0]}${Random_Content_code[1]}`;

        const Kizuki_Add_Write_Axios = await Axios_Post_Moduls('/LocalPim/Kizuki_Add_Write', {
            Content,
            id: Login_Info.Login_id,
            Random_key_content,
            Select_Kizuki,
            Change_Title,
        });

        if (Kizuki_Add_Write_Axios) {
            OnClose();
        } else {
            toast.show({
                title: `IT팀에 문의바랍니다.`,
                successCheck: false,
                duration: 6000,
            });
        }
    };

    return (
        <KizukiContentModalMainBox>
            <div className="Close_Icons" onClick={() => OnClose()}>
                <IoClose></IoClose>
            </div>

            <div className="Kizuki_Title_Container">
                <input placeholder="KIZUKI 제목..." value={Change_Title} onChange={e => setChange_Title(e.target.value)}></input>
            </div>

            <ReactQuill
                ref={quillRef}
                style={{ fontFamily: "'sans-serif', 'serif', 'monospace', 'cursive', 'fantasy'" }}
                theme="snow"
                modules={modules}
                formats={formats}
                value={Content}
                onChange={(content, delta, source, editor) => onChange(content, delta, source, editor.getHTML())}
            />
            <div className="Save_Button_Container">
                <button onClick={() => Kizuki_Add_Write()}>추가 등록</button>
            </div>
        </KizukiContentModalMainBox>
    );
};

export default KizukiContentModal;
