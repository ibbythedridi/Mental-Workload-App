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
var graphData = [];

// Intervals
var graphLabels = [];

// Categories
var graphLegend = [];

// Colours
var colours = [];

db.transaction(tx => {
    tx.executeSql('SELECT name, date, interval, time, category from screenTime', [], (_, { rows }) => {
        for (var i=0; i < rows._array.length; i++) {
            graphData.push(rows._array[i].time);

            // Unique intervals are added to the graphLabels array
            var interval = rows._array[i].interval.slice(0,5);
            if (graphLabels.includes(interval) == false) graphLabels.push(interval);

            // Unique categories are added to the graphLegend array
            var category = rows._array[i].category;
            if (graphLegend.includes(category) == false) graphLegend.push(category);
        }
    });
});

export default function ScreenTime() {

    const data = {
        labels:[],
        legend: [],
        data: [graphData],
        barColors: ['#dfe4ea', '#ced6e0', '#a4b0be'],
    }

    data.labels = graphLabels;
    data.legend = graphLegend;
    //data.data = graphData;

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