import React from 'react';
import {
    View,
    Text,
    ScrollView,
    Dimensions,
    FlatList
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

var graphData = [];
var graphLabels = [];

// Effect hook to retrieve data from database
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
        // Change label to the time from retrieved rows maybe?
        labels: [],
        datasets: [
            {
                // Replace data here with the ratingOne values from retrieved rows
                //data: [5, 2, 5, 2, 1, 2, 1],
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
            <Text>Mental Workload</Text>
            <ScrollView style={globalStyles.scroll}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
                <LineChart
                    //verticalLabelRotation={90}
                    data={data}
                    width={graphWidth}
                    height={220}
                    chartConfig={chartConfig}
                    bezier
                    //style={globalStyles.chart}
                />
            </ScrollView>
            <Text>Test</Text>
        </View>
    )
}