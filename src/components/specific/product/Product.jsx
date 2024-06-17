import React, { useContext } from 'react';
import classNames from 'classnames';
import { ManageContext } from '../../../MainApp';
import { ShopContext } from '../../../pages/Shop';

const Product = ({ product, Button }) => {
    const { manage, setManage } = useContext(ManageContext);
    const { updateURLParams, setShop } = useContext(ShopContext);

    const getBoxClass = () => {
        if (product.price >= 100 && product.price <= 299) return 'one';
        if (product.price >= 300 && product.price <= 999) return 'two';
        if (product.price >= 1000) return 'three';
        return 'none';
    };

    const getStatusMessage = () => {
        switch (product.sold) {
            case null:
                return 'ยังมีสินค้าอยู่✅';
            case true:
                return 'ขายออกแล้ว❌';
            case 'reserve':
                return 'กำลังทำรายการ❗️';
            default:
                return 'สินค้าผิดพลาด❌';
        }
    };

    const productStartDate = new Date(product.sale_start);
    const productEndDate = new Date(product.sale_end);

    const price = () => {
        if (product.sale && productStartDate <= new Date() && productEndDate >= new Date()) {
            return (
                <span style={{ fontSize: '1.2rem', color: 'red' }}>
                    <div style={{ textDecoration: 'line-through' }}>{product.price}</div>
                    <div style={{ fontSize: '1.6rem', color: '#fff' }}>{product.price - product.sale} ฿</div>
                </span>
            );
        }
        return <span>{product.price} ฿</span>;
    };

    const profile = 'src/' + product.profile

    return (
        <div className="product">
            <div className={classNames('card', getBoxClass())}>
                <div className="box">
                    <span className="span"></span>
                    <div className="box-image">
                        <img src={require(profile)} alt={product.order_id} />
                    </div>
                    <div className="box-head">
                        <h2>ID : {product.label} | {price()}</h2>
                    </div>
                    <h2>Order : {product.order_id}</h2>
                    <h2>Status : {getStatusMessage()}</h2>
                    <div className="button">
                        <Button size="large" variant="contained"
                            onClick={() => {
                                setShop(prev => ({ ...prev, id: product.uid }));
                                updateURLParams({ id: product.uid });
                            }}
                        >
                            รายละเอียด
                        </Button>
                        {!!manage.user && product.sold === null ? (
                            <Button size="large" variant="outlined"
                                onClick={() => {
                                    setShop(prev => ({ ...prev, order: product }));
                                }}
                            >
                                สั่งซื้อสินค้า
                            </Button>
                        ) : (
                            <Button size="large" className="cl-button" variant="contained" color="error" onClick={() => setManage(prev => ({ ...prev, signin: true }))}>
                                กรุณาเข้าสู่ระบบ
                            </Button>
                        )}
                    </div>
                </div>
                {product.sold === true && <div className="sold-out">ขายออกแล้ว</div>}
            </div>
        </div>
    );
};

export default Product;
