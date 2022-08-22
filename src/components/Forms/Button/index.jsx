import React from 'react';
import styles from '../styles.module.css'

const Button = ({ onClick, type, title, size = styles.child, color = `pink` }) => {
    return <div className={`${styles.InputContainer} ${size}`}>
        <button
            type={type}
            onClick={onClick}
            className={`${styles[color]}`}
        >{title}</button>

    </div>;
};

export default Button;
