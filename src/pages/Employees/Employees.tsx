"use client";

import { useEffect, useState } from "react";
import { getUsers } from "@/api/userAPI";
import { IUser } from "@/types/IUser";
import styles from "./employees.module.scss";

import SearchIcon from "@mui/icons-material/Search";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import AddIcon from "@mui/icons-material/Add";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

import Navbar from "@/components/Navbar/Navbar";
import Button from "@/components/ui/Button/Button";
import EmployeeItem from "@/components/EmployeerItem/EmployeeItem";
import Link from "next/link";
import { MoonLoader } from "react-spinners";

export default function Employees() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [currentTab, setCurrentTab] = useState(1);

  useEffect(() => {
    getUsers().then((users) => setUsers(users));
  }, []);

  return (
    <div className={`${styles.page} container`}>
      <Navbar />
      <div className={styles.newEmpl}>
        <h1 className={styles.newEmpl_title}>Сотрудники</h1>
        <p className={styles.newEmpl_descr}>Управляй своими сотрудниками</p>
        <Link href="/employees/create-contract" className={styles.newEmpl_btn}>
          <AddIcon />
          Добавить сотрудника
        </Link>
      </div>
      <div className={styles.widged}>
        <div
          onClick={() => setCurrentTab(1)}
          className={`${styles.widged_content} ${currentTab == 1 && styles.widged_content_active}`}
        >
          <ManageAccountsOutlinedIcon className={styles.widged_content_icon} />
          <button className={styles.widged_content_btn}>
            Управление работниками
          </button>
        </div>
        <div
          onClick={() => setCurrentTab(2)}
          className={`${styles.widged_content} ${currentTab === 2 && styles.widged_content_active}`}
        >
          <PersonSearchIcon className={styles.widged_content_icon} />
          <button className={styles.widged_content_btn}>
            Заявки на работу
          </button>
        </div>
      </div>
      {currentTab === 1 ? (
        <div className={styles.manageSecton}>
          <h1 className={styles.manageSecton_title}>Управление работниками</h1>
          <div className={styles.manageSecton_searchCon}>
            <div className={styles.manageSecton_inpCont}>
              <input
                className={styles.manageSecton_inpCont_input}
                type="text"
                placeholder="Поиск сотрудника..."
              />
              <SearchIcon className={styles.manageSecton_inpCont_icon} />
            </div>
            <Button>
              <FilterAltOutlinedIcon sx={{ fontSize: 20 }} />
              Фильтр
            </Button>
          </div>
          <div>
            {users.length !== 0 ? (
              users.map((user) => (
                <EmployeeItem key={user.id} user={user} setUsers={setUsers} />
              ))
            ) : (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  height: "200px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MoonLoader size={32} />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>ничего нет</div>
      )}
    </div>
  );
}
