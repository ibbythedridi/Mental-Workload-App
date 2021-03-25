import React, {useState} from 'react';
import {
    View,
    Text,
    ScrollView,
    Button
} from 'react-native';
import { globalStyles } from '../styles/global';
import { VictoryChart, VictoryGroup, VictoryLine, VictoryScatter, VictoryTheme } from 'victory-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.db');

var graphData = [];

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
                            data.push({
                                x: rows._array[i].dateTime.slice(11, 16),
                                y: rows._array[i].workloadRating
                            });    
                        }
                    }
                    resolve(data);
                });
                
            } catch (error) {
                reject(error);
            }
            
    }));
}

export default function ISA({ navigation }) {

    var graphWidth = graphData.length*60 + 100;

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [showPicker, setShowPicker] = useState(false);
    const [showChart, setShowChart] = useState(false);

    const onChange = async (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowPicker(Platform.OS === 'ios');
        setDate(currentDate);
        graphData = await queryDB(currentDate);
        if (graphData.length > 0) setShowChart(true);
        else setShowChart(false);
    }

    const showMode = (currentMode) => {
        setShowPicker(true);
        setMode(currentMode);
    };
    
    const showDatePicker = () => {
        showMode('date');
    };

    return (
        <View style={globalStyles.container}>
            <Text> {Moment(date).format('DD/MM/YYYY')} </Text>
            <View>
                <Button onPress={showDatePicker} title='Pick date' />
            </View>
            {showPicker && (<DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
                />
            )}
            {/* ScrollView for horizontal scrolling when there's lots of data */}
            {showChart && (<View>
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
            )}
            {!showChart && (
                <Text>No Data For {Moment(date).format('DD/MM/YYYY')}</Text>
            )}
            <View>
                <Button onPress={() => navigation.navigate('AddISA')} title='Add Data' />
            </View>
        </View>
    )
}