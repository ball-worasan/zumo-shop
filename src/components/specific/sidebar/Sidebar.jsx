import React, { useCallback, useContext } from 'react';
import { ManageContext } from '../../../MainApp';
import { ShopContext } from '../../../pages/Shop';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Button, FormControlLabel, Radio } from '@mui/material';

const Showshop = ({ handleCopyUrl, sidebarData }) => {
    const { manage } = useContext(ManageContext);
    const { handleClearClick, updateURLParams, shop, setShop } = useContext(ShopContext);
    const { value: selectedGame, toggled } = shop;

    const handleRadioChange = useCallback((selectedGame) => {
        setShop(prev => ({ ...prev, value: selectedGame }));
        updateURLParams({ game: selectedGame });
    }, [setShop, updateURLParams]);

    const SidebarElements = useCallback(
        (conditionFunc) =>
            sidebarData.filter(conditionFunc).map((item, index) => (
                <MenuItem key={index}>
                    <FormControlLabel
                        value={item.game}
                        control={<Radio />}
                        label={item.label}
                        onChange={() => handleRadioChange(item.game)}
                        checked={selectedGame === item.game}
                    />
                </MenuItem>
            )),
        [selectedGame, sidebarData, handleRadioChange]
    );

    return (
        <Sidebar
            onBackdropClick={() => setShop(prev => ({ ...prev, toggled: false }))}
            toggled={toggled}
            breakPoint={manage.mobile ? 'all' : undefined}
            className="sidebar"
            backgroundColor="var(--background)"
        >
            <Menu>
                <div style={{ display: 'flex' }}>
                    {!manage.mobile && (
                        <Button
                            size="large"
                            className="cl-button"
                            variant="outlined"
                            onClick={handleClearClick}
                        >
                            ล้างการเลือก
                        </Button>
                    )}
                    <Button
                        size="large"
                        className="cl-button"
                        variant="contained"
                        onClick={handleCopyUrl}
                    >
                        คัดลอก URL
                    </Button>
                </div>
                {SidebarElements(item => item.condition === true)}
            </Menu>
        </Sidebar>
    );
}

export default Showshop;
