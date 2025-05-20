import { ImageProps } from 'next/image'

export interface IUser {
	id: string
	email: string
	name: string
	birthDate: string
	position?: IPosition
	workPhoneNumber?: string
	phoneNumber?: string
	imageUrl?: string
	department: IDepartment
	contactType: IContactType
	employmentType: IEmploymentType
	workedTimeInCurrentMonth: string
}

export interface IPosition {
	id: string
	name: string
}

export interface IDepartment {
	id: string
	name: string
}

export interface IContactType {
	id: string
	name: string
}

export interface IEmploymentType {
	id: string
	name: string
}

export interface ITimesheet {
	id: string
	category: {
		id: string
		name: string
	}
	date: string
	duration: number
}

export interface ICategories {
	id: string
	name: string
}

export interface IStatsTimesheets {
	category: string
	duration: number
}
