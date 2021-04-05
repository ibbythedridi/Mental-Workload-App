import React, {useState} from 'react';
import {
    View,
    ScrollView,
    Dimensions,
    Platform
} from 'react-native';
import { globalStyles } from '../styles/global';
import { VictoryArea, VictoryChart, VictoryGroup, VictoryLegend, VictoryLine, VictoryScatter, VictoryTheme } from 'victory-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import FlashMessage, { showMessage } from "react-native-flash-message";
import DBHelper from '../components/dbHelper';
import DButton from '../components/button';

const windowWidth = Dimensions.get('window').width;

const dbHelper = new DBHelper();

var colours = {
    'hoursInBed': '#006bc9',
    'hoursUntilSleep': '#004b8f',
    'timesWokenUp': '#cc0000',
    'sleepQuality': '#009900'
}

var tempData = [];

var hoursInBedData = [],
    hoursUntilSleepData = [],
    timesWokenUpData = [],
    sleepQualityData = [];

export default function Sleep({ navigation }) {

    var graphWidth = hoursInBedData.length*60+70;
    // If graph width is less than window width, set the graph width to window width
    graphWidth = graphWidth < windowWidth ? windowWidth : graphWidth;

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
        setShowPicker1(!Platform.OS === 'ios');
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

                setData(dateSelect.format('DD/MM/YYYY'), secondDate.format('DD/MM/YYYY'), tempData);
            }
         }
    }

    const changeToDate = async (event, selectedDate) => {
        setShowPicker2(!Platform.OS === 'ios');
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

                setData(firstDate.format('DD/MM/YYYY'), dateSelect.format('DD/MM/YYYY'), tempData);
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
            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }} >
                    <DButton text="'From' date" onPress={showFromPicker} />
                    <DButton text="'To' date" onPress={showToPicker} />
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
                        <View style={globalStyles.card} >
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
                                <VictoryChart theme={VictoryTheme.material} width={graphWidth} >
                                    <VictoryLegend
                                        x = {windowWidth / 2 - 100}
                                        title='Legend'
                                        centerTitle
                                        orientation='horizontal'
                                        data={[
                                            { name: 'Hours in Bed', symbol: { fill: colours['hoursInBed']} },
                                            { name: 'Hours Until Sleep', symbol: { fill: colours['hoursUntilSleep']} }
                                        ]}
                                    />

                                    {/* Hours in Bed */}
                                    <VictoryArea
                                        style={{ data: { fill: colours['hoursInBed'] } }}
                                        data={hoursInBedData}
                                    />

                                    {/* Hours until Sleep */}
                                    <VictoryArea
                                        style={{ data: { fill: colours['hoursUntilSleep'] } }}
                                        data={hoursUntilSleepData}
                                    />
                                </VictoryChart>
                            </ScrollView>
                        </View>
                        <View style={globalStyles.card} >
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
                                <VictoryChart theme={VictoryTheme.material} width={graphWidth} >
                                    <VictoryLegend
                                        x = {windowWidth / 2 - 110}
                                        title='Legend'
                                        centerTitle
                                        orientation='horizontal'
                                        data={[
                                            { name: 'Times Woken Up', symbol: { fill: colours['timesWokenUp']} },
                                            { name: 'Sleep Quality Rating', symbol: { fill: colours['sleepQuality']} }
                                        ]}
                                    />
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
                    </View>
                )}
                <DButton text='Add Data' onPress={() => navigation.navigate('AddSleep')} />
                <FlashMessage position='bottom' />
            </ScrollView>
        </View>
    )
}