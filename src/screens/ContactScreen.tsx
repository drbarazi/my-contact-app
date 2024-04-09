import Loading from '@components/Loading'
import { RootStackScreenProps } from '@navigation/types'
import { ContactItem, deleteContact, fetchContact, getContact } from '@redux/Reducer/ContactReducer'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { Colors, Fonts } from '@theme'
import { Add, Edit2, SearchNormal, Trash } from 'iconsax-react-native'
import React, { useEffect, useState } from 'react'
import { Alert, FlatList, Image, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { Swipeable, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Animated, { FadeInRight, FadeOutRight, LinearTransition } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Modal from 'react-native-modal';

const ContactScreen = ({ route, navigation }: RootStackScreenProps<'Contact'>) => {
	const insets = useSafeAreaInsets();
	const dispatch = useAppDispatch();
	const defaultImg = require('../assets/images/profile.png')
	const contacts = useAppSelector((state) => state.contacts)
	const { list } = contacts;
	const [data, setData] = useState(list)
	const [search, onChangeSearch] = useState('');
	const [loading, setLoading] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const [selectedContact, setSelectedContact] = useState({
		firstName: '',
		lastName: '',
		age: 0,
		photo: '',
	});
	let row: Array<any> = [];
	let prevOpenedRow: any;

	useEffect(() => {
		setData(list)
	}, [list])

	const handleSearch = (keyword: string) => {
		onChangeSearch(keyword)
		let query = keyword.toLowerCase();
		const dataFilter = list.filter(item => item.lastName.toLowerCase().indexOf(query) >= 0 || item.firstName.toLowerCase().indexOf(query) >= 0);
		setData(dataFilter)
	}

	const handleDelete = async (contactId: string) => {
		setLoading(true);
		try {
			await dispatch(deleteContact({ contactId }));
			await dispatch(fetchContact());
			setTimeout(() => {
				setLoading(false);
			}, 1000);
		} catch (error) {
			Alert.alert('Error', 'Something went wrong');
		}
	};

	const handleDetail = (index, contact) => {
		closeRow(index)
		setSelectedContact({
			firstName: contact.firstName,
			lastName: contact.lastName,
			age: contact.age,
			photo: contact.photo,
		})
		setIsVisible(true)
	}

	const closeRow = (index: number) => {
		if (prevOpenedRow && prevOpenedRow !== row[index]) {
			prevOpenedRow.close();
		}
		prevOpenedRow = row[index];
	};

	const renderItem = ({ item, index }: { item: ContactItem; index: number }) => {

		const renderRightActions = (progress: any, dragX: any) => {
			return (
				<View style={{ justifyContent: 'flex-end', flexDirection: 'row', marginBottom: 12, borderRadius: 8, marginHorizontal: 16 }}>
					<TouchableOpacity
						onPress={async () => {
							prevOpenedRow.close();
							await dispatch(getContact({ contactId: item.id }))
							navigation.navigate('ModifyContact', { contactId: item.id })
						}}
						style={styles.btnEdit}>
						<Edit2
							size="28"
							color={Colors.WHITE}
							variant="Bold"
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => { handleDelete(item.id) }}
						style={styles.btnDelete}>
						<Trash size="28" color={Colors.WHITE} variant="Bold" />
					</TouchableOpacity>
				</View>
			);
		};

		return (
			<Animated.View key={item.id}
				entering={FadeInRight.delay(300 * index).duration(300)}
				exiting={FadeOutRight.duration(300)}
				layout={LinearTransition.delay(100)}
			>
				<Swipeable
					renderRightActions={(progress, dragX) =>
						renderRightActions(progress, dragX)
					}
					onSwipeableOpen={() => closeRow(index)}
					ref={(ref) => (row[index] = ref)}
				>
					<TouchableWithoutFeedback onPress={() => {
						handleDetail(index, item)
					}}
						style={{ padding: 12, backgroundColor: Colors.SECONDARY, marginBottom: 12, borderRadius: 8, marginHorizontal: 16 }}>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<View style={{ width: 60, height: 60, overflow: 'hidden', borderRadius: 4, marginRight: 16 }}>
								<Image source={{ uri: item.photo }} defaultSource={defaultImg} style={{ width: 60, height: 60, borderRadius: 50 }} />
							</View>
							<View style={{ flex: 1 }}>
								<Text numberOfLines={1} style={{ fontFamily: Fonts.TYPE.MEDIUM, fontSize: Fonts.SIZE.H5, color: Colors.BLACK, marginBottom: 4 }}>{item.firstName} {item.lastName}</Text>
								<Text style={{ fontFamily: Fonts.TYPE.MEDIUM, fontSize: Fonts.SIZE.MD, color: Colors.GRAY_500 }}>{item.age} years old</Text>
							</View>
						</View>
					</TouchableWithoutFeedback>
				</Swipeable>
			</Animated.View>
		)
	};

	return (
		<View style={styles.container}>
			<View style={[styles.containerTop, { paddingTop: Platform.OS === "ios" ? insets.top : 18 }]}>
				<View></View>
				<Text style={{ fontFamily: Fonts.TYPE.SEMIBOLD, fontSize: Fonts.SIZE.XL, color: Colors.WHITE }}>Contacts</Text>
				<TouchableOpacity onPress={() => navigation.navigate('AddContact')}>
					<Add size="28" color={Colors.WHITE} />
				</TouchableOpacity>
			</View>
			<Loading visible={loading} />
			<View style={{ flexDirection: 'row', backgroundColor: Colors.WHITE, alignItems: 'center', paddingHorizontal: 24, paddingVertical: 4, justifyContent: 'center' }}>
				<SearchNormal size="24" color={Colors.GRAY_500} />
				<TextInput
					style={styles.input}
					onChangeText={text => handleSearch(text)}
					value={search}
					placeholder="Search your contact"
					placeholderTextColor={Colors.GRAY_500}
				/>
			</View>
			<FlatList
				style={{ paddingTop: 12 }}
				contentContainerStyle={{ paddingBottom: 50 }}
				data={data}
				renderItem={renderItem}
				showsVerticalScrollIndicator={false}
				numColumns={1}
				keyExtractor={(item, index) => item.id}
			/>
			<Modal
				isVisible={isVisible}
				style={{ flex: 1, justifyContent: 'center' }}>
				<View style={{ borderRadius: 16, paddingVertical: 22, paddingHorizontal: 16, backgroundColor: 'white' }}>
					<View style={{ alignItems: 'center' }}>
						<View style={{ width: 80, height: 80, overflow: 'hidden', borderRadius: 80 / 2, marginRight: 16 }}>
							<Image source={{ uri: selectedContact.photo }} defaultSource={defaultImg} style={{ width: 80, height: 80, borderRadius: 80 / 2 }} />
						</View>
						<Text style={{ fontFamily: Fonts.TYPE.BOLD, fontSize: Fonts.SIZE.H2, color: Colors.BLACK, marginTop: 8 }}>{selectedContact.firstName} {selectedContact.lastName}</Text>
						<Text style={{ fontFamily: Fonts.TYPE.MEDIUM, fontSize: Fonts.SIZE.MD, color: Colors.GRAY_500 }}>{selectedContact.age} years old</Text>
					</View>
					<Pressable onPress={() => setIsVisible(false)} style={{ backgroundColor: Colors.PRIMARY, alignItems: 'center', paddingVertical: 12, borderRadius: 8, marginTop: 36 }}>
						<Text style={{ fontFamily: Fonts.TYPE.BOLD, fontSize: Fonts.SIZE.MD, color: Colors.WHITE }}>Close</Text>
					</Pressable>
				</View>
			</Modal>
		</View>
	)
}

export default ContactScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.PRIMARY_10
	},
	containerTop: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: Colors.PRIMARY,
		paddingHorizontal: 24,
		paddingBottom: 18,
		alignItems: 'center'
	},
	input: {
		fontSize: Fonts.SIZE.MD,
		fontFamily: Fonts.TYPE.MEDIUM,
		padding: 10,
	},
	btnEdit: {
		backgroundColor: Colors.SUCCESS,
		justifyContent: "center",
		alignItems: "flex-end",
		borderRadius: 8,
		height: "100%",
		paddingHorizontal: 18,
		marginRight: 12,
	},
	btnDelete: {
		backgroundColor: "#ff0000",
		justifyContent: "center",
		alignItems: "flex-end",
		borderRadius: 8,
		height: "100%",
		paddingHorizontal: 18
	}
})