import React from 'react'
import styles from './styles.module.css'
import { Link } from 'react-router-dom';

const Cards = ({ title, count, Icon, url, color = "yellow" }) => {
    return (

        <Link to={url} className={styles.url}>
            <div className={styles.cards}>
                <div className={`${styles.icons} ${styles[color]}`}>
                    <Icon />
                </div>
                <div className={styles.text}>
                    <h3>{count}</h3>
                    <h5>{title}</h5>
                </div>
            </div>
        </Link>
    )
};

export default Cards;