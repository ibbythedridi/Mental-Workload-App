import React from 'react';
import {
    View,
    Text,
    TextInput,
    Keyboard
} from 'react-native';
import { globalStyles } from '../styles/global';
import DBHelper from '../components/dbHelper';
import Moment from 'moment';
import { showMessage } from 'react-native-flash-message';
import DButton from '../components/button';

const dbHelper = new DBHelper();

export default function AddISA({ navigation }) {

    const [date, setDate] = React.useState('');
    const [time, setTime] = React.useState('');
    const [rating, setRating] = React.useState('');
    const [summary, setSummary] = React.useState('');

    const submit = async () => {
        Keyboard.dismiss();

        // Validating data is in correct format
        if (Moment(date, 'DD/MM/YYYY').isValid() && date.length == 10) {
            if (Moment(time, 'hh:mm:ss').isValid()) {
                if (rating >= 1 && rating <= 5) {
                    let subISA = await dbHelper.insertISA(date, time, rating, summary);

                    if (subISA == true) {
                        showMessage({
                            message: 'Successfully submitted data',
                            type: 'success',
                        });
                    } else {
                        showMessage({
                            message: 'Something went wrong, try again',
                            type: 'danger',
                        });
                    }
                } else {
                    showMessage({
                        message: 'Invalid rating: should be an integer between 1-5 (inclusive)',
                        type: 'danger'
                    })
                }
            }
            else {
                showMessage({
                    message: 'Invalid time: should be in format hh:mm:ss',
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
                placeholder="DD/MM/YYYY"
            />

            <Text>Time</Text>
            <TextInput
                style={globalStyles.input}
                value={time}
                onChangeText={time => setTime(time)}
                placeholder="hh:mm:ss"
            />

            <Text>Workload Rating</Text>
            <TextInput
                style={globalStyles.input}
                value={rating}
                onChangeText={rating => setRating(rating)}
                keyboardType={'number-pad'}
                placeholder="0-5"
            />

            <Text>Summary</Text>
            <TextInput
                style={globalStyles.input}
                value={summary}
                onChangeText={summary => setSummary(summary)}
                placeholder="Summary of task"
            />

            <DButton text='Submit' onPress={submit} />
        </View>
    )
}