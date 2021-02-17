import React from 'react';
import {
    View,
    Text,
    Dimensions
} from 'react-native';
import { globalStyles } from '../styles/global';
import { LineChart } from 'react-native-chart-kit';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.db');

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    decimalPlaces: 0,
    useShadowColorFromDataset: false // optional
  };

export default function ISA() {

    // Effect hook to retrieve data from database
    React.useEffect(() => {
    db.transaction(tx => {
        tx.executeSql('SELECT * from isa', [], (_, { rows }) => {
            var graphData = JSON.stringify(rows);
            console.log(graphData);

            //save the relevant columns in lists
        });
    });
    }, []);

    const data = {
        // Change label to the time from retrieved rows maybe?
        labels: ['Mon', 'Tues', 'Weds', 'Thurs', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                // Replace data here with the ratingOne values from retrieved rows
                data: [1, 2, 5, 2, 1, 2, 1],
                color: (opacity = 1) => `rgba(20, 20, 20, ${opacity})`,
                strokeWidth: 2
            }
        ],
        legend: ['Mental Workload']
    }

    return (
        <View style={globalStyles.container}>
            <Text>Mental Workload - 7 Days</Text>
            <LineChart
                data={data}
                width={screenWidth - 40}
                height={220}
                chartConfig={chartConfig}
                bezier
                style={globalStyles.chart}
            />
        </View>
    )
}