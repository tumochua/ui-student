import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './ManageStudent.module.scss';
import { apiGetAllStudentManage, apiManageDeleteUser } from '@/services/apis';
import config from '@/config';
import Modal from '@/components/Modal';
function ManageStudent() {
    const navigate = useNavigate();

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
        {
            id: 6,
            name: 'Parents Name',
            icon: 'fa-solid fa-sort',
        },
        {
            id: 7,
            name: 'Class',
            icon: 'fa-solid fa-sort',
        },
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
    const [allStudents, setAllStudents] = useState(null);
    const [isConfirm, setIsConfirm] = useState(false);
    // const [isOk, setIsOk] = useState(false);
    const [userId, setUserId] = useState(null);
    const [isRerender, setIsRerender] = useState(false);
    useEffect(() => {
        (async () => {
            const response = await apiGetAllStudentManage();
            if (response.data.statusCode === 2) {
                setAllStudents(response.data.data);
            }
        })();
    }, [isRerender]);
    useEffect(() => {
        if (allStudents) {
            // console.log(allStudents);
        }
    }, [allStudents]);

    const handleEditUserManage = (userId) => {
        navigate(config.routes.editUserManage, { state: { id: userId } });
    };

    const handleManageDeleteUser = (userId) => {
        setIsConfirm(true);
        setUserId(userId);
    };

    const handleCanCel = () => {
        setIsConfirm(false);
    };
    const handleOk = async () => {
        // setIsOk(true);
        setIsConfirm(false);
        // console.log(userId);
        const response = await apiManageDeleteUser(userId);
        // console.log(response);
        if (response.data.statusCode === 2) {
            setIsRerender(!isRerender);
        }
    };

    return (
        <>
            <Modal showModal={isConfirm} isBottom position="center" onCanCel={handleCanCel} onOk={handleOk}>
                <h3> Bạn Có Chắc Muốn Xóa User Này</h3>
            </Modal>
            <div className={style.container}>
                <div className={style.content}>
                    <h3>All student</h3>
                    <div className={style.body}>
                        <div className={style.headerWapper}>
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
                                    {allStudents &&
                                        allStudents.map((student) => {
                                            return (
                                                <tr key={student.id}>
                                                    <th>{student.id}</th>
                                                    <th>{student?.roleData?.valueEn}</th>
                                                    <th className={style.avatarWapper}>
                                                        <span>
                                                            {student?.image ? (
                                                                <img
                                                                    src={student.image}
                                                                    alt="avatar"
                                                                    className={style.avatar}
                                                                />
                                                            ) : (
                                                                <img
                                                                    src="https://as2.ftcdn.net/v2/jpg/03/32/59/65/1000_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg"
                                                                    alt="avatar"
                                                                    className={style.avatar}
                                                                />
                                                            )}
                                                        </span>
                                                    </th>
                                                    <th>{student?.fullName}</th>
                                                    <th>{student?.genderData?.valueEn}</th>
                                                    <th>{student?.parentData?.fullNameFather}</th>
                                                    <th>{student?.classId}</th>
                                                    <th>{student?.address}</th>
                                                    {/* <th>{student?.dob}</th> */}
                                                    <th>
                                                        {new Intl.DateTimeFormat('vi-US', {
                                                            day: '2-digit',
                                                            month: '2-digit',
                                                            year: 'numeric',
                                                        }).format(new Date(student?.dob).getTime())}
                                                    </th>
                                                    <th>{student?.mobile}</th>
                                                    <th>{student?.email}</th>
                                                    <th>
                                                        <div className={style.actionsWapper}>
                                                            <i className={`fa-solid fa-eye ${style.eye}`}></i>
                                                            <i
                                                                className={`fa-solid fa-pen-to-square ${style.pen}`}
                                                                onClick={() => handleEditUserManage(student.id)}
                                                            ></i>
                                                            <i
                                                                className={`fa-solid fa-trash ${style.trash}`}
                                                                onClick={() => handleManageDeleteUser(student.id)}
                                                            ></i>
                                                        </div>
                                                    </th>
                                                </tr>
                                            );
                                        })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ManageStudent;
