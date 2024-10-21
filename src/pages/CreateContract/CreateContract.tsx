"use client";

import React, { useState } from "react";
import styles from "./createContract.module.scss";

import CreateContractForm from "@/components/CreateContractForm/CreateContractForm";
import CreateContractStatusBar from "@/components/CreateContractStatusBar/CreateContractStatusBar";

const Page = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  return (
    <div className={`${styles.page} container`}>
      <div className={styles.page_heading}>
        <h1 className={styles.page_heading_title}>Добавить сотрудника</h1>
        <p className={styles.page_heading_descr}>
          Создайте контракт для сотрудника
        </p>
      </div>
      <CreateContractStatusBar currentStep={currentStep} />
      <CreateContractForm
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
    </div>
  );
};

export default Page;
