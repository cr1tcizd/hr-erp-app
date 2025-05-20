"use client";
import React, { FormEventHandler } from "react";
import styles from "./login.module.scss";

import GitHubIcon from "@mui/icons-material/GitHub";

export default function Login() {
  return (
    <div className={`container ${styles.login}`}>
      <a
        className={styles.link}
        href="https://dev.shuvi.keenetic.link/oauth2/authorization/github"
      >
        <GitHubIcon sx={{ fontSize: 42 }} />
        Войти через GitHub
      </a>
    </div>
  );
}
