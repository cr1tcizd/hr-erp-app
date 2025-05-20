import React, { FormEvent, useEffect, useState } from 'react'
import styles from './timesheetEditModal.module.scss'
import { ButtonSubmit, Input } from '@/shared'
import { ICategories, ITimesheet } from '@/types/IUser'
import { InputLabel, MenuItem, Select } from '@mui/material'
import { ITimeSheetCreate } from '../../pages/TimesheetCreate/TimesheetCreate'
import {
	deleteTimesheet,
	editTimesheet,
	getCategories,
	getTimesheets,
} from '@/api/userAPI'

interface TimesheetEditModalProps {
	currentTimesheet: ITimesheet
	modalOpen: boolean
	setModalOpen: (value: boolean) => void
	setTimesheets: (value: ITimesheet[]) => void
}

export default function TimeSheetEditModal({
	currentTimesheet,
	modalOpen,
	setModalOpen,
	setTimesheets,
}: TimesheetEditModalProps) {
	const [data, setData] = useState({
		date: currentTimesheet.date,
		duration: String(currentTimesheet.duration),
		categoryId: currentTimesheet.category.id,
	})
	const [error, setError] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [categories, setCategories] = useState<ICategories[]>([])

	useEffect(() => {
		setData({
			date: currentTimesheet.date,
			duration: String(currentTimesheet.duration),
			categoryId: currentTimesheet.category.id,
		})
	}, [currentTimesheet])

	useEffect(() => {
		getCategories().then(categories => setCategories(categories))
	}, [])

	const updateFields = (fields: Partial<ITimeSheetCreate>) => {
		setData(prev => {
			return { ...prev, ...fields }
		})
	}

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault()
		setError(null)
		setIsLoading(true)
		try {
			await editTimesheet(data, currentTimesheet.id)
			setModalOpen(false)
			alert('Timesheet изменён')
			getTimesheets().then(timesheets => setTimesheets(timesheets))
		} catch (err: any) {
			setError(err.message || 'Ошибка при изменении таймшита')
		} finally {
			setIsLoading(false)
		}
	}

	const handleDeleteTimesheet = async () => {
		setError(null)
		setIsLoading(true)
		try {
			await deleteTimesheet(currentTimesheet.id).then(() => {
				setModalOpen(false)
				alert('Timesheet удалён')
				getTimesheets().then(timesheets => setTimesheets(timesheets))
			})
		} catch (err: any) {
			setError(err.message || 'Ошибка при удалении таймшита')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className={`${styles.modal} ${modalOpen ? styles.modal_active : ''}`}>
			<div className={styles.modal_content}>
				<div
					className={styles.modal_close}
					onClick={() => {
						setModalOpen(false)
						setError(null)
					}}
				>
					×
				</div>
				<form className={styles.modal_form} onSubmit={onSubmit}>
					<Input
						type='date'
						id='date'
						value={data.date}
						onChange={e => updateFields({ date: e.target.value })}
						min='1900-01-01'
						max={new Date().toISOString().split('T')[0]}
					>
						Дата
					</Input>
					<Input
						type='number'
						inputMode='numeric'
						id='time'
						value={data.duration}
						onChange={e => updateFields({ duration: e.target.value })}
						min={0.1}
						max={24}
						step={0.1}
					>
						Время
					</Input>
					<div className={styles.selectContainer}>
						<InputLabel
							style={{ fontSize: '12px' }}
							className={styles.selectContainer_label}
							id='category'
						>
							Категория:
						</InputLabel>
						<Select
							disableUnderline
							style={{ fontSize: '12px' }}
							className={styles.selectContainer_select}
							variant='standard'
							labelId='category'
							value={data.categoryId}
							label='category'
							onChange={e => {
								updateFields({ categoryId: e.target.value })
							}}
						>
							{categories?.map(category => (
								<MenuItem key={category.id} value={category.id}>
									{category.name}
								</MenuItem>
							))}
						</Select>
					</div>
					{error && <div className={styles.error}>{error}</div>}
					<ButtonSubmit type='submit' disabled={isLoading}>
						Сохранить
					</ButtonSubmit>
					<ButtonSubmit
						type='button'
						disabled={isLoading}
						onClick={handleDeleteTimesheet}
						style={{ background: 'rgba(150, 0, 24, 1)' }}
					>
						Удалить
					</ButtonSubmit>
				</form>
			</div>
		</div>
	)
}
