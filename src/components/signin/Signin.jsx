import React from 'react';
import '../../styles/signstyle.css';

const InputBox = ({ label, type, name, maxLength, autoComplete }) => (
    <div className="input-box">
        <input
            required
            name={name}
            type={type}
            id={name}
            autoComplete={autoComplete}
            maxLength={maxLength}
        />
        <label htmlFor={name}>{label}</label>
    </div>
);

const Signin = ({ handlePopupOpen, handlePopupClose }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted");
    };

    return (
        <div className="sign" onClick={handlePopupClose}>
            <form onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
                <div className="box">
                    <span className="close" onClick={handlePopupClose}>&times;</span>
                    <h1>เข้าสู่ระบบ</h1>
                    <InputBox
                        label="ชื่อผู้ใช้"
                        type="text"
                        name="username"
                        maxLength="50"
                        autoComplete="on"
                    />
                    <InputBox
                        label="รหัสผ่าน"
                        type="password"
                        name="password"
                        maxLength="30"
                        autoComplete="current-password"
                    />
                    <button className="btn" type="submit">เข้าสู่ระบบ</button>
                    <div onClick={() => { handlePopupOpen(); handlePopupClose(); }}>
                        สมัครสมาชิก คลิก
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Signin;
