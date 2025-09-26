import React from 'react';
import 'moment/locale/ko';
import { ko } from 'date-fns/esm/locale';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import styled from 'styled-components';
import moment from 'moment';

const ModuleDatePickersMainDivBox = styled.div`
    .saturday {
        color: blue;
        opacity: 0.8;
    }
    .sunday {
        color: red;
        opacity: 0.8;
    }
`;

const ModuleDatePickers = ({ selectedDates, setSelectedDates }) => {
    const handleDateChange = date => {
        // 이미 선택된 날짜면 제거, 아니면 추가
        const exists = selectedDates.some(d => d.toDateString() === date.toDateString());

        if (exists) {
            setSelectedDates(selectedDates.filter(d => d.toDateString() !== date.toDateString()));
        } else {
            setSelectedDates([...selectedDates, date]);
        }
    };

    ///date-picker 토요일 일요일 색깔 표시
    const getDayName = date => {
        return date
            .toLocaleDateString('ko-KR', {
                weekday: 'long',
            })
            .substr(0, 1);
    };
    const createDate = date => {
        return new Date(new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0));
    };
    return (
        <ModuleDatePickersMainDivBox>
            <DatePicker
                inline
                dateFormat="yyyy-MM-dd"
                onChange={handleDateChange}
                highlightDates={selectedDates}
                popperModifiers={{
                    // 모바일 web 환경에서 화면을 벗어나지 않도록 하는 설정
                    preventOverflow: {
                        enabled: true,
                    },
                }}
                locale={ko}
                openToDate={selectedDates.length > 0 ? selectedDates[0] : new Date()}
                dayClassName={date =>
                    getDayName(createDate(date)) === '토' ? 'saturday' : getDayName(createDate(date)) === '일' ? 'sunday' : undefined
                }
            ></DatePicker>
        </ModuleDatePickersMainDivBox>
    );
};

export default ModuleDatePickers;
