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
//React.useEffect(() => {
function queryDB(date) {
    let data = [];
    db.transaction(tx => {
        tx.executeSql('SELECT workloadRating, dateTime from isa', [], (_, { rows }) => {
            for (var i=0; i < rows._array.length; i++) {
                if (rows._array[i].dateTime.slice(0, 10) == Moment(date).format('DD/MM/YYYY')) {
                    console.log("matching");
                    data.push({
                        x: rows._array[i].dateTime.slice(11, 16),
                        y: rows._array[i].workloadRating
                    });    
                }
            }
        });
    });
    /* Returning before full completion of code */
    console.log("returning");
    return data;
}

//}, []);

export default function ISA() {

    var graphWidth = graphData.length*60;

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [showPicker, setShowPicker] = useState(false);
    const [showChart, setShowChart] = useState(false);

    //console.log(Moment(date).format('DD/MM/YYYY'));
    
    //console.log(showPicker);

    const onChange = async (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowPicker(Platform.OS === 'ios');
        setDate(currentDate);
        graphData = await queryDB(date);
        console.log(graphData.length);
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
            <Text> All recorded mental workload levels</Text>
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
            {showChart && (<ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
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
            )}
            {!showChart && (
                <Text>No Data For {Moment(date).format('DD/MM/YYYY')}</Text>
            )}
        </View>
    )
}