import moment from 'moment';
import React from 'react';

const Te = () => {
    return (
        <div>
            <div>asdasd</div>
            {moment.duration(moment('2022-10-11T00:00:00+09:00').diff(moment('2022-10-11'))).asDays()}
        </div>
    );
};

export default Te;
