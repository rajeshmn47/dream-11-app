import { AppRegistry, Text, View } from 'react-native';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '../store';
import MyStackNavigator from '../components/navigation/MyStackNavigator';

export default function Acc() {
    return (
        <PaperProvider>
            <AlertNotificationRoot>
                <Provider store={store}>
                    <PersistGate persistor={persistor} loading={null}>
                        <MyStackNavigator/>
                    </PersistGate>
                </Provider>
            </AlertNotificationRoot>
        </PaperProvider>
    );
}

AppRegistry.registerComponent('dream11-app-new', () => Acc);