import { api } from '@api/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export type ContactItem = {
	id: string;
	firstName: string;
	lastName: string;
	age: number;
	photo: string;
};

export type ContactState = {
	list: ContactItem[];
	fetching: boolean;
	errorMessage?: string;
	contact?: ContactItem;
};

const initialState: ContactState = {
	list: [],
	fetching: true,
	errorMessage: undefined,
	contact: undefined
};

export const fetchContact = createAsyncThunk('contactItems', async () => {
	const response = await api.get<{ data: ContactItem[] }>('contact');
	return response.data?.data;
});

export const saveContact = createAsyncThunk(
	'contact/save',
	async ({ firstName, lastName, age, photo }: { firstName: string, lastName: string, age: number, photo: string }) => {
		const params = {
			firstName: firstName,
			lastName: lastName,
			age: age,
			photo: photo
		}
		const response = await api.post('contact', params);
		return response.ok
	})

export const getContact = createAsyncThunk(
	'contact/get',
	async ({ contactId }: { contactId: string }) => {

		const response = await api.get(`contact/${contactId}`);
		return response.data?.data;
	})

export const modifyContact = createAsyncThunk(
	'contact/modify',
	async ({ contactId, firstName, lastName, age, photo }: { contactId: string, firstName: string, lastName: string, age: number, photo: string }) => {
		const params = {
			firstName: firstName,
			lastName: lastName,
			age: age,
			photo: photo
		}
		const response = await api.put(`contact/${contactId}`, params);
		return response.ok
	})

export const deleteContact = createAsyncThunk('contact/delete', async ({ contactId }: { contactId: string }) => {
	const response = await api.delete(`contact/${contactId}`);
	return response.ok;
});

export const contactSlice = createSlice({
	name: 'contact',
	initialState,
	reducers: {
		resetContact(state) {
			return {
				...state,
				contact: undefined
			};
		},
	},
	extraReducers(builder) {
		builder.addCase(fetchContact.pending, (state, _) => {
			state.fetching = true;
			state.errorMessage = undefined;
		});
		builder.addCase(fetchContact.fulfilled, (state, action: any) => {
			state.fetching = false;
			state.list = action.payload;
		});
		builder.addCase(fetchContact.rejected, (state, action) => {
			state.fetching = false;
			state.errorMessage = action.error.message;
		});
		builder.addCase(saveContact.pending, (state, _) => {
			state.fetching = true;
			state.errorMessage = undefined;
		})
		builder.addCase(saveContact.fulfilled, (state, action: any) => {
			state.fetching = false;
		})
		builder.addCase(saveContact.rejected, (state, action) => {
			state.fetching = false;
			state.errorMessage = action.error.message;
		});
		builder.addCase(getContact.pending, (state, _) => {
			state.fetching = true;
			state.errorMessage = undefined;
		})
		builder.addCase(getContact.fulfilled, (state, action: any) => {
			state.fetching = false;
			state.contact = action.payload;
		})
		builder.addCase(getContact.rejected, (state, action) => {
			state.fetching = false;
			state.errorMessage = action.error.message;
		});
		builder.addCase(modifyContact.pending, (state, _) => {
			state.fetching = true;
			state.errorMessage = undefined;
		})
		builder.addCase(modifyContact.fulfilled, (state, action: any) => {
			state.fetching = false;
		})
		builder.addCase(modifyContact.rejected, (state, action) => {
			state.fetching = false;
			state.errorMessage = action.error.message;
		});
		builder.addCase(deleteContact.pending, (state, _) => {
			state.fetching = true;
			state.errorMessage = undefined;
		})
		builder.addCase(deleteContact.fulfilled, (state, action) => {
			state.fetching = false;
			state.list = state.list.filter(contact => contact.id !== action.meta.arg.contactId);

		})
		builder.addCase(deleteContact.rejected, (state, action) => {
			state.fetching = false;
			state.list = state.list.filter(contact => contact.id !== action.meta.arg.contactId);
			state.errorMessage = action.error.message;
		});
	},
});

export const { resetContact } = contactSlice.actions

export default contactSlice.reducer;
