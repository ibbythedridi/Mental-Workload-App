import React, {useState} from 'react';
import {
    View,
    Text,
    ScrollView,
    Button
} from 'react-native';
import { globalStyles } from '../styles/global';
import { VictoryChart, VictoryGroup, VictoryLine, VictoryScatter, VictoryTheme, VictoryAxis } from 'victory-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.db');

var graphData = [];
var compareData = [];
var xAxis = [];

// Retrieve data from database
async function queryDB(date) {
    let data = [];
    // Promise placed here to make sure the full database transaction has been complete before continuing 
    return new Promise((resolve, reject) => 
        db.transaction(tx => {
            try {
                tx.executeSql('SELECT workloadRating, dateTime from isa ORDER BY dateTime', [], (_, { rows }) => {
                    for (var i=0; i < rows._array.length; i++) {
                        if (rows._array[i].dateTime.slice(0, 10) == Moment(date).format('DD/MM/YYYY')) {
                            var dT = rows._array[i].dateTime.slice(11, 16);
                            data.push({
                                x: dT,
                                y: rows._array[i].workloadRating
                            });  
                            if (xAxis.includes(dT) == false) xAxis.push(dT);
                        }
                    }
                    xAxis = xAxis.sort();
                    
                    resolve(data);
                });
                
            } catch (error) {
                reject(error);
            }
            
    }));
}

export default function ISA({ navigation }) {

    var graphWidth = xAxis.length*60 + 100;

    const [date1, setDate1] = useState(new Date());
    const [date2, setDate2] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [showPicker1, setShowPicker1] = useState(false);
    const [showPicker2, setShowPicker2] = useState(false);
    const [showChart1, setShowChart1] = useState(false);
    const [showChart2, setShowChart2] = useState(false);

    const onChangeDate = async (event, selectedDate) => {
        setShowPicker1(Platform.OS === 'ios');
        setDate1(selectedDate);
        graphData = await queryDB(selectedDate);
        setShowChart1(false);
        if (graphData.length > 0) setShowChart1(true);
    }

    const onChangeComp = async(event, selectedDate) => {
        setShowPicker2(Platform.OS === 'ios');
        setDate2(selectedDate);
        compareData = await queryDB(selectedDate);

        setShowChart1(false);
        setShowChart1(true);
        setShowChart2(false);
        if (compareData.length > 0) setShowChart2(true);
    }
    
    const showDatePicker = () => {
        setShowPicker1(true);
        setMode('date');
    };

    const showCompPicker = () => {
        setShowPicker2(true);
        setMode('date');
    }

    return (
        <View style={globalStyles.container}>
            <Text> {Moment(date1).format('DD/MM/YYYY')} </Text>
            <View>
                <Button title='Pick date' onPress={showDatePicker} />
            </View>
            {showPicker1 && (<DateTimePicker
                testID="dateTimePicker"
                value={date1}
                mode={mode}
                display="default"
                onChange={onChangeDate}
                />
            )}
            {showPicker2 && (<DateTimePicker
                testID="dateTimePicker"
                value={date2}
                mode={mode}
                display="default"
                onChange={onChangeComp}
                />
            )}
            {/* ScrollView for horizontal scrolling when there's lots of data */}
            {showChart1 && (<View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
                <VictoryChart 
                    theme={VictoryTheme.material} 
                    height = {300} 
                    width={graphWidth} 
                    >
                    <VictoryAxis tickValues={xAxis} />
                    <VictoryAxis dependentAxis domain={ [1, 5] } />
                    <VictoryGroup data={graphData}>
                        <VictoryLine style={{ data: { stroke: '#000' }}} />
                        <VictoryScatter style = {{ data: { fill: '#000' }}} />
                    </VictoryGroup>
                    {showChart2 && (
                        <VictoryGroup data={compareData}>
                            <VictoryLine style={{ data: { stroke: '#00f' }}} />
                            <VictoryScatter style = {{ data: { fill: '#00f' }}} />
                        </VictoryGroup>
                    )}
                </VictoryChart>
            </ScrollView>
            <Button title='Select Second Date' onPress={showCompPicker}/>
            </View>
            )}
            {!showChart1 && (
                <Text>No Data For {Moment(date1).format('DD/MM/YYYY')}</Text>
            )}
            <View>
                {/* Could add this button into the header instead? As a '+' button */}
                <Button title='Add Data' onPress={() => navigation.navigate('AddISA')} />
            </View>
        </View>
    )
}