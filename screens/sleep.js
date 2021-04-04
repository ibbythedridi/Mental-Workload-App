import React, {useState} from 'react';
import {
    View,
    ScrollView,
    Button
} from 'react-native';
import { globalStyles } from '../styles/global';
import { VictoryChart, VictoryGroup, VictoryLegend, VictoryLine, VictoryScatter, VictoryTheme } from 'victory-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import FlashMessage, { showMessage } from "react-native-flash-message";
import DBHelper from '../DBHelper';

const dbHelper = new DBHelper();

var colours = {
    'hoursInBed': '#000',
    'hoursUntilSleep': '#0000ff',
    'timesWokenUp': '#ff0000',
    'sleepQuality': '#00ff00'
}

var tempData = [];

var hoursInBedData = [],
    hoursUntilSleepData = [],
    timesWokenUpData = [],
    sleepQualityData = [];

export default function Sleep({ navigation }) {

    var graphWidth = hoursInBedData.length*80+70;

    const [date1, setDate1] = useState(new Date());
    const [date2, setDate2] = useState(new Date());
    const [showPicker1, setShowPicker1] = useState(false);
    const [showPicker2, setShowPicker2] = useState(false);
    const [showChart, setShowChart] = useState(false);

    // This function sets the data and shows the chart
    // Separate function as it'll otherwise just be duplicate code
    function setData(aDate, bDate, temp) {
        hoursInBedData = temp ? temp[0] : [],
        hoursUntilSleepData = temp ? temp[1] : [],
        timesWokenUpData = temp ? temp[2] : [],
        sleepQualityData = temp ? temp[3] : [];

        setShowChart(false);
        if (hoursInBedData.length > 0) setShowChart(true);
        else {
            showMessage({
                message: 'No data for: ' + aDate + ' - ' + bDate,
                type: 'warning',
            })
        }
    }

    const changeFromDate = async (event, selectedDate) => {
        setShowPicker1(Platform.OS === 'ios');

        // If user gets picker then clicks cancel, selectedDate is null, so only run this if they select a date
        if (selectedDate) {
            let dateSelect = Moment(selectedDate);
            let secondDate = Moment(date2);

            // If the date selected is after to date, give warning otherwise continue
            if (dateSelect.isAfter(secondDate)) {
                showMessage({
                    message: "You can't pick a date later than 'to' date (" + secondDate.format('DD/MM/YYYY') + ")",
                    type: 'warning',
                })
            } else {
                setDate1(selectedDate);

                // 'to' date is defaulted to the current date, so if it hasn't been picked yet, all the data should be shown
                tempData = await dbHelper.getSleepData(dateSelect, secondDate);

                setData(dateSelect, secondDate, tempData);
            }
         }
    }

    const changeToDate = async (event, selectedDate) => {
        setShowPicker2(Platform.OS === 'ios');

        // If user gets picker then clicks cancel, selectedDate is null, so only run this if they select a date
        if (selectedDate) {
            let dateSelect = Moment(selectedDate);
            let firstDate = Moment(date1);

            // If the date selected is after to date, give warning otherwise continue
            if (dateSelect.isBefore(firstDate)) {
                showMessage({
                    message: "You can't pick a date earlier than 'from' date (" + firstDate.format('DD/MM/YYYY') + ")",
                    type: 'warning',
                })
            } else {
                setDate2(selectedDate);

                tempData = await dbHelper.getSleepData(firstDate, dateSelect);

                setData(firstDate, dateSelect, tempData);
            }  
        }
    }

    const showFromPicker = () => {
        setShowPicker1(true);
    }

    const showToPicker = () => {
        setShowPicker2(true);
    }

    return (
        <View style={globalStyles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }} >
                <Button title="'From' date" onPress={showFromPicker} />
                <Button title="'To' date" onPress={showToPicker} />
            </View>

            {showPicker1 && (
                <DateTimePicker
                testID="dateTimePicker1"
                value={date1}
                mode={'date'}
                display="default"
                onChange={changeFromDate}
                />
            )}

            {showPicker2 && (
                <DateTimePicker
                testID="dateTimePicker1"
                value={date2}
                mode={'date'}
                display="default"
                onChange={changeToDate}
                />
            )}

            {showChart && (
                <View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
                        <VictoryChart theme={VictoryTheme.material} height={400} width={graphWidth} domain={{ y: [0, 12] }}>
                            <VictoryLegend
                                title='Legend'
                                centerTitle
                                orientation='horizontal'
                                data={[
                                    { name: 'Hours in Bed', symbol: { fill: colours['hoursInBed']} },
                                    { name: 'Hours Until Sleep', symbol: { fill: colours['hoursUntilSleep']} },
                                    { name: 'Times Woken Up', symbol: { fill: colours['timesWokenUp']} },
                                    { name: 'Sleep Quality Rating', symbol: { fill: colours['sleepQuality']} },
                                ]}
                            />

                            {/* Hours in Bed */}
                            <VictoryGroup data={hoursInBedData}>
                                <VictoryLine style={{ data: { stroke: colours['hoursInBed'] }, parent: { border: '1px solid #ccc'} }} />
                                <VictoryScatter style = {{ data: { fill: colours['hoursInBed'] }}} />
                            </VictoryGroup>

                            {/* Hours until Sleep */}
                            <VictoryGroup data={hoursUntilSleepData}>    
                                <VictoryLine style={{ data: { stroke: colours['hoursUntilSleep'] }, parent: { border: '1px solid #ccc'} }} />
                                <VictoryScatter style = {{ data: { fill: colours['hoursUntilSleep'] }}} />
                            </VictoryGroup>

                            {/* Times Woken UP */}
                            <VictoryGroup data={timesWokenUpData}>
                                <VictoryLine style={{ data: { stroke: colours['timesWokenUp'] }, parent: { border: '1px solid #ccc'} }} />
                                <VictoryScatter style = {{ data: { fill: colours['timesWokenUp'] }}} />
                            </VictoryGroup>

                            {/* Sleep Quality */}
                            <VictoryGroup data={sleepQualityData}>    
                                <VictoryLine style={{ data: { stroke: colours['sleepQuality'] }, parent: { border: '1px solid #ccc'} }} />
                                <VictoryScatter style = {{ data: { fill: colours['sleepQuality'] }}} />
                            </VictoryGroup>
                        </VictoryChart>
                    </ScrollView>
                </View>
            )}
            <Button title='Add Data' onPress={() => navigation.navigate('AddSleep')} />
            <FlashMessage position='bottom' />
        </View>
    )
}