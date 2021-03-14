import React from 'react';
import {
    View,
    Text,
    ScrollView
} from 'react-native';
import { globalStyles } from '../styles/global';
import { VictoryChart, VictoryGroup, VictoryLine, VictoryScatter, VictoryTheme } from 'victory-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.db');

var graphData = [];

// Retrieve data from database
//React.useEffect(() => {
db.transaction(tx => {
    tx.executeSql('SELECT workloadRating, dateTime from isa', [], (_, { rows }) => {
        for (var i=0; i < rows._array.length; i++) {
            graphData.push({
                x: rows._array[i].dateTime.slice(11, 16),
                y: rows._array[i].workloadRating
            });
        }
    });
});
//}, []);

export default function ISA() {

    var graphWidth = graphData.length*60;

    return (
        <View style={globalStyles.container}>
            <Text> All recorded mental workload levels</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
                <VictoryChart 
                    theme={VictoryTheme.material} 
                    height = {300} 
                    width={graphWidth} 
                    domain={{ y: [1, 5] }}>
                    <VictoryGroup data={graphData}>
                        <VictoryLine style={{
                            data: { stroke: '#000' },
                            parent: { border: '1px solid #ccc'}
                            }} 
                        />
                        <VictoryScatter style = {{ data: { fill: '#000' }}} />
                    </VictoryGroup>
                </VictoryChart>
            </ScrollView>
        </View>
    )
}