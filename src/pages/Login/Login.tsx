'use client'
import React, { FormEventHandler } from 'react'
import styles from './login.module.scss'
import Input from '@/components/ui/Input/Input'
import ButtonSubmit from '@/components/ui/ButtonSubmit/ButtonSubmit'
import { useRouter } from 'next/navigation'

export default function Login() {
	const router = useRouter()

	const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
		event.preventDefault()
		console.log('авторизован')
	}

	return (
		<div className={`container ${styles.login}`}>
			<form onSubmit={handleSubmit} className={styles.form}>
				<h2>Авторизация</h2>
				<div className={styles.inputContainer}>
					<Input type='text' name='email'>
						Логин:
					</Input>
					<Input type='password' name='password'>
						Пароль:
					</Input>
				</div>
				<ButtonSubmit style={{ fontWeight: '700' }}>Авторизация</ButtonSubmit>
			</form>
		</div>
	)
}
