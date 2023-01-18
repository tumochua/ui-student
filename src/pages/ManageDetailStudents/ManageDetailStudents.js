import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { apiManageGetDetailUser } from '@/services/apis';
import style from './ManageDetailStudents.module.scss';
import config from '@/config';
import Avatart from '@/components/Avatart';
function ManageDetailStudents() {
    const local = useLocation();
    const navigate = useNavigate();
    // eslint-disable-next-line no-unused-vars
    const [userId, setUserId] = useState(local.state.id);
    // eslint-disable-next-line no-unused-vars
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        if (userId) {
            (async () => {
                const response = await apiManageGetDetailUser(userId);
                // console.log(response);
                if (response.data.statusCode === 2) {
                    setUserData(response.data.data);
                }
            })();
        }
    }, [userId]);
    // console.log(userData);
    const handleBacks = () => {
        navigate(config.routes.manageStudent);
    };

    return (
        <div className={style.container}>
            <div className={style.header}>
                <div className={style.wapper}>
                    <div className={style.backs} onClick={handleBacks}>
                        <i className="fa-solid fa-backward"></i>
                        <span>Quay Lại</span>
                    </div>
                    <h4>Student Detail</h4>
                </div>
            </div>
            <div className={style.body}>
                <h4>FullName: {userData?.fullName}</h4>
                <div className={style.content}>
                    <div className={style.leftCtn}>
                        <div className={style.avatart}>
                            <Avatart src={userData?.image} />
                        </div>
                    </div>
                    <div className={style.rightCtn}>
                        <div className={style.title}>
                            <h2>About Me</h2>
                        </div>
                        <div className={style.contentBody}>
                            <div className={style.wapper}>
                                <span>FullName: </span>
                                {/* <span>FullName: </span> */}
                                <p> {userData?.fullName}</p>
                            </div>
                            <div className={style.wapper}>
                                <span>Gender: </span>
                                <p> {userData?.genderData?.valueEn}</p>
                            </div>
                            <div className={style.wapper}>
                                <span>Father's full name: </span>
                                <p> {userData?.parentData?.fullNameFather || 'Chưa cập nhật'}</p>
                            </div>
                            <div className={style.wapper}>
                                <span>Mother's Name: </span>
                                <p> {userData?.parentData?.fullNameMommy || 'Chưa cập nhật'}</p>
                            </div>
                            <div className={style.wapper}>
                                <span>Date of birth: </span>
                                <p> {userData?.dob || 'Chưa cập nhật'}</p>
                            </div>
                            <div className={style.wapper}>
                                <span>Religion: </span>
                                <p> Việt Nam </p>
                            </div>
                            <div className={style.wapper}>
                                <span>Family contact: </span>
                                <p> {userData?.parentData?.mobile || 'Chưa cập nhật' || 'Chưa cập nhật'}</p>
                            </div>
                            {/* <div className={style.wapper}>
                                <span>FullName: </span>
                                <p> {userData?.fullName || 'Chưa cập nhật'}</p>
                            </div> */}
                            <div className={style.wapper}>
                                <span>Email student: </span>
                                <p> {userData?.email || 'Chưa cập nhật'}</p>
                            </div>
                            <div className={style.wapper}>
                                <span>Class: </span>
                                <p> {userData?.classId || 'Chưa cập nhật'}</p>
                            </div>
                            <div className={style.wapper}>
                                <span>Role: </span>
                                <p> {userData?.roleData?.valueEn || 'Chưa cập nhật'}</p>
                            </div>
                            <div className={style.wapper}>
                                <span>Address: </span>
                                <p> {userData?.address || 'Chưa cập nhật'}</p>
                            </div>
                            <div className={style.wapper}>
                                <span>Phone: </span>
                                <p> {userData?.mobile || 'Chưa cập nhật'}</p>
                            </div>
                        </div>
                    </div>
                    {/* <div className={style.action}>
                        <div>
                        <i class="fa-solid fa-pen-to-square"></i>
                        <i class="fa-solid fa-download"></i>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default ManageDetailStudents;
