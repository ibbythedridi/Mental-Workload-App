import React from 'react';
import {
    View,
    Text,
    ScrollView
} from 'react-native';
import { globalStyles } from '../styles/global';
import { VictoryChart, VictoryGroup, VictoryLegend, VictoryLine, VictoryScatter, VictoryTheme } from 'victory-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.db');

var colours = {
    'hoursInBed': '#000',
    'hoursUntilSleep': '#0000ff',
    'timesWokenUp': '#ff0000',
    'sleepQuality': '#00ff00'
}

var hoursInBedData = [];
var hoursUntilSleepData = [];
var timesWokenUpData = [];
var sleepQualityData = [];

// Retrieve data from database
//React.useEffect(() => {
db.transaction(tx => {
    tx.executeSql('SELECT date, timeInBed, timeTilSleep, timesWokenUp, sleepQuality from sleep', [], (_, { rows }) => {
        for (var i=0; i < (rows._array.length); i++) {
            var date = rows._array[i].date.slice(0, 5);

            hoursInBedData.push({
                x: date,
                y: rows._array[i].timeInBed
            });

            hoursUntilSleepData.push({
                x: date,
                y: rows._array[i].timeTilSleep
            });

            timesWokenUpData.push({
                x: date,
                y: rows._array[i].timesWokenUp
            });

            sleepQualityData.push({
                x: date,
                y: rows._array[i].sleepQuality
            });
        }
    });
});
//}, []);

export default function Sleep() {

    var graphWidth = hoursInBedData.length*80+70;

    return (
        <View style={globalStyles.container}>
            <Text> Sleep Data </Text>
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
    )
}