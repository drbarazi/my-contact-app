import { fetchContact } from '@redux/Reducer/ContactReducer';
import { useAppDispatch } from '@redux/hooks';
import { Colors, Fonts } from '@theme';
import LottieView from 'lottie-react-native';
import React, { useEffect, useRef } from 'react';
import { Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

const SplashScreen = () => {
	const animation = useRef<LottieView>(null);
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(fetchContact());
		setTimeout(() => {
			animation?.current?.play();
		}, 700)
	}, [])

	return (
		<View style={{ flex: 1, backgroundColor: Colors.PRIMARY, justifyContent: 'center', alignItems: 'center' }}>
			<Animated.View entering={FadeInDown.delay(300).duration(600)} style={{ marginTop: 24 }}>
				<LottieView
					autoPlay={false}
					loop={false}
					ref={animation}
					style={{
						width: 250,
						height: 250,
						backgroundColor: 'rgba(0,0,0,0)',
					}}
					source={require('@assets/lotties/contact.json')}
				/>
			</Animated.View>
			<Animated.View entering={FadeInDown.delay(600).duration(600)} style={{ marginTop: 24 }}>
				<Text style={{ fontFamily: Fonts.TYPE.BOLD, fontSize: Fonts.SIZE.H1, color: Colors.WHITE }}>CONTACT</Text>
			</Animated.View>
		</View>
	)
}

export default SplashScreen