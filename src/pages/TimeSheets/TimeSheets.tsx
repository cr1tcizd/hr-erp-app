'use client'
import React, { useEffect, useState } from 'react'
import styles from './TimeSheets.module.scss'

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import Link from 'next/link'
import { getStatsTimesheets, getTimesheets, getUser } from '@/api/userAPI'
import { IStatsTimesheets, ITimesheet, IUser } from '@/types/IUser'
import { Header } from '@/widgets/header'
import { motion } from 'framer-motion'
import TimeSheetItem from '../../components/TimesheetItem/TimeSheetItem'
import TimeSheetEditModal from '../../components/TimesheetEditModal/TimeSheetEditModal'

export default function TimeSheets() {
	const [currentTimesheet, setCurrentTimesheet] = useState<ITimesheet>({
		category: { id: '', name: '' },
		date: '',
		duration: 0,
		id: '',
	})

	const [stats, setStats] = useState<IStatsTimesheets[]>([])
	const [modalOpen, setModalOpen] = useState(false)
	const [timesheets, setTimesheets] = useState<ITimesheet[]>([])

	useEffect(() => {
		getTimesheets().then(timesheets => setTimesheets(timesheets))
		getStatsTimesheets('me').then(user => setStats(user))
	}, [])

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 20 }}
			transition={{ duration: 0.3 }}
			className={`${styles.page} container`}
		>
			<Header />
			<TimeSheetEditModal
				currentTimesheet={currentTimesheet}
				modalOpen={modalOpen}
				setModalOpen={setModalOpen}
				setTimesheets={setTimesheets}
			/>
			<div className={styles.header}>
				<h1 className={styles.title}>Timesheets</h1>
				<Link href='timesheets/create-timesheet'>
					<AddCircleOutlineIcon sx={{ fontSize: '32px' }} />
				</Link>
			</div>
			<div className={styles.currentMonth}>
				<h2 className={styles.currentMonth_title}>За текущий месяц</h2>
				<div className={styles.currentMonth_list}>
					{stats?.map(category => (
						<div
							key={category.category}
							className={styles.currentMonth__element}
						>
							<p>{category.category}</p>
							<b>{category.duration}h</b>
						</div>
					))}
				</div>
			</div>
			<div className={styles.list}>
				{timesheets?.map(timesheet => (
					<TimeSheetItem
						key={timesheet.id}
						timesheet={timesheet}
						setCurrentTimesheet={setCurrentTimesheet}
						setModalOpen={setModalOpen}
					/>
				))}
			</div>
		</motion.div>
	)
}
