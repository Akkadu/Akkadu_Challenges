import React from "react";
import styles from './style.module.css'
const InputFeild = ({innerLabel,customStyle,onChangeHandler,inputValue}) => {
  return <input type="text" value={inputValue}  onChange={event => onChangeHandler(event.target.value)} className={`${styles.inputFeild} ${customStyle}`} placeholder={innerLabel} />;
};
export default InputFeild;
