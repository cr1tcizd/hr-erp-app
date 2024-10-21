import { ImageProps } from "next/image";

export interface IUser {
  id: string;
  userId: string;
  email: string;
  name: string;
  birthDate: string;
  position?: IPosition;
  vacations: IVacation[];
  workPhoneNumber?: string;
  phoneNumber?: string;
  imageUrl?: string;
  department: IDepartment;
  contactType: IContactType;
  employmentType: IEmploymentType;
  workedTimeInCurrentMonth: string;

  // map(element: (user: IUser) => JSX.Element): IUser | null;
}

export interface IPosition {
  id: string;
  name: string;
}

export interface IVacation {
  id: string;
  startDate: string;
  endDate: string;
}

export interface IDepartment {
  id: string;
  name: string;
}

export interface IContactType {
  id: string;
  name: string;
}

export interface IEmploymentType {
  id: string;
  name: string;
}
