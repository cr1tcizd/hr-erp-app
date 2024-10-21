import React, { ReactNode } from "react";
import styles from "./createContractFormWrapper.module.scss";

interface CreateContractFormWrapperProps {
  title: string;
  children: ReactNode;
  step: string;
}

const CreateContractFormWrapper = ({
  title,
  children,
  step,
}: CreateContractFormWrapperProps) => {
  return (
    <>
      <div className={styles.data_heading}>
        <p className={styles.data_heading_step}>Шаг {step}</p>
        <h2 className={styles.data_heading_title}>{title}</h2>
      </div>
      {children}
    </>
  );
};

export default CreateContractFormWrapper;
