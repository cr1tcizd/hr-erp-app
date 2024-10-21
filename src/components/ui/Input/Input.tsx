import React from "react";
import styles from "./input.module.scss";
import { UseFormRegister } from "react-hook-form";
import { MyForm } from "@/components/CreateContractForm/CreateContractForm";

interface inputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegister<MyForm>;
  registerName: keyof MyForm;
}

const Input = ({ children, register, registerName, ...props }: inputProps) => {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.inputContainer_heading} htmlFor={props.id}>
        {children}
      </label>
      <input
        {...props}
        {...(register ? register(registerName) : null)}
        className={styles.inputContainer_input}
        id={props.id}
        required
      />
    </div>
  );
};

export default Input;
