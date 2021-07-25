import React from 'react';
import styles from './Button.module.css';
//import {FaRegEdit} from 'react-icons/fa';
import {RiDeleteBinLine} from 'react-icons/ri';

import {FaRegEdit} from 'react-icons/fa';

const Button = (props) => {

    return (
        <div className={styles.Button}>
            <button
                onClick={props.onClick}
                type={props.type}
                value={props.value}
                onMouseDown={props.onMouseDown}
                onMouseUp={props.onMouseUp}
                className={`${props.className} ${props.style ? styles[props.style] : styles.default}`}
            >{props.styleIcon === 'save' ?<FaRegEdit className={'icon-left icon-white'}/> : props.styleIcon === 'delete' ? <RiDeleteBinLine className={'icon-left icon-white'} /> : null}{props.children}</button>
        </div>
    );
}

export default Button;
