import React, { useState, useEffect, createContext, useContext } from 'react';
import { ManageContext } from '../MainApp';
import Announcement from '../components/common/announce/Announcement';
import CustomSidebar from '../components/specific/sidebar/Sidebar';
import Showshop from '../components/specific/showshop/Showshop';
import Details from '../components/specific/details/Details';
import Buyorder from '../components/specific/order/Buyorder';
import productsData from '../utils/products';
import sidebarData from '../utils/sidebar';
import '../styles/shop.css';

export const ShopContext = createContext();

const Shop = () => {
    const { location, manage, fetchData } = useContext(ManageContext);
    const [shop, setShop] = useState({
        value: '',
        tag: '',
        id: '',
        order: '',
        toggled: false,
    });

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const game = params.get('game') || '';
        const tag = params.get('tag') || '';
        const id = params.get('id') || '';
        setShop({ value: game, tag: tag, id: id, toggled: false });
    }, [location.search]);

    const updateURLParams = (params) => {
        const url = new URL(window.location.href);
        Object.entries(params).forEach(([key, value]) => {
            if (value) {
                url.searchParams.set(key, value);
            } else {
                url.searchParams.delete(key);
            }
        });
        window.history.replaceState({}, document.title, url.toString());
    };

    const handleClearClick = () => {
        setShop({ value: '', tag: '', id: '', order, buyorder: false, toggled: false });
        updateURLParams({ game: '', tag: '', id: '' });
    };

    const handleCopyUrl = async () => {
        const url = new URL(window.location.href);
        if (shop.value) url.searchParams.set('game', shop.value);
        if (shop.tag) url.searchParams.set('tag', shop.tag);
        if (shop.id) url.searchParams.set('id', shop.id.uid);

        const urlString = url.toString();

        try {
            await navigator.clipboard.writeText(urlString);
            alert('URL ถูกคัดลอกแล้ว');
        } catch (err) {
            try {
                const textArea = document.createElement('textarea');
                textArea.value = urlString;
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand('copy');
                alert('URL ถูกคัดลอกแล้ว');
            } catch (err) {
                alert('เกิดข้อผิดพลาดในการคัดลอก URL');
            }
        }
    };

    return (
        <div className="shop">
            <ShopContext.Provider value={{ handleClearClick, updateURLParams, shop, setShop }}>
                <section>
                    <div className="announce">
                        <Announcement />
                    </div>
                </section>
                {!shop.id ? (
                    <div className="shop-content">
                        <CustomSidebar handleCopyUrl={handleCopyUrl} sidebarData={sidebarData} />
                        <Showshop productsData={productsData} sidebarData={sidebarData} />
                    </div>
                ) : (
                    <div className="shop-details">
                        <Details handleCopyUrl={handleCopyUrl} productsData={productsData} />
                    </div>
                )}
                {(manage.user && shop.order) && (
                    <Buyorder order={shop.order} handleClose={() => setShop(prev => ({ ...prev, order: null }))} />
                )}
            </ShopContext.Provider >
        </div >
    );
};

export default Shop;
