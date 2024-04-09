import AppNavigation from '@navigation/AppNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { persistor, store } from '@redux/store';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

function App(): JSX.Element {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<SafeAreaProvider>
					<GestureHandlerRootView style={{ flex: 1 }}>
						<NavigationContainer>
							<AppNavigation />
						</NavigationContainer>
					</GestureHandlerRootView>
				</SafeAreaProvider>
			</PersistGate>
		</Provider >
	);
}

export default App;
