'use client'

import React, { useEffect, useState } from 'react'
import styles from './createContract.module.scss'

import CreateContractForm from '@/components/CreateContractForm/CreateContractForm'
import CreateContractStatusBar from '@/components/CreateContractStatusBar/CreateContractStatusBar'
import { useAuth } from '@/context/auth-context'
import { notFound } from 'next/navigation'
import { MoonLoader } from 'react-spinners'
const Page = () => {
	const [currentStep, setCurrentStep] = useState<number>(1)
	const { user, loading } = useAuth()
	const [isChecking, setIsChecking] = useState(true)

	useEffect(() => {
		if (!loading) {
			if (user?.position?.name !== 'HR Специалист') {
				notFound()
			}
			setIsChecking(false)
		}
	}, [user, loading])

	if (loading || isChecking) {
		return (
			<div
				style={{
					width: '100%',
					display: 'flex',
					height: '200px',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<MoonLoader size={32} />
			</div>
		)
	}

	return (
		<div className={`${styles.page} container`}>
			<div className={styles.page_heading}>
				<h1 className={styles.page_heading_title}>Добавить сотрудника</h1>
				<p className={styles.page_heading_descr}>
					Создайте контракт для сотрудника
				</p>
			</div>
			<CreateContractStatusBar currentStep={currentStep} />
			<CreateContractForm
				currentStep={currentStep}
				setCurrentStep={setCurrentStep}
			/>
		</div>
	)
}

export default Page
