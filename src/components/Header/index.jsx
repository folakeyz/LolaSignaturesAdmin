import React from 'react'
import styles from './styles.module.css'


const Header = ({ title, }) => {
    return (
        <div className={styles.topNavigation}>
            <h5>{title}</h5><br />

        </div>
    )
}

export default Header
