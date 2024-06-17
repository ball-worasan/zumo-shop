import React, { useState, useEffect, useContext } from 'react';
import { ManageContext } from '../../../MainApp';
import Marquee from "react-fast-marquee";
import './announcement.css';

const Announcement = () => {
    const { fetchData } = useContext(ManageContext);
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const data = await fetchData('v1/announcements');
                setAnnouncements(data);
            } catch (error) {
                console.error('Failed to fetch announcements:', error);
            }
        };

        fetchAnnouncements();
    }, [fetchData]);

    return (
        <div className="announcement">
            <Marquee speed={60} autoFill pauseOnHover>
                {announcements.map((announcement, index) => (
                    <div className="announcement-text" key={index}>
                        <span>{announcement.text}</span>
                    </div>
                ))}
            </Marquee>
        </div>
    );
};

export default Announcement;
