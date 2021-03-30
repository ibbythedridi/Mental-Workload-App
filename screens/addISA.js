import React from 'react';
import {
    View,
    Text,
    Button,
    TextInput
} from 'react-native';
import { globalStyles } from '../styles/global';
import DBHelper from '../DBHelper';

const dbHelper = new DBHelper();

export default function AddISA() {

    const [date, setDate] = React.useState('');
    const [time, setTime] = React.useState('');
    const [rating, setRating] = React.useState('');
    const [summary, setSummary] = React.useState('');

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

            <Button title='Submit' onPress={() => dbHelper.insertISA(date, time, rating, summary)} />
        </View>
    )
}