import React from 'react';
import styles from './Box.module.css';

const Box = ({children, size}) => {

    return (
        <div className={`${styles.Box} ${styles[size]}`}>
            {children}
        </div>
    );
}

export default Box;
