import React, {useState, useContext} from 'react';
import {
    View,
    Text
} from 'react-native';
import { globalStyles } from '../styles/global';
import FlashMessage, { showMessage } from "react-native-flash-message";
import DBHelper from '../components/dbHelper';
import DButton from '../components/button';
import AppContext from '../components/AppContext';
import ToggleSwitch from 'toggle-switch-react-native';

const dbHelper = new DBHelper();

export default function Settings() {

    const myContext = useContext(AppContext);

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
                <View style={globalStyles.subCard}>
                    <ToggleSwitch
                        isOn={myContext.debugMode}
                        onColor='green'
                        offColor='red'
                        label='Debug Mode'
                        labelStyle={{ color: '#333', fontSize: 15 }}
                        size='large'
                        onToggle={myContext.debugToggle}
                    />
                    <Text style={globalStyles.cardText}>Debug mode allows you to add data</Text>
                </View>
                
                {exampleData && (
                    <DButton text='Add Example Data' onPress={addData} />
                )}
            </View>
            
            <FlashMessage position='bottom' />
        </View>
    )
}