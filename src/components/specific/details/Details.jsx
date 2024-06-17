import React, { useContext } from 'react';
import { ManageContext } from '../../../MainApp';
import { ShopContext } from '../../../pages/Shop';
import { Alert, Grid, Box, Button } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './details.css';

const Details = ({ handleCopyUrl, productsData }) => {
    const { manage, setManage } = useContext(ManageContext);
    const { shop, setShop } = useContext(ShopContext);

    if (!productsData) {
        return <div>Loading...</div>;
    }

    const getProduct = (uid) => {
        const product = productsData.find(p => p.data.uid === uid && p.condition);
        return product ? product.data : null;
    };

    const product = getProduct(shop.id);

    if (!product) {
        return <div>Product not found.</div>;
    }

    const handleBackClick = () => {
        setShop(prev => ({ ...prev, id: '' }));
        const url = new URL(window.location.href);
        url.searchParams.delete('id');
        window.history.replaceState({}, document.title, url.toString());
    };

    const imgSrc = ('src/' + product.profile);
    const imagesArray = product?.photo?.split(', ') || [];
    const productStartDate = new Date(product.sale_start);
    const productEndDate = new Date(product.sale_end);

    const price = product.sale && productStartDate <= new Date() && productEndDate >= new Date() ? (
        <span className="price-sale">
            <div className="price-original">{product.price} ฿</div>
            <div className="price-discount">{product.price - product.sale} ฿</div>
        </span>
    ) : (
        <span>{product.price} ฿</span>
    );

    return (
        <div className="details-container">
            <Grid container={!manage.mobile} spacing={2}>
                <Grid item xs={2}>
                    <Box className="button-container">
                        <Button size="large" className="cl-button" variant="contained" onClick={handleBackClick}>
                            ย้อนกลับ
                        </Button>
                        <Button size="large" className="cl-button" variant="contained" onClick={handleCopyUrl}>
                            คัดลอก URL
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box className="product-info-box">
                        <img src={require(imgSrc)} alt={product.order_id} className="product-image" />
                        <div className="product-details">
                            <h2>{product.label}</h2>
                        </div>
                    </Box>
                    <Box className="product-info-box">
                        <h1 className="details-header">รายละเอียด</h1>
                        <h2>ลงสินค้าเมื่อ: {new Date(product.create_time).toLocaleDateString()}</h2>
                        <h2>ประเภท: {product.type}</h2>
                        <h2>{product.details}</h2>
                        <h2>หมายเหตุ: กรุณาเปลี่ยนรหัสทันทีหลังได้รับสินค้า</h2>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box className="carousel-box">
                        <Carousel
                            showStatus={false}
                            infiniteLoop
                            showThumbs={false}
                            useKeyboardArrows
                            autoPlay
                            dynamicHeight
                            emulateTouch
                            autoFocus
                            interval={5000}
                        >
                            {imagesArray.map((slide, index) => {
                                const image = ('src/assets/images/products/product_all/' + product.order_id + '/' + slide)
                                return (
                                    < div key={index} >
                                        <img src={require(image)} alt={product.order_id} className="carousel-image" />
                                    </div>
                                )
                            })}
                        </Carousel>
                    </Box>
                    <Box className="order-box">
                        <h1>สั่งซื้อสินค้า</h1>
                        <div className="alert"
                            style={{ margin: '2rem 3rem' }}
                        >
                            <Alert severity="warning">โปรดระวัง ! หลังจากทำรายจะไม่สามารถยกเลิกหรือขอคืนเงินได้</Alert>
                        </div>
                        <div className="order-details">
                            <div>
                                <h2>ราคา {price}</h2>
                                <h2>ส่วนลด {product.sale || 0} ฿</h2>
                            </div>
                            {manage.user ? (
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
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};

export default Details;
