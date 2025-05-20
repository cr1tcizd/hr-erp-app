import React from 'react'
import styles from './header.module.scss'
import Image from 'next/image'

import logo from '@/assets/logo.jpg'
import { useRouter } from 'next/navigation'

const Header = () => {
	const router = useRouter()
	return (
		<div className={styles.navbar}>
			<div className={styles.navbar_logoCon}>
				<Image className={styles.navbar_logoCon_img} src={logo} alt={'Logo'} />
				<strong className={styles.navbar_logoCon_title}>HR Manager</strong>
			</div>
			{/* <button
				style={{
					padding: '6px',
					border: 'none',
					background: 'var(--blue)',
					color: 'white',
					borderRadius: '4px',
				}}
				onClick={() => {
					router.push('/signin')
				}}
			>
				login
			</button> */}
		</div>
	)
}

export default Header
