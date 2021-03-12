import React from 'react';
import {
    View,
    Text,
    ScrollView
} from 'react-native';
import { globalStyles } from '../styles/global';
import { LineChart, StackedBarChart } from 'react-native-chart-kit';
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

// Time
var neutral = [0];
var productive = [0];
var unproductive = [0];

// Intervals
var graphLabels = [];

db.transaction(tx => {
    tx.executeSql('SELECT name, date, interval, time, category from screenTime ORDER BY category', [], (_, { rows }) => {
        for (var i=0; i < rows._array.length; i++) {
            var time = rows._array[i].time;
            
            // Unique intervals are added to the graphLabels array
            var interval = rows._array[i].interval.slice(0,5);
            if (graphLabels.includes(interval) == false) graphLabels.push(interval);

            // Times are pushed to the relevant category array
            var category = rows._array[i].category;

            if (category == 'neutral') neutral[0] += time;
            else if (category == 'productive') productive[0] += time;
            else if (category == 'unproductive') unproductive[0] += time;
        }
    });
});

export default function ScreenTime() {

    const data = {
        labels:[],
        legend: ['neutral', 'productive', 'unproductive'],
        data: [[neutral[0], productive[0], unproductive[0]]],
        barColors: ['#add8e6', '#00ff00', '#ff0000'],
    }

    data.labels = graphLabels;

    return (
        <View style={globalStyles.container}>
            <Text> Screen Time</Text>
            <View style={globalStyles.chart}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <StackedBarChart
                        data={data}
                        width={400}
                        height={220}
                        chartConfig={chartConfig}
                    />
                </ScrollView>
            </View>
        </View>
    )
}