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
    tx.executeSql('SELECT ratingOne, dateTime from isa', [], (_, { rows }) => {
        for (var i=0; i < rows._array.length; i++) {
            graphData.push(rows._array[i].ratingOne);
            graphLabels.push(rows._array[i].dateTime.slice(11, 16));
        }
    });
});
//}, []);

export default function ISA() {

    const data = {
        labels: [],
        datasets: [
            {
                data: [],
                color: (opacity = 1) => `rgba(20, 20, 20, ${opacity})`,
                strokeWidth: 2
            }
        ],
        legend: ['Mental Workload']
    }

    data.datasets[0].data = graphData;
    data.labels = graphLabels;

    var graphWidth = graphData.length*80;

    return (
        <View style={globalStyles.container}>
            <Text> All recorded mental workload levels</Text>
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