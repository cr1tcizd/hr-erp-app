'use client'
import React, { useEffect, useState } from 'react'
import styles from './profile.module.scss'
import { getUser } from '@/api/userAPI'
import { IUser } from '@/types/IUser'
import Image from 'next/image'

import defaultProfile from '@/assets/defaultProfilePhoto.png'
import ProfileInfo from '@/components/ProfileInfo/ProfileInfo'
import ProfileInfoItem from '@/components/ProfileInfoItem/ProfileInfoItem'
import { ClipLoader } from 'react-spinners'
import { notFound } from 'next/navigation'

interface ProfileProps {
	id: any
}

export default function Profile({ id }: ProfileProps) {
	const [user, setUser] = useState<IUser | null>(null)
	const [error, setError] = useState(false)

	useEffect(() => {
		getUser(id).then(data => {
			if (!data) return setError(true)
			setUser(data)
		})
	}, [])

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
		<div className={`${styles.profile} container`}>
			<div className={styles.profile_head}>
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
				<ProfileInfoItem name='Должность' descr={user?.position?.name} />
				<ProfileInfoItem name='Контракт:' descr={user?.contactType.name} />
				<ProfileInfoItem name='Занятость:' descr={user?.employmentType.name} />
				<ProfileInfoItem
					name='Рабочий телефон:'
					descr={user?.workPhoneNumber}
				/>
			</ProfileInfo>
			<ProfileInfo title='Производительность'>
				<ProfileInfoItem name='Код-ревью:' descr='50%' />
				<ProfileInfoItem name='Тестирование:' descr='24%' />
				<ProfileInfoItem name='Анализ:' descr='30%' />
			</ProfileInfo>
		</div>
	)
}
