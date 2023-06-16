import React from "react";
import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import ReactQuill from 'react-quill';
import { useState } from "react";
import Select from "react-select";

const KizukiWriteMainPageMainDivBox = styled.div`

    position:relative;

    .ql-snow{
        font-family:auto !important;
    }

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

`

const KizukiWriteMainPage = ({ OnClose }) => {
    const [New_Kizuki, setNew_Kizuki] = useState("");

    const onChange = data => {
        setNew_Kizuki(data);
    };

     const modules = {
        toolbar: [
            // [{ font: ['arial', 'comic-sans', 'courier-new', 'georgia', 'helvetica', 'lucida'] }],
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link'],
            [{ align: [] }, { color: [] }], // dropdown with defaults from theme
            ['clean'],
        ],
    };
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
        // 'image',
        'align',
        'color',
        // 'background',
    ];

    const HandleCLicks = () => {
        console.log(New_Kizuki)
    }


    return (
        <KizukiWriteMainPageMainDivBox>
            <div className="Close_Icons" onClick={()=>OnClose()}>
                    <IoClose></IoClose>
            </div>
            <div>
                <div className="Kizuki_Title_Container">
                    <input placeholder="KIZUKI 제목..."></input>
                </div>
                <div className="Kizuki_User_Container">
                     <Select
                        // value={Select_Value}
                        // ref={SelectUserRef}
                        // onChange={e => handleChangeData(e)}
                        name="colors"
                        options={[]}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        isClearable={true}
                        placeholder={"발안자 선택"}
                    />
                </div>
                <div>
                     <ReactQuill
                            style={{ height: '350px', marginBottom: '40px', fontFamily:"'sans-serif', 'serif', 'monospace', 'cursive', 'fantasy'" }}
                            theme="snow"
                            modules={modules}
                            formats={formats}
                            value={New_Kizuki}
                            onChange={(content, delta, source, editor) => onChange(editor.getHTML())}
                        />
                </div>
                

            </div>
            <button onClick={()=>HandleCLicks()}>확인</button>
        </KizukiWriteMainPageMainDivBox>
    )
}

export default KizukiWriteMainPage;