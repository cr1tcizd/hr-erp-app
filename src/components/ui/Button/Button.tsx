import React from "react";
import styles from "./button.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button className={styles.btn} {...props}>
      {children}
    </button>
  );
};

export default Button;
