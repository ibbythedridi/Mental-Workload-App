import React from 'react';
import {
    View,
    Text,
    Button,
    TextInput,
    Keyboard,
    Platform
} from 'react-native';
import { globalStyles } from '../styles/global';
import DBHelper from '../DBHelper';
import { showMessage } from 'react-native-flash-message';
import { Picker } from '@react-native-picker/picker';

const dbHelper = new DBHelper();

export default function AddScreenTime({ navigation }) {

    const [pName, setPName] = React.useState('');
    const [date, setDate] = React.useState('');
    const [interval, setInterval] = React.useState('');
    const [time, setTime] = React.useState('');
    const [category, setCategory] = React.useState('neutral');

    const submit = async () => {
        Keyboard.dismiss();

        let subScreenTime = await dbHelper.insertScreenTime(pName, date, interval, time, category);

        if (subScreenTime == true) {
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
            <Text>Program Name</Text>
            <TextInput
                style={globalStyles.input}
                value={pName}
                onChangeText={pName => setPName(pName)}
                placeholder="program name"
            />

            <Text>Date</Text>
            <TextInput
                style={globalStyles.input}
                value={date}
                onChangeText={date => setDate(date)}
                placeholder="DD/MM/YYYY"
            />

            <Text>Interval</Text>
            <TextInput
                style={globalStyles.input}
                value={interval}
                onChangeText={interval => setInterval(interval)}
                placeholder="hh:mm:ss-hh:mm:ss"
            />

            <Text>Time</Text>
            <TextInput
                style={globalStyles.input}
                value={time}
                onChangeText={time => setTime(time)}
                placeholder="seconds"
            />

            <Text>Category</Text>
            <View
                style={{
                    marginBottom: Platform.OS === 'ios' ? 0 : 10,
                    paddingBottom: Platform.OS === 'ios' ? 150 : 0,
                    borderWidth: 1
                }}    
            >
                <Picker
                    style={{
                        height:40
                    }}
                    selectedValue={category}
                    onValueChange={(category) => setCategory(category)}
                >
                    <Picker.Item label='Productive' value='productive' />
                    <Picker.Item label='Neutral' value='neutral' />
                    <Picker.Item label='Unproductive' value='unproductive' />
                </Picker>
            </View>
            
            

            <Button title='Submit' onPress={submit} />
        </View>
    )
}