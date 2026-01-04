import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// Pastikan appName ini merujuk ke "MetaAirflow" dari app.json
AppRegistry.registerComponent(appName, () => App);