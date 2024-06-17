import React, { useState, useEffect, useContext } from 'react';
import { ManageContext } from '../../MainApp';
import Renders from './Renders';
import './navbar.css';

const Navbar = () => {
    const { Link, manage, setManage, fetchData } = useContext(ManageContext);
    const [navbar, setNavbar] = useState({
        active: false,
        data: null
    });

    useEffect(() => {
        const handleScroll = () => setNavbar(prevNavbar => ({ ...prevNavbar, active: false }));
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const fetchNavbarData = async () => {
            try {
                const data = await fetchData('v1/navbar/data');
                setNavbar(prevNavbar => ({ ...prevNavbar, data: data }));
            } catch (error) {
                console.error('Error fetching navbar data:', error);
            }
        };
        fetchNavbarData();
    }, [fetchData]);

    const renderElements = (conditionFunc) => {
        if (!navbar || !navbar.data) {
            return null;
        }

        return navbar.data.filter(conditionFunc).map((item, index) => (
            <Renders
                key={index}
                item={item}
                user={!!manage.user}
                setNavbar={setNavbar}
                setManage={setManage}
            />
        ));
    };

    // Example usage of renderElements
    const centerElements = renderElements(item => item.navbar_type === 'center' && item.is_active === 1);
    const endElements = renderElements(item => item.navbar_type === 'end' && item.is_active === 1);

    return (
        <section className="flex">
            <div className="brand">
                <Link to="/" onClick={() => setNavbar(prevNavbar => ({ ...prevNavbar, active: false }))} className="text" >
                    <img src="/icon.png" alt="LOGO" />
                </Link>
            </div>

            <div className={`center ${navbar.active ? 'active' : ''}`}>
                {centerElements}
                {manage.mobile && (
                    <div className="br">
                        {endElements}
                    </div>
                )}
            </div>

            {
                !manage.mobile && (
                    <div className={`end ${navbar.active ? 'active' : ''}`}>
                        {endElements}
                    </div>
                )
            }

            <div className="menu btn" onClick={() => setNavbar(prevNavbar => ({ ...prevNavbar, active: !prevNavbar.active }))}>
                <span className="text-menu">เมนู</span>
                <span className="icon">
                    <div id="menu-btn" className={`fa-solid ${navbar.active ? 'fa-times' : 'fa-bars-staggered'}`}></div>
                </span>
            </div>
        </section >
    );
};

export default Navbar;
