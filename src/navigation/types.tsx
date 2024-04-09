import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
	Splash: undefined;
	Contact: undefined;
	AddContact: undefined;
	ModifyContact: {
		contactId: string;
	}
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
	NativeStackScreenProps<RootStackParamList, T>;

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList { }
	}
}
