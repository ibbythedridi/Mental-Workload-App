import React, {useState} from 'react';
import {
    View,
    Button,
    Dimensions
} from 'react-native';
import { globalStyles } from '../styles/global';
import { VictoryBar, VictoryStack, VictoryLabel, VictoryChart, VictoryLegend } from 'victory-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DBHelper from '../DBHelper';
import Moment from 'moment';
import { showMessage } from 'react-native-flash-message';

const dbHelper = new DBHelper();

const windowWidth = Dimensions.get('window').width;

// Productive, Neutral, Unproductive colours
var colours=['#00ff00', '#add8e6', '#ff0000']

// Categories
var productive = [],
    neutral = [],
    unproductive = [];

// Legend
var legend = [
    { name: 'Productive', symbol: { fill: colours[0] }},
    { name: 'Neutral', symbol: { fill: colours[1] }},
    { name: 'Unproductive', symbol: { fill: colours[2] }}
];

export default function ScreenTime() {

    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [showChart, setShowChart] = useState(false);

    const onChange = async (event, selectedDate) => {
        setShowPicker(Platform.OS === 'ios');
        let dateSelect = Moment(selectedDate).format('DD/MM/YYYY');
        // If user gets picker then clicks cancel, selectedDate is null, so only run this if they select a date
        if (selectedDate) {
            setDate(selectedDate);

            // Screen time data retrieved
            let tempData = await dbHelper.getScreenTimeCondensed();

            // Categories
            productive = tempData ? tempData[0] : [],
                neutral = tempData ? tempData[1] : [],
                unproductive = tempData ? tempData[2] : [];

            setShowChart(false);
            if (productive.length > 0 ||
                neutral.length > 0 ||
                unproductive.length > 0) setShowChart(true);
            else {
                showMessage({
                    message: 'No data for: ' + dateSelect,
                    type: 'warning',
                });
            }
        }
    }

    const showDatePicker = () => {
        setShowPicker(true);
    }

    return (
        <View style={globalStyles.container}>
            <Button title='Pick Date' onPress={showDatePicker} />
            {showPicker && (
                <DateTimePicker
                    testID='dateTimePicker'
                    value={date}
                    mode={'date'}
                    display='default'
                    onChange={onChange}
                />
            )}
            {showChart && (
                <VictoryChart domainPadding={30} >
                    <VictoryLegend
                        x = {windowWidth / 2 - 145}
                        title='Legend'
                        centerTitle
                        orientation='horizontal'
                        data={legend}
                    />
                    <VictoryStack colorScale={colours} style= {{ data: { stroke: '#000', strokeWidth: 1 }}}>
                        <VictoryBar data={productive} labels={({ datum }) => Math.round(datum.y * 10) / 10} labelComponent={<VictoryLabel dy={30}/>} />
                        <VictoryBar data={neutral} labels={({ datum }) => Math.round(datum.y * 10) / 10} labelComponent={<VictoryLabel dy={30}/>} />
                        <VictoryBar data={unproductive} labels={({ datum }) => Math.round(datum.y * 10) / 10} labelComponent={<VictoryLabel dy={30}/>} />
                    </VictoryStack>
                </VictoryChart>
            )}
        </View>
    )
}