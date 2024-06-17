import React, { useState, useEffect, createContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { fetchData } from './services/api';

import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Signin from './components/signin/Signin';
import Signup from './components/signup/Signup';

export const ManageContext = createContext();

const MainApp = ({ children }) => {
    const [manage, setManage] = useState({
        signin: false,
        signup: false,
        mobile: window.innerWidth < 991,
        user: null,
    });

    useEffect(() => {
        const handleResize = () => {
            setManage((prevManage) => ({
                ...prevManage,
                mobile: window.innerWidth < 991,
            }));
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const location = useLocation();

    return (
        <ManageContext.Provider value={{ location, Link, manage, setManage, fetchData }}>
            <header id="app-header">
                <Navbar />
            </header>
            <main id="app-main">
                {children}
            </main>
            <footer id="app-footer">
                <Footer />
            </footer>

            {manage.signin && (
                <Signin
                    handlePopupOpen={() => setManage(prev => ({ ...prev, signup: true }))}
                    handlePopupClose={() => setManage(prev => ({ ...prev, signin: false }))}
                />
            )}
            {manage.signup && (
                <Signup
                    handlePopupOpen={() => setManage(prev => ({ ...prev, signin: true }))}
                    handlePopupClose={() => setManage(prev => ({ ...prev, signup: false }))}
                />
            )}

        </ManageContext.Provider>
    );
};

export default MainApp;
