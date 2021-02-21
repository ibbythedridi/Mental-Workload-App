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

var graphData = [];
var graphLabels = [];

// Retrieve data from database
//React.useEffect(() => {
db.transaction(tx => {
    tx.executeSql('SELECT date, timeInBed from sleep', [], (_, { rows }) => {
        for (var i=0; i < (rows._array.length); i++) {
            graphData.push(rows._array[i].timeInBed);
            graphLabels.push(rows._array[i].date.slice(0, 5));
        }
    });
});
//}, []);

export default function Sleep() {
    const data = {
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

    data.datasets[0].data = graphData;
    data.labels = graphLabels;

    var graphWidth = graphData.length*80;

    return (
        <View style={globalStyles.container}>
            <Text> All recorded times in bed </Text>
            <View style={globalStyles.chart}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <LineChart
                        data={data}
                        width={graphWidth}
                        height={220}
                        chartConfig={chartConfig}
                        bezier
                        style={{borderRadius: 10}}
                    />
                </ScrollView>
            </View>
        </View>
    )
}