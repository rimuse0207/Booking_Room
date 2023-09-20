import React, { useState, useEffect, useCallback, useRef } from 'react';
import { InfoBoxMainPageMainDivBox } from '../InfoBox/InfoBoxMainPage';

const PatrolBox = () => {
    const [textareas, setTextareas] = useState([
        {
            indexs: 1,
            Select_Time: '전층 비상계단,피난계단,E/V 홀 출입문 외부,전실 내부',
            Patrol_State: '특이사항 없습니다.',
            height: 'auto',
        },
        { indexs: 2, Select_Time: '건물 출입 인원', Patrol_State: '8층 : (최종퇴실자: )', height: 'auto' },
        {
            indexs: 3,
            Select_Time: '주차 내역',
            Patrol_State: `10시:
B2- Lam 1대 DHK 3대,
B3- 2대, B4- 5대

13시:
B2- Lam 1대 DHK 3대,
B3- 2대, B4- 5대

17시:
B2- Lam 1대 DHK2대,
B3- 2대, B4- 5대`,
            height: 'auto',
        },
    ]);

    const textareaRefs = useRef(textareas.map(() => React.createRef()));

    useEffect(() => {
        // 페이지가 로드될 때 및 높이 재설정 이벤트에 대한 핸들러
        const resetTextareaHeights = () => {
            const updatedTextareas = textareas.map((textarea, index) => {
                const textareaRef = textareaRefs.current[index];
                if (textareaRef && textareaRef.current) {
                    textareaRef.current.style.height = 'auto';
                    const currentRows = Math.floor(textareaRef.current.scrollHeight / 24); // 24는 라인 높이입니다.
                    textareaRef.current.style.height = `${currentRows * 24 + 30}px`;
                }
                return textarea;
            });
            setTextareas(updatedTextareas);
        };

        // 페이지 로드 시와 높이 재설정 이벤트에 대한 이벤트 리스너 등록
        window.addEventListener('load', resetTextareaHeights);
        window.addEventListener('resize', resetTextareaHeights);

        // 컴포넌트가 언마운트될 때 이벤트 리스너 해제
        return () => {
            window.removeEventListener('load', resetTextareaHeights);
            window.removeEventListener('resize', resetTextareaHeights);
        };
    }, [textareas]);

    const handleInputChange = (e, index) => {
        const updatedTextareas = [...textareas];
        const currentTextarea = updatedTextareas[index];
        const textareaRef = textareaRefs.current[index];

        textareaRef.current.style.height = 'auto';
        const currentRows = Math.floor(textareaRef.current.scrollHeight / 24); // 24는 라인 높이입니다.
        textareaRef.current.style.height = `${currentRows * 24}px`;

        currentTextarea.Patrol_State = e.target.value;
        setTextareas(updatedTextareas);
    };

    return (
        <InfoBoxMainPageMainDivBox>
            <h3>5. 점검 및 순찰내역</h3>
            {textareas.map((textarea, index) => (
                <div className="Box_Container" key={index}>
                    <div>
                        <h4>{textarea.Select_Time}</h4>
                        <div className="Input_Container">
                            <textarea
                                ref={textareaRefs.current[index]}
                                rows={1}
                                style={{ height: textarea.height }}
                                value={textarea.Patrol_State}
                                onChange={e => handleInputChange(e, index)}
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
