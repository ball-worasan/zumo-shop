import React, { useCallback, useContext } from 'react';
import { ManageContext } from '../../../MainApp';
import { ShopContext } from '../../../pages/Shop';
import { Stack, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Product from '../product/Product';

const Showshop = ({ productsData, sidebarData }) => {
    const { manage } = useContext(ManageContext);
    const { handleClearClick, updateURLParams, shop, setShop } = useContext(ShopContext);

    const tabbarElements = useCallback(() => {
        const selectedGame = sidebarData.find(item => item.game === shop.value);
        return selectedGame ? (
            selectedGame.data.map((item, index) => (
                <MenuItem
                    key={index}
                    value={item.type}
                    onClick={() => {
                        setShop(prev => ({ ...prev, tag: item.type }));
                        updateURLParams({ tag: item.type });
                    }}
                >
                    {item.label}
                </MenuItem>
            ))
        ) : (
            <MenuItem disabled>กรุณาเลือกเกมที่ต้องการซื้อ</MenuItem>
        );
    }, [shop.value, setShop, updateURLParams, sidebarData]);

    const productElements = useCallback(
        () => productsData.filter(item =>
            (!shop.value || item.game === shop.value) &&
            (!shop.tag || item.data.type === shop.tag) &&
            item.condition === true
        ).map((item, index) => (
            <Product key={index} product={item.data} Stack={Stack} Button={Button} />
        )),
        [shop.value, shop.tag, productsData, setShop]
    );

    return (
        <div className="shop-main">
            <div className="tabbar">
                {manage.mobile ? (
                    <div className="sb">
                        <div className="flex">
                            <Button
                                size="large"
                                className="sb-button"
                                variant="contained"
                                onClick={() => handleClearClick(setShop)}
                            >
                                ล้างการเลือก
                            </Button>
                            <Button
                                size="large"
                                className="sb-button"
                                variant="contained"
                                onClick={() => setShop(prev => ({ ...prev, toggled: !prev.toggled }))}
                            >
                                เลือกเกม
                            </Button>
                        </div>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                เลือกประเภทสินค้า <span className="fa-solid fa-bars-staggered"></span>
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={shop.tag}
                                label="เลือกประเภทสินค้า"
                                onChange={e => setShop(prev => ({ ...prev, tag: e.target.value }))}
                            >
                                {tabbarElements()}
                            </Select>
                        </FormControl>
                    </div>
                ) : (
                    <div className={shop.value ? "tabbar-element" : ""}>
                        {tabbarElements()}
                    </div>
                )}
            </div>
            <div className="products">
                {productElements()}
            </div>
        </div>
    );
}

export default Showshop;
