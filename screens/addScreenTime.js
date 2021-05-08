import React from 'react';
import {
    View,
    Text,
    TextInput,
    Keyboard,
    Platform
} from 'react-native';
import { globalStyles } from '../styles/global';
import DBHelper from '../components/dbHelper';
import { showMessage } from 'react-native-flash-message';
import { Picker } from '@react-native-picker/picker';
import Moment from 'moment';
import DButton from '../components/button';

const dbHelper = new DBHelper();

export default function AddScreenTime({ navigation }) {

    const [pName, setPName] = React.useState('');
    const [date, setDate] = React.useState('');
    const [interval, setInterval] = React.useState('');
    const [time, setTime] = React.useState('');
    const [category, setCategory] = React.useState('neutral');

    const submit = async () => {
        Keyboard.dismiss();

         // Validating data is in correct format
         if (Moment(date, 'DD/MM/YYYY').isValid() && date.length == 10) {
            if (Moment(interval, 'hh:mm:ss-hh:mm:ss').isValid() && interval.length == 17) {
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
            } else {
                showMessage({
                    message: 'Invalid interval: should be in format hh:mm:ss-hh:mm:ss',
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
            <TextInput
                style={globalStyles.input}
                value={pName}
                onChangeText={pName => setPName(pName)}
                placeholder="Program Name"
            />

            <TextInput
                style={globalStyles.input}
                value={date}
                onChangeText={date => setDate(date)}
                placeholder="Date: DD/MM/YYYY"
            />

            <TextInput
                style={globalStyles.input}
                value={interval}
                onChangeText={interval => setInterval(interval)}
                placeholder="Interval: hh:mm:ss-hh:mm:ss"
            />

            <TextInput
                style={globalStyles.input}
                value={time}
                onChangeText={time => setTime(time)}
                keyboardType={'number-pad'}
                placeholder="Time (s)"
            />
            
            <View
                style={{
                    marginBottom: 10,
                    paddingBottom: Platform.OS === 'ios' ? 150 : 0,
                    backgroundColor: '#eee',
                    borderRadius: 7,
                    marginBottom: 20,
                    padding: 5,
                    shadowColor: '#999',
                    shadowOffset: { width: 0, height: 0 },
                    shadowRadius: 3,
                    shadowOpacity: 0.3,
                    elevation: 3
                }}    
            >
                <Text style={globalStyles.cardHeading} >Category</Text>
                <Picker
                    style={{
                        height:40
                    }}
                    selectedValue={category}
                    onValueChange={(category) => setCategory(category.toLowerCase())}
                >
                    <Picker.Item label='Productive' value='productive' />
                    <Picker.Item label='Neutral' value='neutral' />
                    <Picker.Item label='Unproductive' value='unproductive' />
                </Picker>
            </View>

            <DButton text='Submit' onPress={submit} />
        </View>
    )
}