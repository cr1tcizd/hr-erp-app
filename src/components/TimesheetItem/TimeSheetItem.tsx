import React from 'react'
import styles from './timesheetItem.module.scss'
import { ITimesheet } from '@/types/IUser'

interface TimeSheetItemProps {
	timesheet: ITimesheet
	setCurrentTimesheet: (value: ITimesheet) => void
	setModalOpen: (value: boolean) => void
}

export default function TimeSheetItem({
	timesheet,
	setCurrentTimesheet,
	setModalOpen,
}: TimeSheetItemProps) {
	const handleClickTimesheet = () => {
		setCurrentTimesheet(timesheet)
		setModalOpen(true)
	}

	return (
		<div className={styles.list__item} onClick={handleClickTimesheet}>
			<div className={styles.item_top}>
				<div className={styles.item__sub}>
					<p>Дата:</p>
					<b>
						{new Date(timesheet.date).toLocaleDateString('ru-RU', {
							year: 'numeric',
							month: '2-digit',
							day: '2-digit',
						})}
					</b>
				</div>
				<div className={styles.item__sub}>
					<p>Время:</p>
					<b className={styles.sub__time}>{timesheet.duration}h</b>
				</div>
			</div>
			<div className={styles.item_bottom}>
				<div className={styles.item__sub}>
					<p>Категория:</p>
					<b>{timesheet.category.name}</b>
				</div>
			</div>
		</div>
	)
}
