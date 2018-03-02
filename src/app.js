import React from 'react';
import {
  View
} from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import Routes from './routes';
import AppReducer from './reducers/app.reducer';
import AppStyles from './shared/app-styles';

const composeEnhancers = composeWithDevTools({ });
const store = __DEV__ ? createStore(AppReducer, composeEnhancers(applyMiddleware(reduxThunk)))
  : createStore(AppReducer, applyMiddleware(reduxThunk));

class App extends React.Component {
  constructor(props) {
    super(props);
    this.store = store;
  }
  render() {
    let ui = <Routes />

    return (
      <Provider store={this.store}>
        <View style={[AppStyles.layout,{borderWidth:0,borderColor:'#00f'}]}>
          {ui}
        </View>
      </Provider>
    );

  }
}
export default App;