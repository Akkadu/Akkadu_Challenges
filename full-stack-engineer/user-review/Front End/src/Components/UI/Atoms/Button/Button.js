import React from 'react'
import styles from './styles.module.css'
const Button = ({label,clickHandler,customStyle}) => {
    return <button onClick={clickHandler} className={`${styles.primrayButton} ${customStyle}`}>{label}</button>
}
export default Button