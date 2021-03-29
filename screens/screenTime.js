import React from 'react';
import {
    View,
    Text,
    ScrollView,
    Dimensions
} from 'react-native';
import { globalStyles } from '../styles/global';
import { VictoryBar, VictoryStack, VictoryLabel, VictoryChart, VictoryLegend } from 'victory-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.db');

const windowWidth = Dimensions.get('window').width;

// This function adds screen time to the right dictionary
function addTime(time, interval, cat) {
    if (!(cat.some(i => i.x == interval))) {
        cat.push({
            x: interval,
            y: time
        });
    }
    else {
        for (var j=0; j<cat.length; j++) {
            if (cat[j].x == interval) {
                cat[j].y += time;
            }
        }
    }
}

// Categories
var productive = [];
var neutral = [];
var unproductive = [];

// Productive, Neutral, Unproductive
var colours=['#00ff00', '#add8e6', '#ff0000'];

db.transaction(tx => {
    tx.executeSql('SELECT name, date, interval, time, category from screenTime ORDER BY category', [], (_, { rows }) => {
        for (var i=0; i < rows._array.length; i++) {
            var time = rows._array[i].time;
            var interval = rows._array[i].interval.slice(0,5);
            var category = rows._array[i].category;

            // O(N^2) need more efficient
            if (category == 'productive') addTime(time, interval, productive);
            else if (category == 'neutral') addTime(time, interval, neutral);
            else if (category == 'unproductive') addTime(time, interval, unproductive);
        }
    });
});

export default function ScreenTime() {
    return (
        <View style={globalStyles.container}>
            <Text> Screen Time</Text>
            <VictoryChart domainPadding={30} >
                <VictoryLegend
                    x = {windowWidth / 2 - 145}
                    title='Legend'
                    centerTitle
                    orientation='horizontal'
                    data={[
                        { name: 'Productive', symbol: { fill: colours[0] }},
                        { name: 'Neutral', symbol: { fill: colours[1] }},
                        { name: 'Unproductive', symbol: { fill: colours[2] }}
                    ]}
                />
                <VictoryStack colorScale={colours} style= {{ data: { stroke: '#000', strokeWidth: 1 }}}>
                    <VictoryBar data={productive} labels={({ datum }) => Math.round(datum.y * 10) / 10} labelComponent={<VictoryLabel dy={30}/>} />
                    <VictoryBar data={neutral} labels={({ datum }) => Math.round(datum.y * 10) / 10} labelComponent={<VictoryLabel dy={30}/>} />
                    <VictoryBar data={unproductive} labels={({ datum }) => Math.round(datum.y * 10) / 10} labelComponent={<VictoryLabel dy={30}/>} />
                </VictoryStack>
            </VictoryChart>
        </View>
    )
}