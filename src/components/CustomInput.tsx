import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Colors, Fonts } from '@theme';
const CustomInput = ({
    label,
    icon,
    error,
    onFocus = () => { },
    ...props
}) => {
    const [isFocused, setIsFocused] = React.useState(false);
    return (
        <View style={{ marginBottom: 20 }}>
            <Text style={style.label}>{label}</Text>
            <View
                style={[
                    style.inputContainer,
                    {
                        borderColor: error
                            ? Colors.DANGER
                            : isFocused
                                ? Colors.PRIMARY
                                : Colors.PRIMARY_10,
                        alignItems: 'center',
                    },
                ]}>
                <View style={{ marginRight: 10 }}>
                    {icon}
                </View>
                <TextInput
                    autoCorrect={false}
                    onFocus={() => {
                        onFocus();
                        setIsFocused(true);
                    }}
                    onBlur={() => setIsFocused(false)}
                    style={{ color: Colors.PRIMARY, flex: 1, fontFamily: Fonts.TYPE.MEDIUM, }}
                    {...props}
                />

            </View>
            {error && (
                <Text style={{ marginTop: 7, color: Colors.DANGER, fontSize: 12 , fontFamily: Fonts.TYPE.SEMIBOLD,}}>
                    {error}
                </Text>
            )}
        </View>
    );
};

const style = StyleSheet.create({
    label: {
        marginVertical: 5,
        fontFamily: Fonts.TYPE.MEDIUM,
        fontSize: 16,
        color: Colors.PRIMARY,
    },
    inputContainer: {
        height: 55,
        backgroundColor: Colors.PRIMARY_10,
        flexDirection: 'row',
        paddingHorizontal: 15,
        borderWidth: 0.5,
        borderRadius: 8,
    },
});

export default CustomInput;