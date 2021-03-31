import React from 'react';
import {
    View,
    Text,
    Dimensions
} from 'react-native';
import { globalStyles } from '../styles/global';
import { VictoryBar, VictoryStack, VictoryLabel, VictoryChart, VictoryLegend } from 'victory-native';
import DBHelper from '../DBHelper';

const dbHelper = new DBHelper();

const windowWidth = Dimensions.get('window').width;

// Screen time data retrieved
let tempData = dbHelper.getScreenTimeCondensed();

// Categories
var productive = tempData ? tempData[0] : [],
    neutral = tempData ? tempData[1] : [],
    unproductive = tempData ? tempData[2] : [];

// Productive, Neutral, Unproductive
var colours=['#00ff00', '#add8e6', '#ff0000'];

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