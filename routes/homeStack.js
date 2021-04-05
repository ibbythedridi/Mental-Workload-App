import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Dashboard from '../screens/dashboard';
import ISA from '../screens/isa';
import ScreenTime from '../screens/screenTime';
import Sleep from '../screens/sleep';
import Settings from '../screens/settings';
import AddData from '../screens/addData';
import AddISA from '../screens/addISA';
import AddScreenTime from '../screens/addScreenTime';
import AddSleep from '../screens/addSleep';
import Header from '../components/header';

const HomeStack = createStackNavigator({
    Dashboard: {
        screen: Dashboard,
        navigationOptions: {
            headerTitle: () => <Header text='Dashboard' />
        }
    },
    ISA: {
        screen: ISA,
        navigationOptions: {
            headerTitle: () => <Header text='ISA' />
        }
    },
    ScreenTime: {
        screen: ScreenTime,
        navigationOptions: {
            headerTitle: () => <Header text='Screen Time' />
        }
    },
    Sleep: {
        screen: Sleep,
        navigationOptions: {
            headerTitle: () => <Header text='Sleep' />
        }
    },
    Settings: {
        screen: Settings,
        navigationOptions: {
            headerTitle: () => <Header text='Settings' />
        }
    },
    AddData: {
        screen: AddData,
        navigationOptions: {
            headerTitle: () => <Header text='Add Data' />
        }
    },
    AddISA: {
        screen: AddISA,
        navigationOptions: {
            headerTitle: () => <Header text='Add ISA' />
        }
    },
    AddScreenTime: {
        screen: AddScreenTime,
        navigationOptions: {
            headerTitle: () => <Header text='Add Screen Time' />
        }
    },
    AddSleep: {
        screen: AddSleep,
        navigationOptions: {
            headerTitle: () => <Header text='Add Sleep' />
        }
    }
});

export default createAppContainer(HomeStack);