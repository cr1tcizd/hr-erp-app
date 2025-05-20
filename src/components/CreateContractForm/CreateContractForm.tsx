import React, { FormEvent, useEffect, useState } from 'react'
import CreateContractUserForm from '@/components/CreateContractUserForm/CreateContractUserForm'
import CreateContractWorkForm from '@/components/CreateContractWorkForm/CreateContractWorkForm'
import { useMultistepForm } from '@/hooks/useMultistepForm'
import { createUser } from '@/api/userAPI'
import ButtonSubmit from '@/components/ui/ButtonSubmit/ButtonSubmit'
import styles from './createContractForm.module.scss'
import { useRouter } from 'next/navigation'
//   "email": "user@example.com",
//   "name": "John Doe",
//   "positionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//   "birthDate": "1990-05-15",
//   "workPhoneNumber": "+1-202-555-0145",
//   "phoneNumber": "+1-202-555-0123",
//   "imageUrl": "https://example.com/image.jpg",
//   "departmentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//   "contactTypeId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//   "employmentTypeId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"

interface CreateContractFormProps {
	currentStep: number
	setCurrentStep: React.Dispatch<React.SetStateAction<number>>
}

export interface MyForm {
	email: string
	name: string
	positionId: string
	birthDate: string
	workPhoneNumber: string
	phoneNumber: string
	imageUrl: string
	departmentId: string
	contactTypeId: string
	employmentTypeId: string
}

const INITIAL_DATA = {
	email: '',
	name: '',
	positionId: '',
	birthDate: '',
	workPhoneNumber: '',
	phoneNumber: '',
	imageUrl: '',
	departmentId: '',
	contactTypeId: '',
	employmentTypeId: '',
}

const CreateContractForm = ({ setCurrentStep }: CreateContractFormProps) => {
	const [data, setData] = useState(INITIAL_DATA)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)
	const router = useRouter()

	const updateFields = (fields: Partial<MyForm>) => {
		setData(prev => {
			return { ...prev, ...fields }
		})
	}

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault()
		setError(null)
		if (!isLastStep) return next()

		setIsLoading(true)
		try {
			await createUser(data)
			alert('Пользователь создан')
			router.push('/employees')
		} catch (error: any) {
			setError(error.message || 'Ошибка создания пользователя')
		} finally {
			setIsLoading(false)
		}
	}

	const { step, next, back, isFirstStep, isLastStep } = useMultistepForm([
		<CreateContractUserForm {...data} updateFields={updateFields} />,
		<CreateContractWorkForm {...data} updateFields={updateFields} />,
	])
	console.log(isFirstStep)

	useEffect(() => {
		isFirstStep ? setCurrentStep(1) : setCurrentStep(2)
	}, [isFirstStep])

	return (
		<form onSubmit={onSubmit}>
			{step}
			<div className={styles.btnContainer}>
				{error && <div className={styles.error}>{error}</div>}

				{!isFirstStep && (
					<ButtonSubmit
						type='button'
						disabled={isLoading}
						onClick={() => {
							back()
						}}
					>
						Назад
					</ButtonSubmit>
				)}
				<ButtonSubmit disabled={isLoading} type='submit'>
					{isLastStep ? 'Сохранить' : 'Далее'}
				</ButtonSubmit>
			</div>
		</form>
	)
}

export default CreateContractForm
