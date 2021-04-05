import React, {useState} from 'react';
import {
    View,
    ScrollView,
    Dimensions
} from 'react-native';
import { globalStyles } from '../styles/global';
import { VictoryChart, VictoryGroup, VictoryLine, VictoryScatter, VictoryTheme, VictoryAxis, VictoryLegend } from 'victory-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import FlashMessage, { showMessage } from "react-native-flash-message";
import DBHelper from '../components/dbHelper';
import DButton from '../components/button';

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
    const [showPicker1, setShowPicker1] = useState(false);
    const [showPicker2, setShowPicker2] = useState(false);
    const [showChart1, setShowChart1] = useState(false);
    const [showChart2, setShowChart2] = useState(false);

    const onChangeDate = async (event, selectedDate) => {
        setShowPicker1(!Platform.OS === 'ios');
        // If user gets picker then clicks cancel, selectedDate is null, so only run this if they select a date
        if (selectedDate) {
            let dateSelect = Moment(selectedDate).format('DD/MM/YYYY');

            setDate1(selectedDate);

            tempData = await dbHelper.getISAData(dateSelect, xAxis);
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
        setShowPicker2(!Platform.OS === 'ios');
        // If user gets picker then clicks cancel, selectedDate is null, so only run this if they select a date
        if (selectedDate) {
            let dateComp = Moment(selectedDate).format('DD/MM/YYYY');
            
            // If the chosen date is different to the first date, the second graph is shown
            if (dateComp != Moment(date1).format('DD/MM/YYYY')) {
                setDate2(selectedDate);
                
                tempData = await dbHelper.getISAData(dateComp, xAxis);
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
    };

    const showCompPicker = () => {
        setShowPicker2(true);
    }

    return (
        <View style={globalStyles.container}>
            <DButton text='Pick date' onPress={showDatePicker} />
            {showPicker1 && (<DateTimePicker
                testID="dateTimePicker1"
                value={date1}
                mode={'date'}
                display="default"
                onChange={onChangeDate}
                />
            )}
            {showPicker2 && (<DateTimePicker
                testID="dateTimePicker2"
                value={date2}
                mode={'date'}
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
            <DButton text='Select Second Date' onPress={showCompPicker}/>
            </View>
            )}
            {/* Could add this button into the header instead? As a '+' button */}
            <DButton text='Add Data' onPress={() => navigation.navigate('AddISA')} />
            <FlashMessage position='bottom' />
        </View>
    )
}