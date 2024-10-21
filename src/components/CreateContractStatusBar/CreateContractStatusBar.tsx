import React from "react";
import styles from "./createContractStatusBar.module.scss";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface CreateContractStatusBarProps {
  currentStep: number;
}

const CreateContractStatusBar = ({
  currentStep,
}: CreateContractStatusBarProps) => {
  return (
    <div className={styles.statusBar}>
      <div
        className={`${styles.statusBar_item} ${currentStep === 1 && styles.statusBar_item_active}`}
      >
        <CheckCircleIcon
          className={`${styles.statusBar_item_icon} ${currentStep === 2 && styles.statusBar_item_icon_active}`}
        />
        <p className={styles.statusBar_item_text}>Персональные данные</p>
      </div>
      <div className={styles.statusBar_item_line}></div>
      <div
        className={`${styles.statusBar_item} ${currentStep === 2 && styles.statusBar_item_active}`}
      >
        <CheckCircleIcon className={styles.statusBar_item_icon} />
        <p className={styles.statusBar_item_text}>Подробности работы</p>
      </div>
    </div>
  );
};

export default CreateContractStatusBar;
