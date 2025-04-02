import React from 'react'
import styles from './ConfirmButton.module.css';

interface ConfirmButtonProps {
    buttonText: String;
    type?: "button" | "submit" | "reset";
}

const ConfirmButton: React.FC<ConfirmButtonProps> = ({ buttonText, type = "button" }) => {
  return (
    <button type={type} className={styles.buttonStyle}>{buttonText}</button>
  )
}

export default ConfirmButton