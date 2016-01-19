/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
 'use strict';
 
 import React from 'react-native';
 import Chat from './Chat';

 var {
  AppRegistry,
  StatusBarIOS
} = React;

var AwesomeProject = React.createClass({
  componentDidMount: function() {
 },

 render: function() {
  StatusBarIOS.setStyle('light-content');
  return (
    <Chat/>
    );
}
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
