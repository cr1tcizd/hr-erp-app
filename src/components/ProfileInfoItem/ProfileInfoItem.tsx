import React from 'react'
import styles from './profileInfoItem.module.scss'

interface ProfileInfoItemProps {
	name: string
	descr?: string | number
}

export default function ProfileInfoItem({ descr, name }: ProfileInfoItemProps) {
	return (
		<div className={styles.item}>
			<p className={styles.item_name}>{name}</p>
			<b className={styles.item_descr}>{descr}</b>
		</div>
	)
}
