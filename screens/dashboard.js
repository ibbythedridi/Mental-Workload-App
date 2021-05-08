import React, {useContext} from 'react';
import {
    View,
} from 'react-native';
import { globalStyles } from '../styles/global';
import DButton from '../components/button';
import AppContext from '../components/AppContext';

export default function Dashboard({ navigation }) {

    const myContext = useContext(AppContext);

    return (
        <View style={globalStyles.container}>
            <DButton text='ISA' onPress={() => navigation.navigate('ISA')} />
            <DButton text='Screen Time' onPress={() => navigation.navigate('ScreenTime')} />
            <DButton text='Sleep' onPress={() => navigation.navigate('Sleep')} />
            {myContext.debugMode && (
                <DButton text='Add Data' onPress={() => navigation.navigate('AddData')} />
            )}
            <DButton text='Settings' onPress={() => navigation.navigate('Settings')} />
        </View>
    )
}