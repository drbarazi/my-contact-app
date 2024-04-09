import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
} from 'react-native';
import { Colors, Fonts } from '@theme';

const Loading = ({ visible = false }) => {
    const { width, height } = useWindowDimensions();
    return (
        visible && (
            <View style={[style.container, { height, width }]}>
                <View style={style.loader}>
                    <ActivityIndicator size="large" color={Colors.PRIMARY} />
                    <Text style={{ marginTop: 12, fontSize: 16, fontFamily: Fonts.TYPE.MEDIUM }}>Processing...</Text>
                </View>
            </View>
        )
    );
};

const style = StyleSheet.create({
    loader: {
        backgroundColor: Colors.WHITE,
        marginHorizontal: 50,
        borderRadius: 5,
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    container: {
        position: 'absolute',
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
    },
});

export default Loading;