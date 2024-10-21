"use client";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import styles from "./employeeItem.module.scss";
import Image from "next/image";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

import defaultAvatar from "@/assets/defaultProfilePhoto.png";
import Button from "@/components/ui/Button/Button";
import { IUser } from "@/types/IUser";
import { deleteEmployee, getUsers } from "@/api/userAPI";
import { useClickOutside } from "@/hooks/useClickOutside";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface EmployeeItemProps {
  user: IUser;
  setUsers: Dispatch<SetStateAction<IUser[]>>;
}

const EmployeeItem = ({ user, setUsers }: EmployeeItemProps) => {
  const [moreInfoOpen, setMoreInfoOpen] = useState(false);
  const [moreVertModal, setMoreVertModal] = useState(false);

  const ref = useRef(null);

  const handleOpenMoreInfo = () => {
    setMoreInfoOpen(!moreInfoOpen);
  };

  useClickOutside(ref, () => {
    setMoreVertModal(false);
  });

  const handleDeleteEmployee = () => {
    deleteEmployee(user.id).then(() => {
      alert("Пользователь успешно удален");
      getUsers().then((users) => setUsers(users));
    });
  };
  console.log(user);

  return (
    <div
      className={`${styles.employeerItem} ${moreInfoOpen && styles.employeerItem_active}`}
    >
      <div className={styles.employeerItem_general}>
        <Image
          className={styles.employeerItem_general_img}
          src={user.imageUrl ? user.imageUrl : (defaultAvatar as StaticImport)}
          alt={"avatar"}
          height={35}
          width={35}
        />
        <div className={styles.employeerItem_general_head}>
          <strong className={styles.employeerItem_general_head_name}>
            {user.name}
          </strong>
          <p className={styles.employeerItem_general_head_email}>
            {user.email}
          </p>
        </div>
        <div className={styles.employeerItem_general_btn}>
          <Button onClick={handleOpenMoreInfo}>
            <KeyboardArrowDownOutlinedIcon
              className={`${styles.employeerItem_general_btn_icon} ${moreInfoOpen && styles.employeerItem_general_btn_icon_active}`}
            />
          </Button>
          <Button onClick={() => setMoreVertModal(!moreVertModal)}>
            <MoreVertIcon sx={{ fontSize: 20 }} />
          </Button>
          {/*{moreVertModal && (*/}
          <div
            ref={ref}
            className={
              moreVertModal
                ? `${styles.moreVertModal} ${styles.moreVertModal_active}`
                : `${styles.moreVertModal}`
            }
          >
            <p
              className={`${styles.moreVertModal_item}`}
              onClick={() => console.log("Профиль " + user.name)}
            >
              Профиль
            </p>
            <p
              className={`${styles.moreVertModal_item}`}
              onClick={handleDeleteEmployee}
            >
              Удалить
            </p>
          </div>
          {/*)*/}
        </div>
      </div>
      <div className={styles.employeerItem_more}>
        <div className={styles.employeerItem_item}>
          <LocalPhoneOutlinedIcon sx={{ fontSize: 16 }} />
          <p className={styles.employeerItem_more_text}>{user.phoneNumber}</p>
        </div>
        <div className={styles.employeerItem_more_dot}></div>
        <div className={styles.employeerItem_item}>
          <AccessTimeOutlinedIcon sx={{ fontSize: 16 }} />
          <p className={styles.employeerItem_more_text}>12h 8m</p>
        </div>
      </div>
      <div
        className={`${styles.bottomInfo} ${moreInfoOpen && styles.bottomInfo_active}`}
      >
        <div className={styles.bottomInfo_item}>
          <p className={styles.bottomInfo_item_subtitle}>Отдел:</p>
          <div
            className={`${styles.bottomInfo_item_descr} ${styles.bottomInfo_item_descr_tag}`}
          >
            <span className={styles.bottomInfo_item_descr_icon}></span>
            <strong>{user.department?.name}</strong>
          </div>
        </div>
        <div className={styles.bottomInfo_item}>
          <p className={styles.bottomInfo_item_subtitle}>Должность:</p>
          <strong className={styles.bottomInfo_item_descr}>
            {user.position?.name}
          </strong>
        </div>
        <div
          className={`${styles.bottomInfo_item} ${styles.bottomInfo_item_last}`}
        >
          <p className={styles.bottomInfo_item_subtitle}>Занятость:</p>
          <strong className={styles.bottomInfo_item_descr}>
            {user.contactType?.name} - {user.employmentType.name}
          </strong>
        </div>
      </div>
    </div>
  );
};

export default EmployeeItem;
