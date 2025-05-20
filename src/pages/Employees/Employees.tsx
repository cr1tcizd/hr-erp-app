'use client'

import { useEffect } from 'react'
import { getSearchedUsers, getUsers } from '@/api/userAPI'
import styles from './employees.module.scss'

import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'

import EmployeeItem from '@/components/EmployeerItem/EmployeeItem'
import Link from 'next/link'
import { MoonLoader } from 'react-spinners'
import useEmployees from '@/hooks/useEmployees'
import { Header } from '@/widgets/header'
import { motion } from 'framer-motion'
import { useAuth } from '@/context/auth-context'

export default function Employees() {
	const { error, loading, users, setUsers } = useEmployees()
	const { user: currentUser, loading: authLoading } = useAuth()
	const handleSearchName = (name: any) => {
		getSearchedUsers(name).then(users => setUsers(users))
	}

	useEffect(() => {
		getUsers().then(users => setUsers(users))
	}, [])

	console.log(currentUser)

	if (authLoading)
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

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 20 }}
			className={`${styles.page} container`}
		>
			<Header />

			{currentUser?.position?.name === 'HR Специалист' ? (
				<div className={styles.newEmpl}>
					<h1 className={styles.newEmpl_title}>Сотрудники</h1>
					<p className={styles.newEmpl_descr}>Управляй своими сотрудниками</p>
					<Link
						href='/employees/create-contract'
						className={styles.newEmpl_btn}
					>
						<AddIcon />
						Добавить сотрудника
					</Link>
				</div>
			) : (
				<div className={styles.newEmpl}>
					<h1 className={styles.newEmpl_title}>Сотрудники</h1>
				</div>
			)}

			<div className={styles.manageSection}>
				<h1 className={styles.manageSection_title}>Управление работниками</h1>
				<div className={styles.manageSection_searchCon}>
					<div className={styles.manageSection_inpCont}>
						<input
							className={styles.manageSection_inpCont_input}
							type='text'
							placeholder='Поиск сотрудника...'
							onChange={e => {
								handleSearchName(e.target.value)
							}}
						/>
						<SearchIcon className={styles.manageSection_inpCont_icon} />
					</div>
				</div>
				<div>
					{loading ? (
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
					) : (
						users.map(user => (
							<EmployeeItem key={user.id} user={user} setUsers={setUsers} />
						))
					)}
				</div>
			</div>
		</motion.div>
	)
}
