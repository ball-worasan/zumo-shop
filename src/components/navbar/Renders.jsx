import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Renders = ({ item, user, setNavbar, setManage }) => {
    const location = useLocation();
    const isLinkActive = (link) => location.pathname === link ? 'active' : '';

    const handlePopupOpen = (type) => {
        setManage((prev) => ({ ...prev, [type]: true }));
    };

    let login = user ? 1 : 2;

    return (
        <>
            {(item.navbar_type === 'center' || (item.navbar_type === 'end' && login === item.login_required)) && (
                <>
                    {item.label === 'เข้าสู่ระบบ' || item.label === 'สมัครสมาชิก' ? (
                        <div
                            onClick={() => {
                                setNavbar(prev => ({ ...prev, active: false }));
                                handlePopupOpen(item.label === 'เข้าสู่ระบบ' ? 'signin' : 'signup');
                            }}
                            className="text"
                        >
                            <i className={item.icon}></i>
                            <span>{item.label}</span>
                        </div>
                    ) : (
                        <Link
                            to={item.link}
                            onClick={() => setNavbar(prev => ({ ...prev, active: false }))}
                            className={`text ${isLinkActive(item.link)}`}
                        >
                            <i className={item.icon}></i>
                            <span>{item.label}</span>
                        </Link>
                    )}
                </>
            )
            }
        </>
    );
};

export default Renders;
