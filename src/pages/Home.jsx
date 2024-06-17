import React, { useState, useEffect, useContext } from 'react';
import { ManageContext } from '../MainApp';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Slideimage from '../components/specific/slider/Slider';
import Announcement from '../components/common/announce/Announcement';
import MenuBox from '../components/common/menubox/MenuBox';
import '../styles/home.css';

const Home = () => {
    const { fetchData } = useContext(ManageContext);
    const [homes, setHomes] = useState({
        slide: [],
        menu: []
    });

    useEffect(() => {
        const fetchDataFromAPI = async () => {
            try {
                const slide = await fetchData('v1/slideImages');
                const menu = await fetchData('v1/menuboxes');
                setHomes({ slide, menu });
            } catch (error) {
                console.error('Failed to fetch slide images or menu:', error);
            }
        };

        fetchDataFromAPI();
    }, [fetchData]);


    const renderElements = (type) => (
        homes.menu
            .filter(item => item.type === type && item.is_active === 1)
            .map((item, index) => <MenuBox key={index} item={item} />)
    );

    const Section = ({ title, subtitle, type }) => (
        <div className="choice">
            <div className="head-choice">
                <h2>{title} <span>{subtitle}</span></h2>
            </div>
            <div className="box-container">
                {renderElements(type)}
                {type === "box" && (
                    <a
                        href="https://www.facebook.com/photo/?fbid=122119630778140042&set=a.122107740422140042"
                        target="_blank"
                        className="box"
                        rel="noopener noreferrer"
                    >
                        <i className="fa-brands fa-facebook"></i>
                        <h3>แฟนเพจ</h3>
                    </a>
                )}
            </div>
        </div >
    );

    return (
        <div className="home">
            <div className="sliders">
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
                    {homes.slide.map((slide, index) => (
                        <Slideimage key={index} slide={slide} />
                    ))}
                </Carousel>
            </div>
            <section>
                <div className="announce">
                    <Announcement />
                </div>
                <Section title="เมนูแนะนำ" subtitle="RECOMMEND MENU" type="box" />
                <Section title="เมนูเกม" subtitle="MENU GAME" type="game" />
            </section>
            <div className="services">
                <section>
                    <h2>บริการของเรา</h2>
                    <div className="service">
                        {renderElements("service")}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;
