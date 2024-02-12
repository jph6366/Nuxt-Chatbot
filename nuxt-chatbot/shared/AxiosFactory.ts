import axios from 'axios';

const ENDPOINT = 'https://mindful-dog.kipper.workers.dev/'

const axiosFactory = (baseURL: string) => {
	return axios.create({
		baseURL,
		timeout: 30000,
	})
}

const APIAxios = axiosFactory(ENDPOINT)

export { APIAxios }