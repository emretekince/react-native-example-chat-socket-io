'use strict';

import React from 'react-native'
import { Icon} from 'react-native-icons';

const {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	Component,
	Image,
	TextInput,
	AsyncStorage,
} = React;
import Dimensions from 'Dimensions';
var {height, width} = Dimensions.get('window');

class Login extends  Component{
	constructor(props) {
		super(props);

		this.state = { 
			username : ''
		};
	}

	onLoginPressed(){
		this.props.onLogin();
		AsyncStorage.setItem('username', this.state.username)
	}

	render() {
		return(
			<View style={styles.container}>

			<Image
			style={{ position: 'absolute', width:width, height:height, top:0, left: 0}}
			source={require('./bg.jpg')}
			/>
			<Icon name={'fontawesome|comments-o'} size={100} color='#fff' style={{width: 100,height: 100, backgroundColor:'transparent', marginBottom:100}} />

			<Icon name={'fontawesome|user'} size={20} color='#fff' style={{position:'absolute', width: 20,height: 20, backgroundColor:'transparent', marginTop:9, marginLeft:4}} />
			<TextInput
			style={styles.TextInput} 
			onChangeText={(username) => this.setState({username})} placeholder="Username" placeholderTextColor="#ccc"
			/>

			<TouchableOpacity style={styles.button} onPress={this.onLoginPressed.bind(this)}>
			<Text style={styles.buttonText}>Log in</Text>
			</TouchableOpacity>
			</View>
			)
	}
}

var styles = StyleSheet.create({
	container:{
		padding: 20,
		alignItems: 'center',
		backgroundColor: "transparent",
		flex:1,
		padding: 20,
		paddingTop:50,
	},
	button:{
		backgroundColor: '#ff3366',
		justifyContent: 'center',
		alignItems: 'center',
		height: 45,
		alignSelf: 'stretch', 
		borderRadius: 20
	},
	text:{
		alignItems: 'center',
		color: 'rgba(255,255,255,.8)',
		marginBottom: 20,
		backgroundColor: 'transparent',
		fontSize: 15
	},
	buttonText:{
		color: '#fff',
		fontSize: 12,
	},
	TextInput:{height: 40,
		backgroundColor: 'rgba(0,0,0,.2)',
		borderRadius:2,
		paddingLeft: 5, 
		fontSize:12, 
		color: '#fff',
		textAlign: 'center',
		marginBottom:20}
	})

module.exports = Login; 