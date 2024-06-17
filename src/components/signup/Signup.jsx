import React from 'react';
import '../../styles/signstyle.css';

const InputBox = ({ label, type, name, minLength, maxLength, autoComplete }) => (
    <div className="input-box">
        <input
            required
            name={name}
            type={type}
            id={name}
            autoComplete={autoComplete}
            minLength={minLength}
            maxLength={maxLength}
        />
        <label htmlFor={name}>{label}</label>
    </div>
);

const Signup = ({ handlePopupOpen, handlePopupClose }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted");
    };

    return (
        <div className="sign" onClick={handlePopupClose}>
            <form onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
                <div className="box">
                    <span className="close" onClick={handlePopupClose}>&times;</span>
                    <h1>สมัครสมาชิก</h1>
                    <InputBox
                        label="ชื่อผู้ใช้"
                        type="text"
                        name="username"
                        maxLength="50"
                        autoComplete="on"
                    />
                    <InputBox
                        label="อีเมล"
                        type="email"
                        name="email"
                        maxLength="50"
                        autoComplete="email"
                    />
                    <InputBox
                        label="เบอร์มือถือ"
                        type="tel"
                        name="phone"
                        minLength="10"
                        maxLength="10"
                        autoComplete="tel"
                    />
                    <InputBox
                        label="รหัสผ่าน"
                        type="password"
                        name="password"
                        maxLength="30"
                        autoComplete="current-password"
                    />
                    <InputBox
                        label="ยืนยันรหัสผ่าน"
                        type="password"
                        name="password_confirm"
                        maxLength="30"
                        autoComplete="new-password"
                    />
                    <button className="btn" type="submit">สร้างสมาชิก</button>
                    <div onClick={() => { handlePopupOpen(); handlePopupClose(); }}>
                        เข้าสู่ระบบ คลิก
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Signup;
