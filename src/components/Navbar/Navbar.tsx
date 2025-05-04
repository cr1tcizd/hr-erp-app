import React from 'react'
import styles from './navbar.module.scss'
import Button from '@/components/ui/Button/Button'
import Image from 'next/image'

import logo from './../../assets/logo.jpg'

import MenuIcon from '@mui/icons-material/Menu'

const Navbar = () => {
	return (
		<div className={styles.navbar}>
			<div className={styles.navbar_logoCon}>
				<Image className={styles.navbar_logoCon_img} src={logo} alt={'Logo'} />
				<strong className={styles.navbar_logoCon_title}>VibeManager</strong>
			</div>
			<Button>
				<MenuIcon className={styles.navbar_btn_icon} />
			</Button>
		</div>
	)
}

export default Navbar
