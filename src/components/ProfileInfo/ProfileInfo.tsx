import React, { ReactNode } from 'react'
import styles from './profileInfo.module.scss'
import ProfileInfoItem from '../ProfileInfoItem/ProfileInfoItem'
import { IUser } from '@/types/IUser'

interface ProfileInfoProps {
	title: string
	children: ReactNode
}

export default function ProfileInfo({ title, children }: ProfileInfoProps) {
	return (
		<div className={styles.info}>
			<b>{title}</b>
			{children}
		</div>
	)
}
