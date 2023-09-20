import React, { useState, useEffect, useCallback } from 'react';
import { InfoBoxMainPageMainDivBox } from '../InfoBox/InfoBoxMainPage';

const PatrolBox = () => {
    const [textareas, setTextareas] = useState([
        { indexs: 1, Select_Time: '10:00', Patrol_State: '특이사항 없습니다.', height: 'auto' },
        { indexs: 2, Select_Time: '13:00', Patrol_State: '특이사항 없습니다.', height: 'auto' },
        { indexs: 3, Select_Time: '17:00', Patrol_State: '특이사항 없습니다.', height: 'auto' },
    ]);

    const handleChange = useCallback(
        (e, index) => {
            const textareaLineHeight = 24;

            const updatedTextareas = [...textareas];
            const currentTextarea = updatedTextareas[index];

            e.target.rows = 1;

            const currentRows = Math.floor(e.target.scrollHeight / textareaLineHeight);

            if (currentRows === currentTextarea.rows) {
                e.target.rows = currentRows;
            }

            currentTextarea.Patrol_State = e.target.value;
            currentTextarea.height = `${e.target.scrollHeight}px`;

            setTextareas(updatedTextareas);
        },
        [textareas]
    );

    useEffect(() => {
        // 페이지가 다시 로드될 때 높이를 초기화
        window.addEventListener('beforeunload', () => {
            const updatedTextareas = textareas.map(textarea => {
                textarea.height = 'auto';
                return textarea;
            });
            setTextareas(updatedTextareas);
        });
    }, []);

    return (
        <InfoBoxMainPageMainDivBox>
            <h3>2. 순찰사항</h3>
            {textareas.map((textarea, index) => (
                <div className="Box_Container" key={index}>
                    <div>
                        <h4>{textarea.Select_Time} 순찰 정보</h4>
                        <div className="Input_Container">
                            <textarea
                                rows={1}
                                style={{ height: textarea.height }}
                                value={textarea.Patrol_State}
                                onChange={e => handleChange(e, index)}
                                onInput={e => handleChange(e, index)}
                                placeholder={`Textarea ${index + 1}`}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </InfoBoxMainPageMainDivBox>
    );
};

export default PatrolBox;
