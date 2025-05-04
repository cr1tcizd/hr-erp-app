export const URL =
	'https://dev.shuvi.keenetic.link/api/v1/employees/550e8400-e29b-41d4-a716-446655440000'

export const getUser = async (id: string) => {
	try {
		const response = await fetch(
			'https://dev.shuvi.keenetic.link/api/v1/employees/' + id
		)

		if (response.status !== 200) {
			throw new Error((await response.json()).message)
		}

		return await response.json()
	} catch (error) {
		console.error(error)
	}
}

export const getUsers = async () => {
	try {
		const response = await fetch(
			'https://dev.shuvi.keenetic.link/api/v1/employees'
		)
		return await response.json()
	} catch (error) {
		console.error(error)
	}
}

export const uploadImage = async (file: File) => {
	const formData = new FormData()
	formData.append('file', file)

	const response = await fetch(
		'https://dev.shuvi.keenetic.link/api/v1/images',
		{
			method: 'POST',
			body: formData,
		}
	)
	return await response.json()
}

export const putUser = async (data: any) => {
	return await fetch('https://dev.shuvi.keenetic.link/api/v1/employees', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json; charset=UTF-8',
		},
	})
}

export const getDepartment = async () => {
	const response = await fetch(
		'https://dev.shuvi.keenetic.link/api/v1/department',
		{}
	)
	return await response.json()
}

export const getPositions = async () => {
	const response = await fetch(
		'https://dev.shuvi.keenetic.link/api/v1/positions',
		{}
	)
	return await response.json()
}

export const getContractTypes = async () => {
	const response = await fetch(
		'https://dev.shuvi.keenetic.link/api/v1/contact/types',
		{}
	)
	return await response.json()
}

export const getEmploymentTypes = async () => {
	const response = await fetch(
		'https://dev.shuvi.keenetic.link/api/v1/employment/types',
		{}
	)
	return await response.json()
}

export const deleteEmployee = async (id: string) => {
	return await fetch('https://dev.shuvi.keenetic.link/api/v1/employees/' + id, {
		method: 'DELETE',
	})
}
