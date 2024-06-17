import React, { useState, useEffect, useContext } from 'react';
import { ManageContext } from '../MainApp';
import '../styles/howtopay.css';

const Howtopay = () => {
    const { fetchData } = useContext(ManageContext);
    const [steps, setSteps] = useState([]);

    useEffect(() => {
        const fetchDataFromAPI = async () => {
            try {
                const steps = await fetchData('v1/payment_steps');
                setSteps(steps);
            } catch (error) {
                console.error('Failed to fetch slide images or menu:', error);
            }
        };

        fetchDataFromAPI();
    }, [fetchData]);

    return (
        <section className="howtopay">
            <div className="choice">
                <header className="head-choice">
                    <h2>วิธีชำระเงิน <span>PAYMENT METHOD</span></h2>
                </header>
                <div className="box-container">
                    {steps.map((step, index) => (
                        <div key={index} className="box border">
                            <i className={`fa-solid ${step.icon}`}></i>
                            <h3>{step.title}</h3>
                            <p>{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="choice">
                <header className="head-choice">
                    <h2>วิธีสั่งซื้อ <span>ORDER PROCESS</span></h2>
                </header>
                <ol>
                    <li>เลือก/สั่งซื้อสินค้าผ่านหน้าเว็บไซต์</li>
                    <li>ชำระจ่ายด้วยวิธีการโอนเงินผ่าน บัญชีธนาคาร หรือ บัญชี True Money Wallet
                        <ul>
                            <li>(กรุณาชำระยอดให้ตรงกับค่าบริการเพื่อความสะดวก)</li>
                        </ul>
                    </li>
                    <li>เมื่อทำรายการชำระเงินสำเร็จ ลูกค้ากดเข้าที่เมนู โปรไฟล์ &gt; ประวัติการซื้อ &gt; แชท เพื่อรับสินค้าที่ลูกค้าทำรายการ</li>
                    <li>ทำรายการสำเร็จหากมีข้อสงสัยหรือปัญหาด้านใดติดต่อได้ที่ Fanpage FB ที่หน้าเว็บไซต์</li>
                </ol>
            </div>
        </section>
    );
};

export default Howtopay;
