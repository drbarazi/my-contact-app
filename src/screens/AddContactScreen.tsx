import CustomButton from '@components/CustomButton'
import CustomInput from '@components/CustomInput'
import Loading from '@components/Loading'
import { RootStackScreenProps } from '@navigation/types'
import { fetchContact, saveContact } from '@redux/Reducer/ContactReducer'
import { useAppDispatch } from '@redux/hooks'
import { Colors, Fonts } from '@theme'
import { ArrowLeft2, Calendar1, Gallery, Personalcard } from 'iconsax-react-native'
import React, { useState } from 'react'
import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const AddContactScreen = ({ route, navigation }: RootStackScreenProps<'AddContact'>) => {
	const insets = useSafeAreaInsets();
	const dispatch = useAppDispatch();
	const [inputs, setInputs] = useState({
		firstName: '',
		lastName: '',
		age: 0,
		photo: '',
	});
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);

	const handleOnchange = (text, input) => {
		let result = text;
		if (input === 'age') {
			result = text.replace(/[^0-9]/g, '')
		}
		setInputs(prevState => ({ ...prevState, [input]: result }));
	};

	const handleError = (error, input) => {
		setErrors(prevState => ({ ...prevState, [input]: error }));
	};

	const validate = () => {
		Keyboard.dismiss();
		let isValid = true;

		if (!inputs.firstName) {
			handleError('Please input first name', 'firstName');
			isValid = false;
		}

		if (!inputs.lastName) {
			handleError('Please input last name', 'lastName');
			isValid = false;
		}

		if (!inputs.age) {
			handleError('Please input your age', 'age');
			isValid = false;
		}

		if (!inputs.photo) {
			handleError('Please input photo url', 'photo');
			isValid = false;
		}

		if (isValid) {
			save();
		}
	};

	const save = async () => {
		setLoading(true);
		try {
			const params = {
				firstName: inputs.firstName,
				lastName: inputs.lastName,
				age: inputs.age,
				photo: inputs.photo
			}
			await dispatch(saveContact(params));
			await dispatch(fetchContact());
			setTimeout(() => {
				setLoading(false);
				navigation.navigate('Contact');
			}, 2000);
		} catch (error) {
			Alert.alert('Error', 'Something went wrong');
		}
	};

	return (
		<View style={{ flex: 1, backgroundColor: Colors.PRIMARY_10 }}>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: Colors.PRIMARY, paddingHorizontal: 24, paddingBottom: 18, alignItems: 'center', paddingTop: Platform.OS === "ios" ? insets.top : 18 }}>
				<TouchableWithoutFeedback onPress={() => navigation.goBack()}>
					<ArrowLeft2 size="28" color={Colors.WHITE} />
				</TouchableWithoutFeedback>
				<Text style={{ fontFamily: Fonts.TYPE.SEMIBOLD, fontSize: Fonts.SIZE.XL, color: Colors.WHITE }}>Add Contact</Text>
				<View></View>
			</View>
			<Loading visible={loading} />
			<KeyboardAvoidingView behavior={Platform.OS === "ios" ? 'padding' : 'height'} style={{ flex: 1, paddingBottom: Platform.OS === "ios" ? 100 : 50}}>
				<ScrollView >
					<View style={{ marginHorizontal: 20, marginTop: 24 }}>
						<CustomInput
							onChangeText={text => handleOnchange(text, 'firstName')}
							onFocus={() => handleError(null, 'firstName')}
							icon={<Personalcard size="24" color={Colors.PRIMARY} />}
							label="First Name"
							placeholder="Enter your first name"
							error={errors.firstName}
							keyboardType='default'
						/>
						<CustomInput
							onChangeText={text => handleOnchange(text, 'lastName')}
							onFocus={() => handleError(null, 'lastName')}
							icon={<Personalcard size="24" color={Colors.PRIMARY} />}
							label="Last Name"
							placeholder="Enter your last name"
							error={errors.lastName}
							keyboardType='default'
						/>
						<CustomInput
							onChangeText={text => handleOnchange(text, 'age')}
							onFocus={() => handleError(null, 'age')}
							icon={<Calendar1 size="24" color={Colors.PRIMARY} />}
							label="Age"
							placeholder="Enter your age"
							error={errors.age}
							keyboardType='numeric'
							value={inputs.age}
						/>
						<CustomInput
							onChangeText={text => handleOnchange(text, 'photo')}
							onFocus={() => handleError(null, 'photo')}
							icon={<Gallery size="24" color={Colors.PRIMARY} />}
							label="Photo Url"
							placeholder="Enter your photo Url"
							error={errors.photo}
							keyboardType='default'
						/>
						<CustomButton title="Save" onPress={validate} />
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</View>
	)
}

export default AddContactScreen