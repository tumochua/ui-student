import { useState, useEffect } from 'react';
import { apiManageGetALlTeacher } from '@/services/apis';
import style from './ManageTeach.module.scss';
import Avatart from '@/components/Avatart';
function ManageTeach() {
    // eslint-disable-next-line no-unused-vars
    const [headers, setHeaders] = useState([
        {
            id: 1,
            name: 'STT',
            icon: 'fa-solid fa-sort',
        },
        {
            id: 2,
            name: 'Roll',
            icon: 'fa-solid fa-sort',
        },
        {
            id: 3,
            name: 'Avatar',
            icon: 'fa-solid fa-sort',
        },
        {
            id: 4,
            name: 'Full Name',
            icon: 'fa-solid fa-sort',
        },
        {
            id: 5,
            name: 'Gender',
            icon: 'fa-solid fa-sort',
        },
        // {
        //     id: 6,
        //     name: 'Parents Name',
        //     icon: 'fa-solid fa-sort',
        // },
        // {
        //     id: 7,
        //     name: 'Class',
        //     icon: 'fa-solid fa-sort',
        // },
        {
            id: 8,
            name: 'Address',
            // icon: 'fa-solid fa-sort',
        },
        {
            id: 9,
            name: 'Date Of Birth',
            icon: 'fa-solid fa-sort',
        },
        {
            id: 10,
            name: 'Mobile',
            icon: 'fa-solid fa-sort',
        },
        {
            id: 11,
            name: 'Email',
            icon: 'fa-solid fa-sort',
        },
        {
            id: 12,
            name: 'Actions',
            icon: 'fa-solid fa-sort',
        },
    ]);
    const [teacherData, setTeacherData] = useState(null);
    useEffect(() => {
        (async () => {
            const response = await apiManageGetALlTeacher();
            if (response.data.statusCode === 2) {
                setTeacherData(response.data.data);
            }
        })();
    }, []);
    return (
        <div className={style.container}>
            <table>
                <tbody>
                    <tr>
                        {headers &&
                            headers.map((header) => {
                                return (
                                    <th key={header.id}>
                                        <div className={style.headerItem}>
                                            <span>
                                                <i className={`${header?.icon} ${style.iconSort}`}></i>
                                            </span>
                                            <p>{header.name}</p>
                                        </div>
                                    </th>
                                );
                            })}
                    </tr>
                    {teacherData &&
                        teacherData.map((teacher) => {
                            return (
                                // <tr>
                                <tr key={teacher.id}>
                                    <th>{teacher.id}</th>
                                    <th>{teacher?.roleData?.valueEn}</th>
                                    <th>
                                        {/* {JSON.stringify(teacher?.image)} */}
                                        <Avatart src={teacher?.image} type="avart"></Avatart>
                                    </th>
                                    {/* <th>{teacher.image}</th> */}
                                    <th>{teacher.fullName}</th>
                                    <th>{teacher?.genderData?.valueEn}</th>
                                    <th>{teacher.address}</th>
                                    <th>{teacher.dob}</th>
                                    <th>{teacher.mobile}</th>
                                    <th>{teacher.email}</th>
                                    <th>actions</th>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
}

export default ManageTeach;
