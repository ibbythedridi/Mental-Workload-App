import React, {useState} from 'react';
import {
    View,
    Dimensions,
    Text
} from 'react-native';
import { globalStyles } from '../styles/global';
import { VictoryBar, VictoryStack, VictoryLabel, VictoryChart, VictoryLegend, VictoryPie, VictoryTheme } from 'victory-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DBHelper from '../components/dbHelper';
import Moment from 'moment';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import DButton from '../components/button';
import { G } from 'react-native-svg';
import { ScrollView } from 'react-native-gesture-handler';

const dbHelper = new DBHelper();

const windowWidth = Dimensions.get('window').width;

// Productive, Neutral, Unproductive colours
var colours=['#00cc00', '#add8e6', '#cc0000']

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

var totalScreenTime = 0;
var productiveTime = 0;
var neutralTime = 0;
var unproductiveTime = 0;

// Calculate the time in hours, minutes and seconds for a time given in seconds
function calcTime(time) {

    let secs = time % 60;
    let mins = Math.floor(time / 60);
    let hours = Math.floor(mins / 60);
    mins = mins % 60;

    let timeString = '';

    if (hours > 0) timeString += hours + 'h ';
    if (mins > 0) timeString += mins + 'm ';
    timeString += secs + 's';

    return timeString;
}

export default function ScreenTime({ navigation }) {

    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [showChart, setShowChart] = useState(false);

    const onChange = async (event, selectedDate) => {
        setShowPicker(!Platform.OS === 'ios');
        let dateSelect = Moment(selectedDate).format('DD/MM/YYYY');
        // If user gets picker then clicks cancel, selectedDate is null, so only run this if they select a date
        if (selectedDate) {
            setDate(selectedDate);

            // Screen time data retrieved
            let tempData = await dbHelper.getScreenTimeCondensed(dateSelect);

            // Categories
            if (tempData) {
                productive = tempData[0],
                neutral = tempData[1],
                unproductive = tempData[2],
                totalScreenTime = tempData[3],
                productiveTime = tempData[4],
                neutralTime = tempData[5],
                unproductiveTime = tempData[6];
            }

            setShowChart(false);
            if (productive.length > 0 ||
                neutral.length > 0 ||
                unproductive.length > 0) {
                    setShowChart(true);

            } else {
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
            <DButton text='Pick Date' onPress={showDatePicker} />
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
                <View>
                    <View style={globalStyles.card} >
                        <VictoryChart domainPadding={30} theme={VictoryTheme.material}  >
                            <VictoryLegend
                                x = {windowWidth / 2 - 145}
                                title='Legend'
                                centerTitle
                                orientation='horizontal'
                                data={legend}
                            />
                            <VictoryStack colorScale={colours} style= {{ data: { stroke: '#000', strokeWidth: 1 }}} >
                                <VictoryBar data={productive} />
                                <VictoryBar data={neutral} />
                                <VictoryBar data={unproductive} />
                            </VictoryStack>
                        </VictoryChart>
                    </View>
                    <View style={globalStyles.card} >
                        <Text style={globalStyles.cardHeading} > Info </Text>
                        <Text style={globalStyles.cardText} > Total Screen Time: {calcTime(totalScreenTime)} </Text>
                        <Text style={globalStyles.cardText} > Productive Screen Time: {calcTime(productiveTime)} </Text>
                        <Text style={globalStyles.cardText} > Neutral Screen Time: {calcTime(neutralTime)} </Text>
                        <Text style={globalStyles.cardText} > Unproductive Screen Time: {calcTime(unproductiveTime)} </Text> 
                    </View>
                </View>
            )}
            <DButton text='Add Data' onPress={() => navigation.navigate('AddScreenTime')} />
            <FlashMessage position='bottom' />
        </View>
    )
}