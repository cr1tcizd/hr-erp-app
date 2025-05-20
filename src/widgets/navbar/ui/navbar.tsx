'use client'
import React from 'react'
import styles from './navbar.module.scss'

import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

const Navbar = () => {
	const pathname = usePathname()
	const links = [
		{
			href: '/timesheets',
			icon: (
				<CalendarTodayOutlinedIcon className={`${styles.page_content_icon}`} />
			),
			text: 'Время',
		},
		{
			href: '/employees',
			icon: <PeopleAltOutlinedIcon className={`${styles.page_content_icon}`} />,
			text: 'Сотрудники',
		},
		{
			href: '/profile',
			icon: (
				<PersonOutlineOutlinedIcon className={`${styles.page_content_icon}`} />
			),
			text: 'Профиль',
		},
	]

	return (
		<div className={`${styles.page} container`}>
			<div className={styles.list}>
				{links.map(link => (
					<Link
						key={link.href}
						href={link.href}
						className={styles.page_content}
					>
						{link.icon}
						<p className={`${styles.page_content_text}`}>{link.text}</p>
						{pathname === link.href && (
							<motion.div
								className={styles.active_indicator}
								layoutId='active-tab'
								transition={{ type: 'spring', duration: 0.3 }}
							/>
						)}
					</Link>
				))}
			</div>
		</div>
	)
}

export default Navbar
