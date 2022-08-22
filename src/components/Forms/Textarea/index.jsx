import React from 'react';
import styles from '../styles.module.css'

const Textarea = ({ onChange, value, title, required = false, readOnly = false, size = styles.child, }) => {
    return <div className={`${styles.InputContainer} ${size}`}>
        <label>{title}</label>
        <textarea
            onChange={onChange}
            value={value}
            placeholder={title}
            required={required}
            readOnly={readOnly}
        ></textarea>
    </div>;
};

export default Textarea;
