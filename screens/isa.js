import React from 'react';
import {
    View,
    Text,
    Dimensions
} from 'react-native';
import { globalStyles } from '../styles/global';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const data = {
    labels: ['Mon', 'Tues', 'Weds', 'Thurs', 'Fri', 'Sat', 'Sun'],
    datasets: [
        {
            data: [1, 2, 5, 2, 1, 2, 1],
            color: (opacity = 1) => `rgba(20, 20, 20, ${opacity})`,
            strokeWidth: 2
        }
    ],
    legend: ['Mental Workload']
}

const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    decimalPlaces: 0,
    useShadowColorFromDataset: false // optional
  };

export default function ISA() {
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