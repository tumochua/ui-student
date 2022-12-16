import { useState, useEffect } from 'react';

import { useContextStore } from '@/context';
import style from './ClassInfo.module.scss';

import { apiGetListStudentOfClass } from '@/services/apis';
function ClassInfo() {
    const [state] = useContextStore();
    const [className, setClassName] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [listClass, setListClass] = useState(null);
    // if (state.userInfor) {
    //     console.log('state', state.userInfor.data);
    // }
    useEffect(() => {
        (async () => {
            if (className) {
                const response = await apiGetListStudentOfClass(className);
                console.log(response.data.data);
                if (response.data.statusCode) {
                    setListClass(JSON.parse(response.data.data));
                }
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [className]);
    useEffect(() => {
        if (state.userInfor) {
            const copyStae = state.userInfor.data.classData.className;
            // const copyStae = state.userInfor.data.classData.keyMap;
            setClassName(copyStae);
        }
    }, [state.userInfor]);

    return <div className={style.container}>{/* <h2>{listClass && listClass.className}</h2> */}</div>;
}

export default ClassInfo;
