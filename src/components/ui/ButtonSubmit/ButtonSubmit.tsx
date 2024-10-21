import React, { ReactNode } from "react";
import styles from "./buttonSubmit.module.scss";

interface ButtonSubmitProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const ButtonSubmit = ({ children, ...props }: ButtonSubmitProps) => {
  return (
    <button className={styles.btn} {...props}>
      {children}
    </button>
  );
};

export default ButtonSubmit;
