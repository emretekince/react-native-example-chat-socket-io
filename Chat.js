'use strict';


import React from 'react-native'
import Socket from './Socket';
import { Icon} from 'react-native-icons';
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	TextInput,
	Component,
	ListView,
	Image,
	DeviceEventEmitter,
	Animated
} from 'react-native';

class Chat extends Component{
	constructor(props) {
		super(props);
		this.io = new Socket();
		this.messages=[];
		this.ownerID = Math.random().toString(36).slice(2);
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = { 
			dataSource : ds.cloneWithRows(this.messages),
			pan: new Animated.ValueXY(),
			headerMsg : 'Welcome!',
			headerColor: '#27ae60',
			headerIcon : 'fontawesome|smile-o'
		};
		this.init()	
	}

	init(){
		this.fetchMessages();
		this.io.onError(()=>{
			this.setState({
				headerMsg:"Server connection failed :(",
					headerColor: '#c0392b',
					headerIcon : 'fontawesome|warning'
				})
		})
		this.io.onConnect(()=>{
			this.setState({
				headerMsg : 'Welcome!',
				headerColor: '#27ae60',
				headerIcon : 'fontawesome|smile-o'
			})
		})
	}

	renderRow(rowData){
		return (
			<View>
			<Text style={this.msgItemStyle(rowData.ownerID)}>{rowData.msg}</Text>
			</View>
			)
	}

	fetchMessages(){
		this.io.fetchMessages((msg)=>{
			this.messages.push(msg);
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(this.messages)
			})
		})
	}

	buttonClicked() {
		if(!this.state.text)
			return;
		this.io.sendMessage({msg: this.state.text, ownerID: this.ownerID});
		this.setState({text:""});
	}

	render() {
		return(
			<View style={styles.container}>

			<View style={this.getHeaderStyle()}>
			<Text style={{flex:6, color: '#fff', fontSize: 13, paddingTop: 2}}>{this.state.headerMsg} </Text>
			<Icon name={this.state.headerIcon} size={20} color='#fff' style={{width: 20,height: 19, flex:1}} />
			</View>

			<View style={styles.wrap}>
			<ListView 
			dataSource={this.state.dataSource} style={{alignSelf: 'stretch'}}
			renderRow={this.renderRow.bind(this)}/>
			</View>

			<Animated.View style={this.getFooterStyle()}>
			<TextInput placeholder="Say something" placeholderTextColor="#999"
			style={styles.textBox} onFocus={this.animateFooter.bind(this)} onEndEditing={this.animateFooterEnd.bind(this)} clearButtonMode={'always'}
			onChangeText={(text) => this.setState({text})} value={this.state.text}
			/>
			<TouchableOpacity style={styles.button} onPress={this.buttonClicked.bind(this)}>
			<Text style={styles.buttonText}>Send</Text>
			</TouchableOpacity>
			</Animated.View>

			</View>
			) 
	}


	animateFooter(){
		var SPRING_CONFIG = {tension: 2, friction: 3}; //Soft spring

		Animated.spring(this.state.pan, {
			SPRING_CONFIG,
          toValue: {x: 0, y: -250}                        // return to start
      }).start();
	}

	animateFooterEnd(){
		var SPRING_CONFIG = {tension: 2, friction: 3}; //Soft spring

		Animated.spring(this.state.pan, {
			SPRING_CONFIG,
          toValue: {x: 0, y: 0}                        // return to start
      }).start();
	}

	msgItemStyle(id){
		return {
			color: '#34495e',
			alignSelf: ((id === this.ownerID) ? 'flex-end' : 'flex-start'),
			backgroundColor: '#ecf0f1',
			padding: 6,
			borderRadius: 10,
			marginBottom: 10,
			fontSize: 12
		}
	}

	getHeaderStyle(){
		return {
			backgroundColor: this.state.headerColor,
			alignSelf: 'stretch',
			padding: 10,
			flexDirection: 'row',
		}
	}

	getFooterStyle(){
		return [
		styles.footer, 
		{
			transform: this.state.pan.getTranslateTransform()
		}
		];
	}
}
var styles = StyleSheet.create({
	container:{
		alignItems: 'center',
		backgroundColor: "#222",
		flex:1,
		paddingTop:50
	},
	wrap:{
		backgroundColor: "#222",
		flex:1,
		paddingLeft:20,
		paddingRight:20,
		paddingTop:10,
		paddingBottom:10,
		alignSelf: 'stretch',

	},
	button:{
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
		height: 30,
		borderRadius: 10,
		width:10,
		flex: 1,
	},
	buttonText:{
		fontSize: 14,
		color: '#3498db'
	},
	textBox: {		
		flex: 7,
		borderRadius: 5,
		height: 30,
		borderColor: '#fff', 
		borderWidth: 1, 
		paddingLeft: 6,
		width: 100,
		marginRight:10,
		fontSize:12,
	},
	footer:{
		flexDirection: 'row',
		backgroundColor: '#fff',
		alignSelf: 'stretch', 
		padding:10,
	}

})

module.exports = Chat; 