import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Keyboard,
} from 'react-native';
import DBHelper from '../components/dbHelper';
import { showMessage } from 'react-native-flash-message';
import { globalStyles } from '../styles/global';
import Moment from 'moment';
import DButton from '../components/button';

const dbHelper = new DBHelper();

export default function AddSleep({ navigation }) {
    
    const [date, setDate] = useState('');
    const [hoursInBed, setHoursInBed] = useState('');
    const [hoursTilSleep, setHoursTilSleep] = useState('');
    const [timesWokenUp, setTimesWokenUp] = useState('');
    const [sleepQuality, setSleepQuality] = useState('');

    const submit = async () => {
        Keyboard.dismiss();

        // Validating data is in correct format
        if (Moment(date, 'DD/MM/YYYY').isValid() && date.length == 10) {
            if (hoursTilSleep < hoursInBed) {
                if (sleepQuality >= 0 && sleepQuality <= 5) {
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
                } else {
                    showMessage({
                        message: 'Invalid rating: should be an integer between 0-5 (inclusive)',
                        type: 'danger'
                    })
                }
            } else {
                showMessage({
                    message: 'Invalid hours until sleep: must be lower than hours in bed',
                    type: 'danger'
                })
            }
        } else {
            showMessage({
                message: 'Invalid date: should be in format DD/MM/YYYY',
                type: 'danger'
            })
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

            <DButton text='Submit' onPress={submit} />

        </View>
    )
}