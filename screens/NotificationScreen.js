import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert,
FlatList} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader'
import { ListItem } from 'react-native-elements';

export default class NotificationScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: firebase.auth().currentUser.email ,
            allNotifications: [],
        };
        this.notificationRef = null
    }

    getNotifications=()=>{
        this.requestRef = db.collection("all_notifications")
        .where("notification_status", "==", "unread")
        .where("targeted_user_id",'==',this.state.userId)
        .onSnapshot((snapshot)=>{
          var allNotifications =  []
          snapshot.docs.map((doc) =>{
            var notification = doc.data()
            notification["doc_id"] = doc.id
            allNotifications.push(notification)
          });
          this.setState({
              allNotifications : allNotifications
          });
        })
      }


      componentDidMount(){
          this.getNotifications()
      }

      componentWillUnmount(){
          this.notificationRef();
      }

      keyExtractor = (item, index) => index.tostring()

      renderItem = ({item, index}) => {
          return (
              <ListItem
              key = {index}
              leftElement = {<Icon name = "book" type = "font-awesome" color = '#696969'/>}
              title = {item.book_name}
              titleStyle = {{color: 'black', fontWeight: 'bold'}}
              subTitle = {item.message}
              bottomDivider
              />
          )
      }
render () {
   return(
       <View style = {styles.container}>
           <View style = {{flex: 0.1}}>
                <MyHeader title = {"notifications"} navigation = {this.props.navigation}/>

           </View>
            <View style = {{flex:0.9}}>
                {
                    this.state.allNotifications.length === 0
                    ?(
                        <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style = {{fontSize: 25}}> you have no notifications </Text>
                            </View>
                    )
                    :(
                        <FlatList 
                        keyExtractor = {this.keyExtractor}
                        data = {this.state.allNotifications}
                        rendeeItem = {this.renderItem}

                        />
                    )
                }
            </View>
       </View>
   )
    }
}
const styles = StyleSheet.create({
    container : {
      flex : 1
    }
  })
  