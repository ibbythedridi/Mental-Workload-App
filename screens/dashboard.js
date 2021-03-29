import React from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';
import { globalStyles } from '../styles/global';

export default function Dashboard({ navigation }) {

    return (
        <View style={globalStyles.container}>
            <Text>Dashboard</Text>
            <Button title='ISA' onPress={() => navigation.navigate('ISA')} />
            <View style={{ height: 20 }} />
            <Button title='Screen Time' onPress={() => navigation.navigate('ScreenTime')} />
            <View style={{ height: 20 }} />
            <Button title='Sleep' onPress={() => navigation.navigate('Sleep')} />
            <View style={{ height: 20 }} />
            <Button title='Settings' onPress={() => navigation.navigate('Settings')} />
        </View>
    )
}