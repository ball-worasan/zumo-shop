import React, { useState, useEffect } from 'react';
import { Button, Alert } from '@mui/material';
import Announcement from '../components/common/announce/Announcement';
import promptpay from '../assets/images/promptpay.png';
import '../styles/topup.css';

const Topup = () => {
    const [topup, setTopup] = useState({
        topupValue: 0,
        codeValue: 'zumo-shop',
        slipLabel: 'อัพโหลดสลิปโอนเงิน',
        popup: false
    });
    const [topupHistory, setTopupHistory] = useState([]);
    const [alert, setAlert] = useState(false);
    const [codeError, setCodeError] = useState(false);
    const validCodes = {
        'zumo-shop': 100,
        'another-code': 50,
        'some-code': 30
    };

    useEffect(() => {
        if (alert || codeError) {
            const timer = setTimeout(() => {
                setAlert(false);
                setCodeError(false);
            }, 3000); // 3 seconds

            return () => clearTimeout(timer);
        }
    }, [alert, codeError]);

    const handleSlipChange = (event) => {
        const fileName = event.target.files[0]?.name || 'อัพโหลดสลิปโอนเงิน';
        setTopup(prev => ({ ...prev, slipLabel: fileName }));
    };

    const handleTopupSubmit = (event) => {
        event.preventDefault();
        if (topup.topupValue >= 10) {
            setTopup(prev => ({ ...prev, popup: true }));
            // setTopupHistory(prevHistory => [
            //     ...prevHistory,
            //     {
            //         datetime: new Date().toLocaleString(),
            //         topupBy: 'topup',
            //         creditAmount: topup.topupValue,
            //         status: 'อยู่ระหว่างดำเนินการ'
            //     }
            // ]);
            setAlert(false);
        } else {
            setAlert(true);
        }
    };

    const handleCodeSubmit = (event) => {
        event.preventDefault();
        if (validCodes[topup.codeValue]) {
            const rewardPoints = validCodes[topup.codeValue];
            setTopupHistory(prevHistory => [
                ...prevHistory,
                {
                    datetime: new Date().toLocaleString(),
                    topupBy: topup.codeValue,
                    creditAmount: rewardPoints,
                    status: 'อยู่ระหว่างดำเนินการ'
                }
            ]);
            setCodeError(false);
        } else {
            setCodeError(true);
        }
    };

    const renderForm = (label, value, onChange, handleSubmit, type = 'number', min = 0) => (
        <form onSubmit={handleSubmit}>
            <label htmlFor={label}>{label.toUpperCase()}</label>
            <div className="field">
                <i className="fa-solid fa-circle-dollar-to-slot input-icon"></i>
                <input
                    placeholder={`กรุณาใส่${label}`}
                    className="input-field"
                    type={type}
                    inputMode="numeric"
                    required
                    min={min}
                    value={value}
                    onChange={onChange}
                />
            </div>
            <div className="button">
                <button type="submit" className="btn">ยืนยัน</button>
            </div>
        </form>
    );

    const renderTopupHistory = () => (
        <div className="choice" id="choice-record">
            <div className="head-choice">
                <h2>ประวัติการเติม <span>RECORD TOPUP</span></h2>
            </div>
            <div className="record">
                <div className="options">
                    <select id="page">
                        <option value="10">10</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                    <select id="type">
                        <option value="all">ทั้งหมด</option>
                        <option value="ทำรายการสำเร็จ">ทำรายการสำเร็จ</option>
                        <option value="ทำรายการไม่สำเร็จ">ทำรายการไม่สำเร็จ</option>
                        <option value="อยู่ระหว่างดำเนินการ">อยู่ระหว่างดำเนินการ</option>
                    </select>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>วันที่เวลา</th>
                            <th>เติมด้วย</th>
                            <th>ยอดเครดิต</th>
                            <th>สถานะ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topupHistory.map((item, index) => (
                            <tr key={index}>
                                <td>{item.datetime}</td>
                                <td>{item.topupBy}</td>
                                <td>{item.creditAmount}</td>
                                <td>{item.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div className="topup">
            <section>
                <div className="announce">
                    <Announcement />
                </div>
            </section>

            <section className="flex">
                <div className="choice">
                    <div className="head-choice">
                        <i className="fa-solid fa-circle-dollar-to-slot"></i>
                        <h2>เติมเครดิต <span>TOPUP</span></h2>
                    </div>

                    {alert && (
                        <div style={{ marginBottom: '1rem' }}>
                            <Alert style={{ fontSize: '1.6rem' }} severity="info">
                                จำนวนเงินต้องมากกว่า 10 บาท
                            </Alert>
                        </div>
                    )}

                    {codeError && (
                        <div style={{ marginBottom: '1rem' }}>
                            <Alert style={{ fontSize: '1.6rem' }} severity="error">
                                โค้ดไม่ถูกต้องหรือหมดอายุแล้ว
                            </Alert>
                        </div>
                    )}

                    <div className="box-container">
                        {renderForm('topup', topup.topupValue, (e) => setTopup(prev => ({ ...prev, topupValue: e.target.value })), handleTopupSubmit)}
                        {renderForm('code', topup.codeValue, (e) => setTopup(prev => ({ ...prev, codeValue: e.target.value })), handleCodeSubmit, 'text')}
                    </div>
                </div>

                {renderTopupHistory()}
            </section>

            {topup.popup && (
                <div className="topupPopup">
                    <form>
                        <div className="box">
                            <span className="close" onClick={() => setTopup(prev => ({ ...prev, popup: false }))}>&times;</span>
                            <div className="head">
                                <div className="title">QR Code สำหรับการโอนเงิน</div>
                                <p className="message">สแกน QR Code เพื่อทำการโอนเงิน</p>
                            </div>
                            <div className="alert">
                                <i className="fa-solid fa-circle-exclamation"></i>
                                <h3>
                                    หลังทำรายการ รอการยืนยัน 2-5 นาที🙏🏻
                                    <span>
                                        รอการตอบกลับจากแอดมิน ผ่านช่องทาง Inbox FB
                                        <br />
                                        กรุณาทำการในเวลา 08.00 - 00.00 เพื่อความสะดวกครับ / ค่ะ
                                    </span>
                                </h3>
                            </div>
                            <div className="img">
                                <img src={promptpay} className="promptpay" alt="PromptPay QR Code" />
                                <img src={`https://promptpay.io/0990699910/${topup.topupValue}.png`} alt="Topup QR Code" />
                                <h2>จำนวน {topup.topupValue} บาท</h2>
                            </div>
                            <label htmlFor="slip" className="custum-file-upload">
                                <div className="text">
                                    <span id="slip-label">
                                        <i className="fa-solid fa-arrow-up-from-bracket"></i> {topup.slipLabel}
                                    </span>
                                </div>
                                <input
                                    id="slip"
                                    className="input-field"
                                    type="file"
                                    name="slip"
                                    accept=".png, .jpg, .jpeg"
                                    onChange={handleSlipChange}
                                    required
                                />
                            </label>
                            <div className="button">
                                <div>
                                    <Button
                                        size="large"
                                        variant="contained"
                                        type="submit"
                                    >
                                        ยืนยันและส่งสลิป
                                    </Button>
                                    <p>-</p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Topup;
