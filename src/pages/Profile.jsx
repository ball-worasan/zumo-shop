import React from 'react';
import '../styles/profile.css'

const Profile = ({ user }) => {
    return (
        <main className="main">
            <section className="flex">
                <div className="overlay" id="overlay"></div>
                <div className="boxs">
                    <div className="card">
                        <div className="profile-img">
                            <div className="bg">
                                <img src={user?.profile_img} alt="" />
                                <i className="fa-solid fa-camera"></i>
                            </div>
                        </div>
                        <div className="name">
                            <h4>
                                {user?.username} {user?.confirm_user === 1 && <i className="fa-solid fa-check-to-slot"></i>}
                            </h4>
                        </div>
                        <div className="btn-menu">
                            <button className="edit-account-button" >
                                แก้ไขบัญชี
                            </button>
                        </div>
                    </div>

                    <div id="editPopup" className="popup">
                        <div className="popup-content">
                            <span className="close" >&times;</span>
                            <h2>แก้ไขบัญชี</h2>
                            <form id="editForm">
                                <div className="input">
                                    <label htmlFor="username">ชื่อ</label>
                                    <input type="text" id="username" name="username" value={user?.username} autoComplete="off" maxLength="30" required />
                                </div>
                                <div className="input">
                                    <label htmlFor="email">อีเมล</label>
                                    <input type="email" id="email" name="email" value={user?.email} autoComplete="off" maxLength="50" required />
                                </div>
                                <button type="submit" name="editer" className="btn-menu btn-primary">บันทึก</button>
                            </form>
                        </div>
                    </div>

                    <div className="card">
                        <div className="row">
                            <h2>อีเมล</h2>
                            <h3>{user?.email}</h3>
                        </div>
                        <div className="row">
                            <h2>เบอร์</h2>
                            <h3>{user?.phone}</h3>
                        </div>
                        <div className="row">
                            <h2>ยศ</h2>
                            <h3>{user?.user_role}</h3>
                        </div>
                        <div className="row">
                            <h2>IP ล่าสุด</h2>
                            <h3>{user?.last_ip}</h3>
                        </div>
                        <div className="row">
                            <h2>วันที่สร้างสมาชิก</h2>
                            <h3>{user?.datetime_register}</h3>
                        </div>
                    </div>

                    <div className="card">
                        <div className="row">
                            <h2>จำนวนเครดิต</h2>
                            <h3>{user?.point}</h3>
                        </div>
                    </div>

                    <div className="card">
                        <div className="row">
                            <h2>ประวัติการซื้อ</h2>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>รหัสสินค้า</th>
                                    <th>สถานะ</th>
                                    <th>ใบเสร็จ</th>
                                    <th>แชท</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* แสดงรายการสินค้าที่ซื้อ */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Profile;
