import { create } from 'apisauce';

export const api = create({
	baseURL: 'https://contact.herokuapp.com/',
	headers: { Accept: 'application/json' },
});

api.addResponseTransform(response => {
	if (!response.ok) {
		throw new Error(response.data);
	}
});
