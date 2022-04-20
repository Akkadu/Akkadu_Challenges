import React from "react";
import { Button, InputFeild } from "../../Atoms";
import styles from "./style.module.css"
const AddReviewFeild = (props) => {
  const {
    inputStyle,
    innerLabel,
    onChangeHandler,
    inputValue,
    clickHandler,
    buttonStyle,
    label,
  } = props;
  return (
    <div className={styles.addReviewDiv}>
      <InputFeild
        customStyle={inputStyle}
        innerLabel={innerLabel}
        onChangeHandler={onChangeHandler}
        inputValue={inputValue}
      />
      <Button
        clickHandler={clickHandler}
        customStyle={buttonStyle}
        label={label}
      />
    </div>
  );
};

export default AddReviewFeild;
