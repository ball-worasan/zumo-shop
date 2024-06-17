import React from 'react';
import { Link } from 'react-router-dom';

const Slideimage = ({ slide: { path, link, label } }) => {
    const img = (`src/${path}`);
    return (
        <Link to={link}>
            <div>
                <img src={require(img)} alt={label} />
            </div>
        </Link>
    );
}

export default Slideimage;
