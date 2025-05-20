import React, { useEffect, useState } from 'react'
import styles from './createContractWorkForm.module.scss'
import Input from '@/components/ui/Input/Input'
import { InputLabel, MenuItem, Select } from '@mui/material'
import {
	IContactType,
	IDepartment,
	IEmploymentType,
	IPosition,
} from '@/types/IUser'
import CreateContractFormWrapper from '@/components/CreateContractFormWrapper/CreateContractFormWrapper'
import {
	getContractTypes,
	getDepartment,
	getEmploymentTypes,
	getPositions,
} from '@/api/userAPI'

interface CreateContractWorkData {
	positionId: string
	workPhoneNumber: string
	departmentId: string
	contactTypeId: string
	employmentTypeId: string
}

interface CreateContractWorkFormProps extends CreateContractWorkData {
	updateFields: (fields: Partial<CreateContractWorkData>) => void
}

const CreateContractWorkForm = ({
	updateFields,
	employmentTypeId,
	positionId,
	workPhoneNumber,
	departmentId,
	contactTypeId,
}: CreateContractWorkFormProps) => {
	const [departments, setDepartments] = useState<IDepartment[]>([])
	const [positions, setPositions] = useState<IPosition[]>([])
	const [contracts, setContracts] = useState<IContactType[]>([])
	const [employmentTypes, setEmploymentTypes] = useState<IEmploymentType[]>([])

	useEffect(() => {
		getDepartment().then(departments => setDepartments(departments))
		getPositions().then(positions => setPositions(positions))
		getContractTypes().then(contracts => setContracts(contracts))
		getEmploymentTypes().then(employmentTypes =>
			setEmploymentTypes(employmentTypes)
		)
	}, [])

	return (
		<CreateContractFormWrapper step='2' title='Подробности работы'>
			<div className={styles.form_container}>
				<Input
					id='workNumber'
					value={workPhoneNumber}
					onChange={e => updateFields({ workPhoneNumber: e.target.value })}
				>
					Рабочий телефон:
				</Input>
				<div className={styles.selectContainer}>
					<InputLabel
						style={{ fontSize: '12px' }}
						className={styles.selectContainer_label}
						id='deparment'
					>
						Отдел:
					</InputLabel>
					<Select
						style={{ fontSize: '12px' }}
						disableUnderline
						className={styles.selectContainer_select}
						variant='standard'
						labelId='deparment'
						value={departmentId}
						label='Age'
						onChange={e => {
							updateFields({ departmentId: e.target.value })
						}}
					>
						{departments.map(department => (
							<MenuItem key={department.id} value={department.id}>
								{department.name}
							</MenuItem>
						))}
					</Select>
				</div>
				<div className={styles.selectContainer}>
					<InputLabel
						style={{ fontSize: '12px' }}
						className={styles.selectContainer_label}
						id='deparment'
					>
						Контракт:
					</InputLabel>
					<Select
						style={{ fontSize: '12px' }}
						disableUnderline
						className={styles.selectContainer_select}
						variant='standard'
						labelId='deparment'
						value={contactTypeId}
						label='Age'
						onChange={e => {
							updateFields({ contactTypeId: e.target.value })
						}}
					>
						{contracts.map(contract => (
							<MenuItem key={contract.id} value={contract.id}>
								{contract.name}
							</MenuItem>
						))}
					</Select>
				</div>
				<div className={styles.selectContainer}>
					<InputLabel
						style={{ fontSize: '12px' }}
						className={styles.selectContainer_label}
						id='deparment'
					>
						Должность:
					</InputLabel>
					<Select
						style={{ fontSize: '12px' }}
						disableUnderline
						className={styles.selectContainer_select}
						variant='standard'
						labelId='deparment'
						value={positionId}
						label='Age'
						onChange={e => {
							updateFields({ positionId: e.target.value })
						}}
					>
						{positions.map(position => (
							<MenuItem key={position.id} value={position.id}>
								{position.name}
							</MenuItem>
						))}
					</Select>
				</div>
				<div className={styles.selectContainer}>
					<InputLabel
						style={{ fontSize: '12px' }}
						className={styles.selectContainer_label}
						id='deparment'
					>
						Занятость:
					</InputLabel>
					<Select
						style={{ fontSize: '12px' }}
						disableUnderline
						className={styles.selectContainer_select}
						variant='standard'
						labelId='deparment'
						value={employmentTypeId}
						label='Age'
						onChange={e => {
							updateFields({ employmentTypeId: e.target.value })
						}}
					>
						{employmentTypes.map(employmentType => (
							<MenuItem
								className={styles.selectContainer_select_item}
								key={employmentType.id}
								value={employmentType.id}
							>
								{employmentType.name}
							</MenuItem>
						))}
					</Select>
				</div>
			</div>
		</CreateContractFormWrapper>
	)
}

export default CreateContractWorkForm
