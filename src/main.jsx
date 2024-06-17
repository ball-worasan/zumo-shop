import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainApp from './MainApp';
import NotFound from './pages/NotFound';

import Home from './pages/Home';
import Shop from './pages/Shop';
import Topup from './pages/Topup';
import Gacha from './pages/Gacha';
import Howtopay from './pages/Howtopay';
import Profile from './pages/Profile';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router>
            <MainApp>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/topup" element={<Topup />} />
                    <Route path="/gacha" element={<Gacha />} />
                    <Route path="/howtopay" element={<Howtopay />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </MainApp>
        </Router>
    </React.StrictMode>
);
