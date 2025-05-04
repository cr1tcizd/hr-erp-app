'use client'
import React from 'react'
import styles from './bottomNavbar.module.scss'

import PeopleIcon from '@mui/icons-material/People'
import Link from 'next/link'

const BottomNavbar = () => {
	return (
		<div className={styles.page}>
			<Link className={styles.page_content} href='/employees'>
				<PeopleIcon className={styles.page_content_icon} />
				<p className={styles.page_content_text}>Сотрудники</p>
			</Link>
		</div>
	)
}

export default BottomNavbar
