import React, {useState} from 'react';
import {
    View,
    Text
} from 'react-native';
import { globalStyles } from '../styles/global';
import FlashMessage, { showMessage } from "react-native-flash-message";
import DBHelper from '../components/dbHelper';
import DButton from '../components/button';

const dbHelper = new DBHelper();

export default function Settings() {

    const [exampleData, setExampleData] = useState(true);

    const addData = async () => {
        let exData = await dbHelper.exampleData();
        if (exData == true) {
            showMessage({
                message: 'Example Data Added Successfully',
                type: 'success',
            });
            setExampleData(false);
        } else {
            showMessage({
                message: 'Something went wrong',
                type: 'danger',
            });
        }
    }

    return (
        <View style={globalStyles.container}>
            <View style={globalStyles.card}>
                <Text style={globalStyles.cardHeading}>Developer Options</Text>
                {exampleData && (
                    <DButton text='Add Example Data' onPress={addData} />
                )}
            </View>
            
            <FlashMessage position='bottom' />
        </View>
    )
}