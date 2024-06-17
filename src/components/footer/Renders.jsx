
import React from 'react';
import { Link } from 'react-router-dom';

const Renders = ({ item }) => {
    const isExternalLink = item.footer_id === 3 || item.footer_id === 4;
    const linkProps = isExternalLink
        ? { href: item.link, target: "_blank", rel: "noopener noreferrer" }
        : { to: item.link };

    return (
        <>
            {isExternalLink ? (
                <a {...linkProps}>
                    <i className={item.icon}></i> {item.label}
                </a>
            ) : (
                <Link {...linkProps}>
                    <i className={item.icon}></i> {item.label}
                </Link>
            )}
        </>
    );
};

export default Renders;