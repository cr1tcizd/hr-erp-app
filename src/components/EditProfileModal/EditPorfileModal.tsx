import React, { FormEvent, useEffect, useState } from 'react'
import styles from './editProfileModal.module.scss'
import { ButtonSubmit, Input } from '@/shared'
import {
	IContactType,
	IDepartment,
	IEmploymentType,
	IPosition,
	IUser,
} from '@/types/IUser'
import Image from 'next/image'
import { InputLabel, MenuItem, Select } from '@mui/material'
import {
	getContractTypes,
	getDepartment,
	getEmploymentTypes,
	getPositions,
	getUser,
	updateUser,
	uploadImage,
} from '@/api/userAPI'
import defaultProfile from '@/assets/defaultProfilePhoto.png'
import { useAuth } from '@/context/auth-context'
import { MoonLoader } from 'react-spinners'

interface EditProfileModalProps {
	user: IUser
	activeModal: boolean
	setActiveModal: (activeModal: boolean) => void
	setUser: (value: IUser) => void
}

export interface MyForm {
	email: string
	name: string
	positionId: string
	birthDate: string
	workPhoneNumber: string
	phoneNumber: string
	imageUrl: string
	departmentId: string
	contactTypeId: string
	employmentTypeId: string
}

export default function EditPorfileModal({
	user,
	activeModal,
	setActiveModal,
	setUser,
}: EditProfileModalProps) {
	const INITIAL_DATA = {
		email: user?.email,
		name: user?.name,
		positionId: user?.position?.id,
		birthDate: user?.birthDate,
		workPhoneNumber: user?.workPhoneNumber,
		phoneNumber: user?.phoneNumber,
		imageUrl: user?.imageUrl,
		departmentId: user?.department.id,
		contactTypeId: user?.contactType.id,
		employmentTypeId: user?.employmentType.id,
	}
	const [data, setData] = useState(INITIAL_DATA)
	const { user: currentUser, loading } = useAuth()
	const [error, setError] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [employeePhoto, setEmployeePhoto] = useState(INITIAL_DATA.imageUrl)

	const [positions, setPositions] = useState<IPosition[]>([])
	const [contracts, setContracts] = useState<IContactType[]>([])
	const [employmentTypes, setEmploymentTypes] = useState<IEmploymentType[]>([])
	const [departments, setDepartments] = useState<IDepartment[]>([])

	const handleUploadImage = async (e: any) => {
		if (e.target.files[0]) {
			setEmployeePhoto(URL.createObjectURL(e.target.files[0]))
			await uploadImage(e.target.files[0]).then(image =>
				updateFields({ imageUrl: image.url })
			)
		}
	}
	const updateFields = (fields: Partial<MyForm>) => {
		setData(prev => {
			return { ...prev, ...fields }
		})
	}

	useEffect(() => {
		getPositions().then(positions => setPositions(positions))
		getContractTypes().then(contracts => setContracts(contracts))
		getEmploymentTypes().then(employmentTypes =>
			setEmploymentTypes(employmentTypes)
		)
		getDepartment().then(departments => setDepartments(departments))
	}, [])

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault()
		setError(null)
		setIsLoading(true)
		try {
			await updateUser(data, user?.id)
			setActiveModal(false)
			alert('Профиль изменён')
			getUser(user.id).then(user => setUser(user))
		} catch (err: any) {
			setError(err.message)
		} finally {
			setIsLoading(false)
		}
	}

	if (loading)
		return (
			<div
				style={{
					width: '100%',
					display: 'flex',
					height: '200px',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<MoonLoader size={32} />
			</div>
		)

	return (
		<div
			className={`${styles.modal} ${activeModal ? styles.modal_active : ''}`}
		>
			<div className={styles.modal__content}>
				<button
					className={styles.modal_close}
					onClick={() => {
						setActiveModal(false)
						setError(null)
					}}
				>
					X
				</button>
				<form action='' className={styles.form} onSubmit={onSubmit}>
					{currentUser?.position?.name === 'HR Специалист' &&
					user.id !== currentUser?.id ? (
						<>
							<div className={styles.form_container_imageContainer}>
								<Image
									className={styles.form_container_imageContainer_img}
									src={
										employeePhoto
											? employeePhoto
											: data.imageUrl
												? data.imageUrl
												: defaultProfile
									}
									alt='Avatar'
									width={75}
									height={75}
								/>
								<div className={styles.form_container_imageContainer_inpCon}>
									<label
										className={
											styles.form_container_imageContainer_inpCon_label
										}
										htmlFor='image'
									>
										Загрузить фото
									</label>
									<input
										className={
											styles.form_container_imageContainer_inpCon_input
										}
										type='file'
										id='image'
										accept='image/png, image/jpeg'
										onChange={e => handleUploadImage(e)}
									/>
								</div>
							</div>
							<Input
								id='name'
								type='text'
								value={data.name}
								onChange={e => updateFields({ name: e.target.value })}
							>
								Имя и фамилия
							</Input>
							<Input
								id='email'
								type='text'
								value={data.email}
								onChange={e => updateFields({ email: e.target.value })}
							>
								Email
							</Input>
							<Input
								id='phone'
								type='tel'
								inputMode='numeric'
								value={data.phoneNumber}
								onChange={e => updateFields({ phoneNumber: e.target.value })}
								pattern='^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$'
								title='+7xxxxxxxx'
							>
								Телефон
							</Input>
							<Input
								id='birthday'
								type='date'
								value={data.birthDate}
								onChange={e => updateFields({ birthDate: e.target.value })}
								min='1900-01-01'
								max={new Date().toISOString().split('T')[0]}
							>
								Дата рождения
							</Input>

							<div className={styles.selectContainer}>
								<InputLabel
									style={{ fontSize: '12px' }}
									className={styles.selectContainer_label}
									id='deparment'
								>
									Должность:
								</InputLabel>
								<Select
									style={{ fontSize: '12px' }}
									disableUnderline
									className={styles.selectContainer_select}
									variant='standard'
									labelId='position'
									value={data.positionId}
									label='Age'
									onChange={e => {
										updateFields({ positionId: e.target.value })
									}}
								>
									{positions.map(position => (
										<MenuItem key={position.id} value={position.id}>
											{position.name}
										</MenuItem>
									))}
								</Select>
							</div>
							<div className={styles.selectContainer}>
								<InputLabel
									style={{ fontSize: '12px' }}
									className={styles.selectContainer_label}
									id='deparment'
								>
									Контракт:
								</InputLabel>
								<Select
									style={{ fontSize: '12px' }}
									disableUnderline
									className={styles.selectContainer_select}
									variant='standard'
									labelId='contract'
									value={data.contactTypeId}
									label='Age'
									onChange={e => {
										updateFields({ contactTypeId: e.target.value })
									}}
								>
									{contracts.map(contract => (
										<MenuItem key={contract.id} value={contract.id}>
											{contract.name}
										</MenuItem>
									))}
								</Select>
							</div>
							<div className={styles.selectContainer}>
								<InputLabel
									style={{ fontSize: '12px' }}
									className={styles.selectContainer_label}
									id='deparment'
								>
									Занятость:
								</InputLabel>
								<Select
									style={{ fontSize: '12px' }}
									disableUnderline
									className={styles.selectContainer_select}
									variant='standard'
									labelId='employment'
									value={data.employmentTypeId}
									label='Age'
									onChange={e => {
										updateFields({ employmentTypeId: e.target.value })
									}}
								>
									{employmentTypes.map(employmentType => (
										<MenuItem key={employmentType.id} value={employmentType.id}>
											{employmentType.name}
										</MenuItem>
									))}
								</Select>
							</div>
							<div className={styles.selectContainer}>
								<InputLabel
									style={{ fontSize: '12px' }}
									className={styles.selectContainer_label}
									id='deparment'
								>
									Отдел:
								</InputLabel>
								<Select
									style={{ fontSize: '12px' }}
									disableUnderline
									className={styles.selectContainer_select}
									variant='standard'
									labelId='employment'
									value={data.departmentId}
									label='Age'
									onChange={e => {
										updateFields({ departmentId: e.target.value })
									}}
								>
									{departments.map(department => (
										<MenuItem key={department.id} value={department.id}>
											{department.name}
										</MenuItem>
									))}
								</Select>
							</div>
							<Input
								id='phone'
								type='tel'
								inputMode='numeric'
								value={data.workPhoneNumber}
								onChange={e =>
									updateFields({ workPhoneNumber: e.target.value })
								}
								pattern='^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$'
								title='+7xxxxxxxx'
							>
								Рабочий телефон
							</Input>
						</>
					) : (
						<>
							<div className={styles.form_container_imageContainer}>
								<Image
									className={styles.form_container_imageContainer_img}
									src={
										employeePhoto
											? employeePhoto
											: data.imageUrl
												? data.imageUrl
												: defaultProfile
									}
									alt='Avatar'
									width={75}
									height={75}
								/>
								<div className={styles.form_container_imageContainer_inpCon}>
									<label
										className={
											styles.form_container_imageContainer_inpCon_label
										}
										htmlFor='image'
									>
										Загрузить фото
									</label>
									<input
										className={
											styles.form_container_imageContainer_inpCon_input
										}
										type='file'
										id='image'
										accept='image/png, image/jpeg'
										onChange={e => handleUploadImage(e)}
									/>
								</div>
							</div>
							<Input
								id='name'
								type='text'
								value={data.name}
								onChange={e => updateFields({ name: e.target.value })}
							>
								Имя и фамилия
							</Input>
							<Input
								id='email'
								type='text'
								value={data.email}
								onChange={e => updateFields({ email: e.target.value })}
							>
								Email
							</Input>
							<Input
								id='phone'
								type='tel'
								inputMode='numeric'
								value={data.phoneNumber}
								onChange={e => updateFields({ phoneNumber: e.target.value })}
								pattern='^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$'
								title='+7xxxxxxxx'
							>
								Телефон
							</Input>
							<Input
								id='birthday'
								type='date'
								value={data.birthDate}
								onChange={e => updateFields({ birthDate: e.target.value })}
								min='1900-01-01'
								max={new Date().toISOString().split('T')[0]}
							>
								Дата рождения
							</Input>

							<Input
								id='phone'
								type='tel'
								inputMode='numeric'
								value={data.workPhoneNumber}
								onChange={e =>
									updateFields({ workPhoneNumber: e.target.value })
								}
								pattern='^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$'
								title='+7xxxxxxxx'
							>
								Рабочий телефон
							</Input>
						</>
					)}

					{error && <div className={styles.error}>{error}</div>}
					<ButtonSubmit disabled={isLoading}>Сохранить</ButtonSubmit>
				</form>
			</div>
		</div>
	)
}
