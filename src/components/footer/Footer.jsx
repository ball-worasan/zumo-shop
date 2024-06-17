import React, { useState, useEffect, useContext } from 'react';
import { ManageContext } from '../../MainApp';
import Renders from './Renders';
import './footer.css';

const Footer = () => {
    const { fetchData } = useContext(ManageContext);
    const [footers, setFooters] = useState({
        footer: [],
        footerData: [],
    });

    useEffect(() => {
        const fetchDataFromAPI = async () => {
            try {
                const footerData = await fetchData('v1/footers/data');
                const footer = await fetchData('v1/footers');
                setFooters({ footer, footerData });
            } catch (error) {
                console.error('Failed to fetch footer data:', error);
            }
        };

        fetchDataFromAPI();
    }, [fetchData]);

    const renderElements = (conditionFunc) => {
        if (!footers || !footers.footerData) {
            return null;
        }

        return (
            <>
                {footers.footerData.filter(conditionFunc).map((item, index) => (
                    <Renders
                        key={index}
                        item={item}
                    />
                ))}
            </>
        );
    };

    return (
        <>
            <section className="flex">
                <div className="grid">
                    {footers.footer.map((box, index) => (
                        <div className="box" key={index}>
                            <h3>{box.title}</h3>
                            {renderElements(item => item.footer_id === box.id && item.is_active === 1)}
                        </div>
                    ))}
                </div>
            </section>
            <div className="credit">
                สร้างโดย <span>thanaporn-wo.com</span> | สงวนลิขสิทธิ์!
            </div>
        </>
    );
};

export default Footer;
