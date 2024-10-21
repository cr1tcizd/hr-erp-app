import React, { useState } from "react";
import styles from "./createContractUserForm.module.scss";
import Image from "next/image";
import defaultProfilePhoto from "@/assets/defaultProfilePhoto.png";
import Input from "@/components/ui/Input/Input";
import CreateContractFormWrapper from "@/components/CreateContractFormWrapper/CreateContractFormWrapper";
import { uploadImage } from "@/api/userAPI";

interface CreateContractUserData {
  email: string;
  name: string;
  birthDate: string;
  phoneNumber: string;
  imageUrl: string;
}

interface CreateContractUserFormProps extends CreateContractUserData {
  updateFields: (fields: Partial<CreateContractUserData>) => void;
}

const CreateContractUserForm = ({
  email,
  name,
  phoneNumber,
  birthDate,
  updateFields,
}: CreateContractUserFormProps) => {
  const [employeePhoto, setEmpoyeePhoto] = useState<string>("");

  const handleUploadImage = async (e: any) => {
    if (e.target.files[0]) {
      setEmpoyeePhoto(URL.createObjectURL(e.target.files[0]));
      await uploadImage(e.target.files[0]).then((image) =>
        updateFields({ imageUrl: image.url }),
      );
    }
  };

  return (
    <CreateContractFormWrapper step="1" title="Персональные данные">
      <div className={styles.form_container}>
        <div className={styles.form_container_imageContainer}>
          <Image
            className={styles.form_container_imageContainer_img}
            src={employeePhoto ? employeePhoto : defaultProfilePhoto}
            alt="Avatar"
            width={75}
            height={75}
          />
          <div className={styles.form_container_imageContainer_inpCon}>
            <label
              className={styles.form_container_imageContainer_inpCon_label}
              htmlFor="image"
            >
              Загрузить фото
            </label>
            <input
              className={styles.form_container_imageContainer_inpCon_input}
              type="file"
              id="image"
              accept="image/png, image/jpeg"
              onChange={(e) => handleUploadImage(e)}
            />
          </div>
        </div>
        <Input
          registerName="name"
          type="text"
          id="name"
          value={name}
          onChange={(e) => updateFields({ name: e.target.value })}
        >
          Имя
        </Input>
        {/*<Input registerName="name" type="text" id="lastname">*/}
        {/*  Фамилия*/}
        {/*</Input>*/}
        <Input
          registerName="email"
          type="email"
          id="email"
          value={email}
          onChange={(e) => updateFields({ email: e.target.value })}
        >
          Email
        </Input>
        <Input
          registerName="phoneNumber"
          type="tel"
          id="phone"
          inputMode="numeric"
          value={phoneNumber}
          onChange={(e) => updateFields({ phoneNumber: e.target.value })}
          pattern="^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$"
          title="+7xxxxxxxx"
        >
          Номер телефона
        </Input>
        <Input
          value={birthDate}
          onChange={(e) => updateFields({ birthDate: e.target.value })}
          registerName="birthDate"
          type="date"
          id="birthday"
          min="1900-01-01"
          max={new Date().toISOString().split("T")[0]}
        >
          Дата рождения
        </Input>
      </div>
    </CreateContractFormWrapper>
  );
};

export default CreateContractUserForm;
