import React from 'react';
import styles from './System.module.css';
import User from './User';
import Sidebar from "../../Components/Layout/Sidebar";


const System = () => {
    return (
        <div className={styles.System}>
            <div>
                <Sidebar/>
                <User/>
            </div>
        </div>
    );
}
export default System;
