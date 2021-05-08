import React from 'react';
import {
    View,
} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { globalStyles } from '../styles/global';
import DButton from '../components/button';

export default function AddData({ navigation }) {
    return (
        <View style={globalStyles.container}>
            
            <DButton text='Add ISA Data' onPress={() => navigation.navigate('AddISA')} />
            <DButton text='Add Screen Time Data' onPress={() => navigation.navigate('AddScreenTime')} />
            <DButton text='Add Sleep Data' onPress={() => navigation.navigate('AddSleep')} />

            <FlashMessage position='bottom' />
        </View>
    )
}