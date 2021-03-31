import React from 'react';
import {
    View,
    Text,
    Button,
    TextInput,
    Keyboard
} from 'react-native';
import { globalStyles } from '../styles/global';
import DBHelper from '../DBHelper';
import { showMessage } from 'react-native-flash-message';

const dbHelper = new DBHelper();

export default function AddISA({ navigation }) {

    const [date, setDate] = React.useState('');
    const [time, setTime] = React.useState('');
    const [rating, setRating] = React.useState('');
    const [summary, setSummary] = React.useState('');

    const submit = async () => {
        Keyboard.dismiss();
        let subISA = await dbHelper.insertISA(date, time, rating, summary);

        if (subISA == true) {
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
                placeholder="0-5"
            />

            <Text>Summary</Text>
            <TextInput
                style={globalStyles.input}
                value={summary}
                onChangeText={summary => setSummary(summary)}
                placeholder="Summary of task"
            />

            <Button title='Submit' onPress={submit} />
        </View>
    )
}