import * as React from 'react';
import {Header, Icon, Badge, ThemeConsumer} from 'react-native-elements';
import { View, Text, StyleSheet, Alert, TouchableNativeFeedbackBase } from "react-native";
import db from '../config';

export default class MyHeader extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: ''
        }
    }

    getNumberOfUnreadNotifications() {
        db.collection('all_notifications').where('notification_status', '==', 'unread')
        .onSnapshot((sanpshot)=> {
            var unreadNotifications = sanpshot.docs.map((doc)=> doc.data())
            this.setState({
                value: unreadNotifications.length
            })
        })
    }

    componentDidMount(){
        this.getNumberOfUnreadNotifications()
    }

    bellIconWithBadge = ()=> {
        return(
            <View>
                 <Icon name='bell' type='font-awesome' color='#696969' size={25}
                     onPress={() =>this.props.navigation.navigate('Notification')}/>
                <Badge
                    value={this.state.value}
                    containerStyle={{ position: 'absolute', top: -4, right: -4 }}/>
            </View>
        )
    }
    render(){
         return (
      <Header
      leftComponent = {<Icon name = 'bars' type = 'font-awesome' color = '#696969' 
        onPress = {()=> this.props.navigation.toggleDrawer() }/>}
        centerComponent = {{text: this.props.title, style: {color: '#90A5A9', fontSize: 20, fontWeight: 'bold'}  }}
        rightComponent = {<this.bellIconWithBadge {...this.props}/>}
        backgroundColor = 'pink'
   
      />
        )
    }
}   
