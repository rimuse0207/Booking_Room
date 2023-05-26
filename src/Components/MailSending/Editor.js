import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Editor = () => {
  const [text, setText] = useState('');

  const handleChange = (value) => {
    setText(value);
  };

  const modules = {
    toolbar: {
      container: [
        [{ 'size': ['8', '10', '12', '14', '16', '18', '20', '22', '24', '26', '28', '30', '32', '36', '40', '48', '56', '64', '72'] }],
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link'],
        [{ align: [] }, { color: [] }, { size: [] }],
        ['clean'],
      ],
     handlers: {
  size: function (value) {
    if (value) {
      this.quill.format('size', parseInt(value));
    }
  },
},
    },
  };

  const formats = [
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
    'color',
    'size',
  ];

  return (
    <ReactQuill
      value={text}
      onChange={handleChange}
      modules={modules}
      formats={formats}
      placeholder="Write something..."
    />
  );
};

export default Editor;