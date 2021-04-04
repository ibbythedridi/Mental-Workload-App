import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Keyboard,
    Button
} from 'react-native';
import DBHelper from '../DBHelper';
import { showMessage } from 'react-native-flash-message';
import { globalStyles } from '../styles/global';

const dbHelper = new DBHelper();

export default function AddSleep({ navigation }) {
    
    const [date, setDate] = useState('');
    const [hoursInBed, setHoursInBed] = useState('');
    const [hoursTilSleep, setHoursTilSleep] = useState('');
    const [timesWokenUp, setTimesWokenUp] = useState('');
    const [sleepQuality, setSleepQuality] = useState('');

    const submit = async () => {
        Keyboard.dismiss();

        let subSleep = await dbHelper.insertSleep(date, hoursInBed, hoursTilSleep, timesWokenUp, sleepQuality);

        if (subSleep == true) {
            showMessage({
                message: 'Successfully submitted data',
                type: 'success',
            });
        } else {
            showMessage({
                message: 'Something went wrong',
                type: 'danger',
            });
        }
        navigation.goBack();
    }

    return (
        <View style={globalStyles.container}>
            <Text>Date</Text>
            <TextInput
                style={globalStyles.input}
                value={date}
                onChangeText={date => setDate(date)}
                placeholder='DD/MM/YYYY'
            />

            <Text>Hours in Bed</Text>
            <TextInput
                style={globalStyles.input}
                value={hoursInBed}
                onChangeText={hoursInBed => setHoursInBed(hoursInBed)}
                keyboardType={'numeric'}
            />

            <Text>Hours until Sleep</Text>
            <TextInput
                style={globalStyles.input}
                value={hoursTilSleep}
                onChangeText={hoursTilSleep => setHoursTilSleep(hoursTilSleep)}
                keyboardType={'numeric'}
                placeholder='in hours'
            />

            <Text>Number of Times Woken up Through the Night</Text>
            <TextInput
                style={globalStyles.input}
                value={timesWokenUp}
                onChangeText={timesWokenUp => setTimesWokenUp(timesWokenUp)}
                keyboardType={'number-pad'}
            />

            <Text>Sleep Quality Rating</Text>
            <TextInput
                style={globalStyles.input}
                value={sleepQuality}
                onChangeText={sleepQuality => setSleepQuality(sleepQuality)}
                keyboardType={'number-pad'}
                placeholder='0-5'
            />

            <Button title='Submit' onPress={submit} />

        </View>
    )
}