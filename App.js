import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Forgot from './components/auth/Forgot';
import Chat from './components/chat/Chat';

import { createStore, CombineReducers, combineReducers, applyMiddleware} from 'redux'
import { useDispatch, useSelector, Provider } from 'react-redux'

import authReducer from './store/reducers/auth'
import thunk from 'redux-thunk';


function LoginScreen({route, navigation}){
  return(
    <Login
     nav={navigation} 
    />
  );
}

function RegisterScreen({route, navigation}){
  return(
    <Register 
      nav={navigation} 
    />
  );
}

function ForgotScreen({route, navigation}){
  return(
    <Forgot 
      nav={navigation} 
    />
  );
}

function ChatScreen({route, navigation}){
  return(
    <Chat 
      nav={navigation} 
      rute={route}
    />
  );
}

const reducers = combineReducers({
  auth:authReducer
})

const store = createStore(reducers, applyMiddleware(thunk))

const Stack = createStackNavigator();


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={Login}>
          <Stack.Screen 
            component={LoginScreen} 
            name="Login"         
            options={{
              title: 'CHAT APP',
              headerStyle: {
                backgroundColor: '#01a9a9',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen 
            component={RegisterScreen} 
            name="Register" 
            options={{
              title: 'RUMAH CHAT',
              headerStyle: {
                backgroundColor: '#01a9a9',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen 
            component={ForgotScreen} 
            name="Forgot" 
            options={{
              title: 'RUMAH CHAT',
              headerStyle: {
                backgroundColor: '#01a9a9',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen 
            component={ChatScreen} 
            name="Chat" 
            options={{
              title: 'RUMAH CHAT',
              headerStyle: {
                backgroundColor: '#01a9a9',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
