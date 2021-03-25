import React from 'react';
import {
    View,
    Text,
    Button,
    TextInput
} from 'react-native';
import { globalStyles } from '../styles/global';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.db');

function submitISA(date, time, rating, summary) {
    db.transaction(tx => {
        tx.executeSql('INSERT INTO isa (dateTime, workloadRating, summary) values (?, ?, ?)', [date + '-' + time, rating, summary]);
    })
    console.log("Submitted");
}

export default function AddISA() {

    const [date, setDate] = React.useState('');
    const [time, setTime] = React.useState('');
    const [rating, setRating] = React.useState('');
    const [summary, setSummary] = React.useState('');

    return (
        <View style={globalStyles.container}>
            <Text>Add ISA</Text>
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

            <Button title='Submit' onPress={() => submitISA(date, time, rating, summary)} />
        </View>
    )
}