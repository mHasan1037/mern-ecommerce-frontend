import React from "react";
import styles from "./ConfirmButton.module.css";

interface ConfirmButtonProps {
  buttonText: String;
  type?: "button" | "submit" | "reset";
  onclick?: React.MouseEventHandler<HTMLButtonElement>;
}

const ConfirmButton: React.FC<ConfirmButtonProps> = ({
  buttonText,
  type = "button",
  onclick,
}) => {
  return (
    <button type={type} className={styles.buttonStyle} onClick={onclick}>
      {buttonText}
    </button>
  );
};

export default ConfirmButton;
