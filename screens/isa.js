import React, {useState} from 'react';
import {
    View,
    ScrollView,
    Button,
    Dimensions
} from 'react-native';
import { globalStyles } from '../styles/global';
import { VictoryChart, VictoryGroup, VictoryLine, VictoryScatter, VictoryTheme, VictoryAxis, VictoryLegend } from 'victory-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import FlashMessage from 'react-native-flash-message';
import { showMessage } from "react-native-flash-message";
import DBHelper from '../DBHelper';

const dbHelper = new DBHelper();

const windowWidth = Dimensions.get('window').width;

// Graph colours for each graph
const colours = ['#000', '#f00'];

// Temporary variable which holds information from database query
var tempData = [];
// ISA data
var graphData = [];
// ISA data for comparison
var compareData = [];
// X-Axis values
var xAxis = [];
var legend = [];

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
        var dateSelect = Moment(selectedDate).format('DD/MM/YYYY');
        // If user gets picker then clicks cancel, selectedDate is null, so only run this if they select a date
        if (selectedDate) {
            setDate1(selectedDate);

            tempData = await dbHelper.getISAData(selectedDate, xAxis);
            graphData = tempData[0];
            xAxis = tempData[1];

            {/* Dynamically generate the legend */}
            // If the legend hasn't been populated for this graph yet, push data
            // Otherwise replace data
            if (legend.length == 0) {
                legend.push({
                    name: dateSelect,
                    symbol: { fill: colours[0] }
                })
            } else {
                legend[0].name = dateSelect;
            }

            setShowChart1(false);
            if (graphData.length > 0) setShowChart1(true);
            else {
                compareData = [];
                legend = [];
                showMessage({
                    message: "No data for: " + dateSelect,
                    type: 'warning',
                });
            }
        }
        
    }

    const onChangeComp = async(event, selectedDate) => {
        setShowPicker2(Platform.OS === 'ios');
        var dateComp = Moment(selectedDate).format('DD/MM/YYYY');
        // If user gets picker then clicks cancel, selectedDate is null, so only run this if they select a date
        if (selectedDate) {
            if (dateComp != Moment(date1).format('DD/MM/YYYY')) {
                setDate2(selectedDate);
                
                tempData = await dbHelper.getISAData(selectedDate, xAxis);
                compareData = tempData[0];
                xAxis = tempData[1];

                {/* Dynamically generate the legend */}
                // If the legend hasn't been populated for this graph yet, push data
                 // Otherwise replace data
                if (legend.length == 1) {
                    legend.push({
                        name: dateComp,
                        symbol: { fill: colours[1] }
                    })
                } else {
                    legend[1].name = dateComp;
                }

                setShowChart2(false);
                if (compareData.length > 0) setShowChart2(true);
                else {
                    compareData = [];
                    legend.pop();
                    showMessage({
                        message: "No data for: " + dateComp,
                        type: 'warning',
                    });
                }

                setShowChart1(false);
                setShowChart1(true); 
            } else {
                showMessage({
                    message: "Cannot compare against the same date",
                    type: 'warning',
                });
            }
        }
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
                    <VictoryLegend
                        x={windowWidth / 2 - 100}
                        title='Legend'
                        centerTitle
                        orientation='horizontal'
                        data={legend}
                    />
                    <VictoryAxis tickValues={xAxis} />
                    <VictoryAxis dependentAxis domain={ [1, 5] } />
                    <VictoryGroup data={graphData}>
                        <VictoryLine style={{ data: { stroke: colours[0] }}} />
                        <VictoryScatter style = {{ data: { fill: colours[0] }}} />
                    </VictoryGroup>
                    
                    {showChart2 && (
                        <VictoryGroup data={compareData}>  
                            <VictoryLine style={{ data: { stroke: colours[1] }}} />
                            <VictoryScatter style = {{ data: { fill: colours[1] }}} />
                        </VictoryGroup>
                    )}
                </VictoryChart>
            </ScrollView>
            <Button title='Select Second Date' onPress={showCompPicker}/>
            </View>
            )}
            <View>
                {/* Could add this button into the header instead? As a '+' button */}
                <Button title='Add Data' onPress={() => navigation.navigate('AddISA')} />
            </View>
            <FlashMessage position='bottom' />
        </View>
    )
}