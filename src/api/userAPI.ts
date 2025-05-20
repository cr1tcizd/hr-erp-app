import { IUser } from '@/types/IUser'

class ApiError extends Error {
	constructor(
		message: string,
		public status: number,
		public data?: any
	) {
		super(message)
		this.name = 'ApiError'
	}
}

export const URL = 'https://dev.shuvi.keenetic.link'
const handleResponse = (response: Response) => {
	if (!response.ok) {
		if (response.status === 401) {
			window.location.href = '/signin'
		}
		throw new Error('Request failed')
	}

	return response.json()
}

export const getUser = async (id: string): Promise<IUser> => {
	try {
		const response = await fetch(`${URL}/api/v1/employees/${id}`, {
			credentials: 'include',
		})

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}))

			throw new ApiError(
				errorData?.message || 'Ошибка при загрузке пользователя',
				response.status,
				errorData
			)
		}

		return await response.json()
	} catch (error) {
		console.error('Ошибка в getUser:', error)
		throw error
	}
}

export const getUsers = async (): Promise<IUser[]> => {
	try {
		const response = await fetch(`${URL}/api/v1/employees`, {
			credentials: 'include',
		})
		return await handleResponse(response)
	} catch (error) {
		console.log(error)
		return []
	}
}

export const getSearchedUsers = async (name: string): Promise<IUser[]> => {
	try {
		const response = await fetch(`${URL}/api/v1/employees?name=${name}`, {
			credentials: 'include',
		})
		return await handleResponse(response)
	} catch (error) {
		return []
	}
}

export const getTimesheets = async () => {
	try {
		const response = await fetch(`${URL}/api/v1/timesheets`, {
			credentials: 'include',
		})
		return await handleResponse(response)
	} catch (error) {
		console.error(error)
	}
}

export const getCategories = async () => {
	try {
		const response = await fetch(`${URL}/api/v1/categories`, {
			credentials: 'include',
		})
		return await handleResponse(response)
	} catch (error) {
		console.error(error)
	}
}

export const uploadImage = async (file: File) => {
	const formData = new FormData()
	formData.append('file', file)

	const response = await fetch(`${URL}/api/v1/images`, {
		credentials: 'include',
		method: 'POST',
		body: formData,
	})
	return await response.json()
}

export const createUser = async (data: any) => {
	const response = await fetch(`${URL}/api/v1/employees`, {
		credentials: 'include',
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json; charset=UTF-8',
		},
	})

	if (!response.ok) {
		const errorData = await response.json()
		throw new Error(errorData.message || 'Ошибка при создании контракта')
	}

	return await response.json()
}

export const updateUser = async (data: any, id: any) => {
	const response = await fetch(`${URL}/api/v1/employees/${id}`, {
		credentials: 'include',
		method: 'PUT',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json; charset=UTF-8',
		},
	})
	if (!response.ok) {
		const errorData = await response.json()
		throw new Error(errorData.message || 'Ошибка при изменении пользователя')
	}
	return await response.json()
}

export const getStatsTimesheets = async (id: any) => {
	try {
		const response = await fetch(
			`${URL}/api/v1/timesheets/stats/employee/${id}`,
			{
				credentials: 'include',
			}
		)
		return await handleResponse(response)
	} catch (error) {
		console.error(error)
	}
}

export const createTimesheet = async (data: any) => {
	const response = await fetch(`${URL}/api/v1/timesheets`, {
		credentials: 'include',
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json; charset=UTF-8',
		},
	})
	if (!response.ok) {
		const errorData = await response.json()
		throw new Error(errorData.message || 'Ошибка при создании таймшита')
	}
	return await response.json()
}

export const editTimesheet = async (data: any, id: any) => {
	const response = await fetch(`${URL}/api/v1/timesheets/${id}`, {
		credentials: 'include',
		method: 'PUT',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json; charset=UTF-8',
		},
	})
	if (!response.ok) {
		const errorData = await response.json()
		throw new Error(errorData.message || 'Ошибка при изменении таймшита')
	}
	return await response.json()
}

export const deleteTimesheet = async (id: any) => {
	return await fetch(`${URL}/api/v1/timesheets/${id}`, {
		credentials: 'include',
		method: 'DELETE',
	})
}

export const getDepartment = async () => {
	const response = await fetch(`${URL}/api/v1/departments`, {
		credentials: 'include',
	})
	return await response.json()
}

export const getPositions = async () => {
	const response = await fetch(`${URL}/api/v1/positions`, {
		credentials: 'include',
	})
	return await response.json()
}

export const getContractTypes = async () => {
	const response = await fetch(`${URL}/api/v1/contact/types`, {
		credentials: 'include',
	})
	return await response.json()
}

export const getEmploymentTypes = async () => {
	const response = await fetch(`${URL}/api/v1/employment/types`, {
		credentials: 'include',
	})
	return await response.json()
}

export const deleteEmployee = async (id: string) => {
	return await fetch(`${URL}/api/v1/employees/` + id, {
		credentials: 'include',
		method: 'DELETE',
	})
}
