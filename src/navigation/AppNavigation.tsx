import { RootStackParamList } from '@navigation/types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddContactScreen from '@screens/AddContactScreen';
import ContactScreen from '@screens/ContactScreen';
import ModifyContactScreen from '@screens/ModifyContactScreen';
import SplashScreen from '@screens/SplashScreen';
import React from 'react';

const AppStack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation = () => {
	const [isLoading, setIsLoading] = React.useState(true);
	setTimeout(() => {
		setIsLoading(false)
	}, 2500);

	return (
		<AppStack.Navigator screenOptions={{ headerShown: false }}>
			{
				isLoading ?
					<AppStack.Screen
						name='Splash'
						component={SplashScreen}
						options={{
							headerShown: false,
						}}
					/>
					:
					<AppStack.Screen
						name='Contact'
						component={ContactScreen}
						options={{
							headerShown: false,
						}}
					/>
			}
			<AppStack.Screen
				name='AddContact'
				component={AddContactScreen}
				options={{
					headerShown: false
				}}
			/>
			<AppStack.Screen
				name='ModifyContact'
				component={ModifyContactScreen}
				options={{
					headerShown: false
				}}
			/>
		</AppStack.Navigator>
	);
};

export default AppNavigation;