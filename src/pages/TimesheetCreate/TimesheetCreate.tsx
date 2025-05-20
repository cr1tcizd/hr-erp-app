'use client'
import React, { FormEvent, useEffect, useState } from 'react'
import styles from './TimesheetCreate.module.scss'
import { InputLabel, MenuItem, Select } from '@mui/material'
import { Header } from '@/widgets/header'
import { ButtonSubmit, Input } from '@/shared'
import { createTimesheet, getCategories } from '@/api/userAPI'
import { ICategories } from '@/types/IUser'
import { useRouter } from 'next/navigation'

export interface ITimeSheetCreate {
	date: string
	categoryId: string
	duration: string
}

const INITIAL_DATA = {
	date: '',
	categoryId: '',
	duration: '',
}

export default function TimesheetCreate() {
	const [data, setData] = useState(INITIAL_DATA)

	const [error, setError] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const [categories, setCategories] = useState<ICategories[]>([
		// {
		//   id: "123123",
		//   name: "КАТЕГОРИЯ",
		// },
	])

	const router = useRouter()

	console.log(data)
	const updateFields = (fields: Partial<ITimeSheetCreate>) => {
		setData(prev => {
			return { ...prev, ...fields }
		})
	}

	useEffect(() => {
		getCategories().then(categories => setCategories(categories))
	}, [])

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault()
		setError(null)
		setIsLoading(true)
		try {
			await createTimesheet(data)
			alert('Timesheet создан')
			router.push('/timesheets')
		} catch (err: any) {
			setError(err.message || 'Ошибка при создании таймшита')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className={`${styles.page} container`}>
			<Header />
			<div className={styles.header}>
				<h1 className={styles.title}>Timesheets</h1>
			</div>

			<form className={styles.form} onSubmit={onSubmit}>
				<Input
					value={data.date}
					onChange={e => updateFields({ date: e.target.value })}
					type='date'
					id='date'
					min='1900-01-01'
					max={new Date().toISOString().split('T')[0]}
				>
					Дата
				</Input>
				<div>
					<InputLabel
						style={{ fontSize: '12px' }}
						className={styles.label}
						id='category'
					>
						Категория:
					</InputLabel>
					<Select
						style={{ fontSize: '12px' }}
						disableUnderline
						className={styles.select}
						variant='standard'
						labelId='deparment'
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

				<Input
					type='number'
					inputMode='numeric'
					id='duration'
					value={data.duration}
					onChange={e => updateFields({ duration: e.target.value })}
					min={0.1}
					max={24}
					step={0.1}
				>
					Время
				</Input>

				{error && <div className={styles.error}>{error}</div>}

				<ButtonSubmit disabled={isLoading}>
					{isLoading ? 'Создание...' : 'Создать'}
				</ButtonSubmit>
			</form>
		</div>
	)
}
