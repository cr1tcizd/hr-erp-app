'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { IUser } from '@/types/IUser'
import { getUser } from '@/api/userAPI'
import { useRouter } from 'next/navigation'

interface AuthContextType {
	user: IUser | null
	loading: boolean
	setUser: (user: IUser | null) => void
}

const AuthContext = createContext<AuthContextType>({
	user: null,
	loading: true,
	setUser: () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<IUser | null>(null)
	const [loading, setLoading] = useState(true)

	const router = useRouter()

	useEffect(() => {
		const loadUser = async () => {
			try {
				const user = await getUser('me')
				setUser(user)
				setLoading(false)
			} catch (error: any) {
				if (error.status === 401) {
					router.push('/signin')
				}
			}
		}

		loadUser()
	}, [])

	return (
		<AuthContext.Provider value={{ user, loading, setUser }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)
