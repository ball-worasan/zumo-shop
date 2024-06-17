import React from 'react';
import { Link } from 'react-router-dom';

const MenuBox = ({ item }) => (
    <>
        {item.type === "service" ? (
            <div className="service-item">
                <h3>{item.title} <span>{item.subtitle}</span></h3>
            </div>
        ) : (
            <Link to={item.link} className={item.type}>
                {item.type === 'box' ? (
                    <i className={item.icon}></i>
                ) : (
                    <img src={item.icon} alt={item.title} />
                )}
                <h3>{item.title}</h3>
            </Link>
        )}
    </>
);

export default MenuBox;
