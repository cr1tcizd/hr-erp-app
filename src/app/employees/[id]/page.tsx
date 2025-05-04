'use client'
import Profile from '@/pages/Profile/Profile'
import { useParams, useSearchParams } from 'next/navigation'
import React from 'react'

export default function page() {
	const params = useParams()

	return <Profile id={params?.id} />
}
