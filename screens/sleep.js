import React from 'react';
import {
    View,
    Text,
    ScrollView
} from 'react-native';
import { globalStyles } from '../styles/global';
import { LineChart } from 'react-native-chart-kit';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.db');

const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    decimalPlaces: 0,
    useShadowColorFromDataset: false // optional
};

const timeInBedData = {
    labels: [],
    datasets: [
        {
            data: [],
            color: (opacity = 1) => `rgba(20, 20, 20, ${opacity})`,
            strokeWidth: 2
        }
    ],
    legend: ['Hours in Bed']
}

const timeTilSleepData = {
    labels: [],
    datasets: [
        {
            data: [],
            color: (opacity = 1) => `rgba(20, 20, 20, ${opacity})`,
            strokeWidth: 2
        }
    ],
    legend: ['Hours until sleep']
}

const timesWokenUpData = {
    labels: [],
    datasets: [
        {
            data: [],
            color: (opacity = 1) => `rgba(20, 20, 20, ${opacity})`,
            strokeWidth: 2
        }
    ],
    legend: ['Times woken up throughout the night']
}

const sleepQualityData = {
    labels: [],
    datasets: [
        {
            data: [],
            color: (opacity = 1) => `rgba(20, 20, 20, ${opacity})`,
            strokeWidth: 2
        }
    ],
    legend: ['Sleep Quality Rating']
}

var graphLabels = [];
var timeInBed = [];
var timeTilSleep = [];
var timesWokenUp = [];
var sleepQuality = [];

// Retrieve data from database
//React.useEffect(() => {
db.transaction(tx => {
    tx.executeSql('SELECT date, timeInBed, timeTilSleep, timesWokenUp, sleepQuality from sleep', [], (_, { rows }) => {
        for (var i=0; i < (rows._array.length); i++) {
            graphLabels.push(rows._array[i].date.slice(0, 5));
            timeInBed.push(rows._array[i].timeInBed);
            timeTilSleep.push(rows._array[i].timeTilSleep);
            timesWokenUp.push(rows._array[i].timesWokenUp);
            sleepQuality.push(rows._array[i].sleepQuality);
        }
    });
});
//}, []);

export default function Sleep() {
    var graphWidth = graphLabels.length*80;

    timeInBedData.labels = graphLabels;
    timeInBedData.datasets[0].data = timeInBed;

    timeTilSleepData.labels = graphLabels;
    timeTilSleepData.datasets[0].data = timeTilSleep;

    timesWokenUpData.labels = graphLabels;
    timesWokenUpData.datasets[0].data = timesWokenUp;

    sleepQualityData.labels = graphLabels;
    sleepQualityData.datasets[0].data = sleepQuality;    

    return (
        <ScrollView style={globalStyles.container}>
            <View style={globalStyles.chart}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <LineChart
                        data={timeInBedData}
                        width={graphWidth}
                        height={220}
                        chartConfig={chartConfig}
                        bezier
                        style={{borderRadius: 10}}
                    />
                </ScrollView>
            </View>
            <View style={globalStyles.chart}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <LineChart
                        data={timeTilSleepData}
                        width={graphWidth}
                        height={220}
                        chartConfig={chartConfig}
                        bezier
                        style={{borderRadius: 10}}
                    />
                </ScrollView>
            </View>
            <View style={globalStyles.chart}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <LineChart
                        data={timesWokenUpData}
                        width={graphWidth}
                        height={220}
                        chartConfig={chartConfig}
                        bezier
                        style={{borderRadius: 10}}
                    />
                </ScrollView>
            </View>
            <View style={globalStyles.chart}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <LineChart
                        data={sleepQualityData}
                        width={graphWidth}
                        height={220}
                        chartConfig={chartConfig}
                        bezier
                        style={{borderRadius: 10}}
                    />
                </ScrollView>
            </View>
        </ScrollView>
    )
}