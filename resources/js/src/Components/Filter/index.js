import React from 'react';
import styles from './Filter.module.css';

const Filter = ({children}) => {

    return (
        <div className={styles.Filter}>
            {children}
        </div>
    );
}

export default Filter;
