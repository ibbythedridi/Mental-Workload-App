import React from 'react';
import {
    View,
    Button
} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { globalStyles } from '../styles/global';

export default function AddData({ navigation }) {
    return (
        <View style={globalStyles.container}>
            <Button title='Add ISA Data' onPress={() => navigation.navigate('AddISA')} />
            <View style={{ height: 20 }} />
            <Button title='Add Screen Time Data' onPress={() => navigation.navigate('AddScreenTime')} />
            <View style={{ height: 20 }} />
            <Button title='Add Sleep Data' onPress={() => navigation.navigate('AddSleep')} />

            <FlashMessage position='bottom' />
        </View>
    )
}