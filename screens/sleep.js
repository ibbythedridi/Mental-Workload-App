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

export default function Sleep() {

    var graphWidth = hoursInBedData.length*80+70;

    const [date1, setDate1] = useState(new Date());
    const [date2, setDate2] = useState(new Date());
    const [showPicker1, setShowPicker1] = useState(false);
    const [showPicker2, setShowPicker2] = useState(false);
    const [showChart, setShowChart] = useState(false);

    const changeFromDate = async (event, selectedDate) => {
        setShowPicker1(Platform.OS === 'ios');

        // If user gets picker then clicks cancel, selectedDate is null, so only run this if they select a date
        if (selectedDate) {
            let dateSelect = Moment(selectedDate).format('DD/MM/YYYY');

            setDate1(selectedDate);

            tempData = await dbHelper.getSleepData();

            hoursInBedData = tempData ? tempData[0] : [],
            hoursUntilSleepData = tempData ? tempData[1] : [],
            timesWokenUpData = tempData ? tempData[2] : [],
            sleepQualityData = tempData ? tempData[3] : [];

            setShowChart(false);
            if (hoursInBedData.length > 0) setShowChart(true);
            else {
                showMessage({
                    message: 'No data for: ' + dateSelect,
                    type: 'warning',
                })
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
            
            <FlashMessage position='bottom' />
        </View>
    )
}