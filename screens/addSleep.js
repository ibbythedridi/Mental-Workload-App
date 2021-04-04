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
    const [timeInBed, setTimeInBed] = useState('');
    const [timeTilSleep, setTimeTilSleep] = useState('');
    const [timesWokenUp, setTimesWokenUp] = useState('');
    const [sleepQuality, setSleepQuality] = useState('');

    const submit = async () => {
        Keyboard.dismiss();

        let subSleep = await dbHelper.insertSleep(date, timeInBed, timeTilSleep, timesWokenUp, sleepQuality);

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

            <Text>Time in Bed</Text>
            <TextInput
                style={globalStyles.input}
                value={timeInBed}
                onChangeText={timeInBed => setTimeInBed(timeInBed)}
                keyboardType={'numeric'}
                placeholder='in hours'
            />

            <Text>Hours in Bed until Sleep</Text>
            <TextInput
                style={globalStyles.input}
                value={timeTilSleep}
                onChangeText={timeTilSleep => setTimeTilSleep(timeTilSleep)}
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