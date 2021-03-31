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
import DropDownPicker from 'react-native-dropdown-picker';
import Feather from 'react-native-vector-icons/Feather';

Feather.loadFont();

const dbHelper = new DBHelper();

export default function AddScreenTime({ navigation }) {

    const [pName, setPName] = React.useState('');
    const [date, setDate] = React.useState('');
    const [interval, setInterval] = React.useState('');
    const [time, setTime] = React.useState('');
    const [category, setCategory] = React.useState('');

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
            <DropDownPicker
                items = {[
                    {label: 'Productive', value: 'productive'},
                    {label: 'Neutral', value: 'neutral'},
                    {label: 'Unproductive', value: 'unproductive'}
                ]}
                defaultValue={category}
                containerStyle={{height:40, marginBottom: 120}}
                dropDownStyle={{backgroundColor: '#fafafa'}}
                onChangeItem={item => setCategory(item.value)}
            />

            <Button title='Submit' onPress={submit} />
        </View>
    )
}