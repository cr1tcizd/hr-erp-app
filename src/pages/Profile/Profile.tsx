'use client'
import React, { useEffect, useState } from 'react'
import styles from './profile.module.scss'
import { deleteEmployee, getStatsTimesheets, getUser } from '@/api/userAPI'
import { IStatsTimesheets, IUser } from '@/types/IUser'
import Image from 'next/image'

import defaultProfile from '@/assets/defaultProfilePhoto.png'
import ProfileInfo from '@/components/ProfileInfo/ProfileInfo'
import ProfileInfoItem from '@/components/ProfileInfoItem/ProfileInfoItem'
import { ClipLoader } from 'react-spinners'
import { notFound, useRouter } from 'next/navigation'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined'
import { motion } from 'framer-motion'
import EditPorfileModal from '@/components/EditProfileModal/EditPorfileModal'
import { useAuth } from '@/context/auth-context'
import { ButtonSubmit } from '@/shared'

interface ProfileProps {
	id: any
}

export default function Profile({ id }: ProfileProps) {
	const [user, setUser] = useState<IUser | null>(null)

	const { user: currentUser } = useAuth()
	const [error, setError] = useState(false)
	const [activeModal, setActiveModal] = useState(false)
	const [timesheets, setTimesheets] = useState<IStatsTimesheets[]>([])
	const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const router = useRouter()

	const isHR = currentUser?.position?.name === 'HR Специалист'

	useEffect(() => {
		getUser(id).then(data => {
			if (!data) return setError(true)
			setUser(data)
		})
		getStatsTimesheets(id).then(timesheets => setTimesheets(timesheets))
	}, [])

	const handleDeleteBtn = () => {
		setIsLoading(true)
		deleteEmployee(id)
			.then(() => {
				alert(`'Пользователь ${user?.name} удалён из системы`)
				setIsOpenDeleteModal(false)
				router.push('/employees')
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	if (error) {
		notFound()
	}

	if (!error && !user)
		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
				}}
			>
				<ClipLoader />
			</div>
		)

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 20 }}
			transition={{ duration: 0.3 }}
			className={`${styles.profile} container`}
		>
			{user && (
				<EditPorfileModal
					user={user}
					activeModal={activeModal}
					setActiveModal={setActiveModal}
					setUser={setUser}
				/>
			)}
			<div className={styles.profile_head}>
				<div
					className={`${styles.modal_delete} ${isOpenDeleteModal ? styles.modal_delete_active : ''}`}
				>
					<div className={styles.modal_delete_content}>
						<p className={styles.modal_delete_title}>
							Вы точно хотите удалить пользователя:
						</p>
						<p className={styles.modal_delete_name}>{user?.name}</p>
						<div className={styles.modal_delete_btnCon}>
							<ButtonSubmit onClick={handleDeleteBtn} disabled={isLoading}>
								Подтвердить
							</ButtonSubmit>
							<ButtonSubmit
								onClick={() => {
									setIsOpenDeleteModal(false)
								}}
								style={{ background: 'red' }}
								disabled={isLoading}
							>
								Отмена
							</ButtonSubmit>
						</div>
					</div>
				</div>
				{isHR && id !== 'me' ? (
					<button
						className={styles.btn_delete}
						onClick={() => {
							setIsOpenDeleteModal(prev => !prev)
						}}
					>
						<DeleteOutlineOutlinedIcon />
					</button>
				) : null}
				{id === 'me' || isHR ? (
					<button
						type='button'
						className={styles.edit}
						onClick={() => {
							setActiveModal(true)
							setIsOpenDeleteModal(false)
						}}
					>
						<BorderColorOutlinedIcon sx={{ fontSize: '20px' }} />
					</button>
				) : (
					<></>
				)}
				<Image
					className={styles.profile_head_img}
					src={user?.imageUrl ? user.imageUrl : defaultProfile}
					alt='avatar'
					width={100}
					height={100}
				/>
				<h2 className={styles.profile_head_name}>{user?.name}</h2>
				<p className={styles.profile_head_position}>{user?.position?.name}</p>
			</div>
			<ProfileInfo title='Персональная информация'>
				<ProfileInfoItem name='Имя и фамилия:' descr={user?.name} />
				<ProfileInfoItem name='Email:' descr={user?.email} />
				<ProfileInfoItem name='Телефон:' descr={user?.phoneNumber} />
				{user?.birthDate && (
					<ProfileInfoItem
						name='Дата рождения:'
						descr={new Date(user?.birthDate).toLocaleDateString()}
					/>
				)}
			</ProfileInfo>
			<ProfileInfo title='Рабочая информация'>
				<ProfileInfoItem name='Отдел:' descr={user?.department.name} />
				<ProfileInfoItem name='Контракт:' descr={user?.contactType.name} />
				<ProfileInfoItem name='Занятость:' descr={user?.employmentType.name} />
				<ProfileInfoItem
					name='Рабочий телефон:'
					descr={user?.workPhoneNumber}
				/>
			</ProfileInfo>
			{id === 'me' || isHR ? (
				<ProfileInfo title='Учёт рабочего времени за текущий месяц'>
					{timesheets?.length !== 0 ? (
						timesheets.map(timesheet => (
							<ProfileInfoItem
								key={timesheet.category}
								name={timesheet.category}
								descr={`${timesheet.duration}h`}
							/>
						))
					) : (
						<div>Данные отсутствуют</div>
					)}
				</ProfileInfo>
			) : (
				<></>
			)}
		</motion.div>
	)
}
