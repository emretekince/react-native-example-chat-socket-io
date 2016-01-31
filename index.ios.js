/**
 * Sample React Native Chat App with Socket.io
 * Emre TEKİNCE - emretekince.com
 * https://github.com/emretekince/react-native-example-chat-socket-io
 */
 'use strict';
 
 import React from 'react-native';
 import Login from './Login';
 import Chat from './Chat';

 var {
  AppRegistry,
  StatusBarIOS,
  Component,
  View,
  ActivityIndicatorIOS,
  AsyncStorage
} = React;

class AwesomeProject extends Component{
  constructor(props) {
    super(props);
    this.state = { 
      isLoggedIn:false,
      checkingAuth: true
    }
  }

  componentDidMount(){
    AsyncStorage.getItem('username',(err,val)=>{
      this.setState({
        checkingAuth: false,
        isLoggedIn: val != null
      })
    })
  }

  render() {
    StatusBarIOS.setStyle('light-content');
    if(this.state.checkingAuth){
      return (
        <View style={{flex:1,justifyContent:'center'}}>
        <ActivityIndicatorIOS animating={true} size="large" />
        </View>
        )
    }
    if(!this.state.isLoggedIn)
      return (
        <Login onLogin={this.onLogin.bind(this)}/>
        );
    else
      return (
        <Chat/>
        );
  }

  onLogin() {
    this.setState({
      isLoggedIn:true
    })
  }

}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
