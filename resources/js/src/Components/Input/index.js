import React, {useState} from 'react';

import styles from './Input.module.css';
import Message from "../Message";

const Input = (props) => {



    return (
        <div className={styles.Input}>

            <div className={styles.labels}>
                <label htmlFor={props.id}>{props.label} {props.required && !props.notAsterisk? '*' : null}</label>
                <label>{props.maxLength ? `(${props.maxLength - props.value.length}/${props.maxLength})` : null}</label>
            </div>

            <input
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                type={props.type}
                required={props.required}
                placeholder={props.placeholder}
                /*
                id={props.id}
                min={props.min}
                max={props.max}
                minLength={props.minLength}
                maxLength={props.maxLength}
                onBlur={props.onBlur}

                defaultChecked={props.defaultChecked}
                checked={props.checked}
                mask={props.mask}
                disabled={props.disabled}*/
            />
        </div>
    );
}

export default Input;
