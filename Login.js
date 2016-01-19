'use strict';

import React from 'react-native'
const {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	Component,
	Image
} = React;

class Login extends  Component{
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<View style={styles.container}>
			<Text style={styles.text}>Hello</Text>
			<TouchableOpacity style={styles.button} >
						<Text style={styles.buttonText}>click</Text>
			</TouchableOpacity>
			</View>
			)
	}
}

var styles = StyleSheet.create({
	container:{
		padding: 20,
		alignItems: 'center',
		backgroundColor: "#222",
		flex:1,
		padding: 20,
		paddingTop:50
	},
	button:{
		alignSelf: 'stretch',
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
		height: 50,
		borderRadius: 10
	},
	text:{
		alignItems: 'center',
		color: 'rgba(255,255,255,.5)'
	},
	buttonText:{
		fontSize: 15,
	}
})

module.exports = Login; 