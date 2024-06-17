import React, { useState, useContext } from 'react';
import { Button } from '@mui/material';
import { ManageContext } from '../../../MainApp';
import promptpay from '../../../assets/images/promptpay.png';
import './buyorder.css';

const Buyorder = ({ order, handleClose }) => {
    const { manage, setManage } = useContext(ManageContext);
    const [slipLabel, setSlipLabel] = useState('อัพโหลดสลิปโอนเงิน');

    const handleSlipChange = (event) => {
        const fileName = event.target.files[0]?.name || 'อัพโหลดสลิปโอนเงิน';
        setSlipLabel(fileName);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log('Form submitted');
    };

    return (
        <div className="buy_order" onClick={handleClose}>
            <form onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
                <div className="box">
                    <span className="close" onClick={handleClose}>&times;</span>
                    <div className="head">
                        <div className="title">QR Code สำหรับการโอนเงิน</div>
                        {order ? (
                            <p className="message">สแกน QR Code เพื่อซื้อ <span>{order.order_id}</span> </p>
                        ) : (
                            <p className="message">ไม่พบข้อมูลการสั่งซื้อ</p>
                        )}
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
                    {order && (
                        <div className="img">
                            <img src={promptpay} className="promptpay" alt="PromptPay QR Code" />
                            <img src={`https://promptpay.io/0990699910/${order.price}.png`} alt="Topup QR Code" />
                            <h2>จำนวน {order.price} บาท</h2>
                        </div>
                    )}
                    <label htmlFor="slip" className="custum-file-upload">
                        <div className="text">
                            <span id="slip-label">
                                <i className="fa-solid fa-arrow-up-from-bracket"></i> {slipLabel}
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
                        <div>
                            <Button
                                size="large"
                                variant="contained"
                                disabled={manage.user.credit < order.price}
                                color={manage.user.credit >= order.price ? 'success' : 'error'}
                                onClick={() => console.log(manage.user.credit)}
                            >
                                ชำระผ่านเครดิต
                            </Button>
                            {manage.user.credit ? (
                                <p>(เครดิตเหลือ {manage.user.credit} บาท)</p>
                            ) : (
                                <p>-</p>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Buyorder;
