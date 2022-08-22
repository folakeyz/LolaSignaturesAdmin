import React, { useState } from 'react'
import styles from './styles.module.css'
import { Link } from 'react-router-dom'
import { FaHome, FaClipboardList, FaUser, FaGifts } from "react-icons/fa";
import logo from '../../assets/lola.png'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/userActions';
import { AiOutlineAppstore, AiOutlineClose } from 'react-icons/ai'

const Navigation = () => {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        dispatch(logout())
    }
    const [mtoggle, setMToggle] = useState(false)
    return (
        <>
            <div className={styles.bar}>{mtoggle ? <AiOutlineClose onClick={() => setMToggle(false)} /> : <AiOutlineAppstore onClick={() => setMToggle(true)} />}</div>
            <div className={mtoggle ? styles.navMobile : styles.navigation}>
                <div className={styles.logo}>
                    <img src={logo} alt="logo" />
                </div>
                <div className={styles.links}>
                    <ul>
                        <li><Link to="/"><FaHome />Dashboard</Link></li>
                        <li><Link to="/product"><FaGifts />Products</Link></li>
                        <li><Link to="/category"><FaClipboardList />Category</Link></li>
                        <li><Link to="/admin"><FaUser />Add Admin</Link></li>
                        <li><Link to="/orders"><FaUser />Orders</Link></li>
                        <li><Link to="/users"><FaUser />Customers</Link></li>
                        <li><Link to="/delivery"><FaUser />Delivery</Link></li>
                        <li><Link to="/testimony"><FaUser />Testimony</Link></li>
                        <li><Link to="/#" onClick={logoutHandler}><FaUser />Logout</Link></li>

                    </ul>

                </div>
            </div>
        </>
    )
}

export default Navigation
