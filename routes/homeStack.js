import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Dashboard from '../screens/dashboard';
import ISA from '../screens/isa';
import ScreenTime from '../screens/screenTime';
import Sleep from '../screens/sleep';
import Settings from '../screens/settings';

const screens = {
    Dashboard: {
        screen: Dashboard
    },
    ISA: {
        screen: ISA
    },
    ScreenTime: {
        screen: ScreenTime
    },
    Sleep: {
        screen: Sleep
    },
    Settings: {
        screen: Settings
    }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);