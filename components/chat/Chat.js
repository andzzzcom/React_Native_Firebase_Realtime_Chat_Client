import React, { useState, Component, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';

import moment from 'moment';
import firebase, { app } from 'firebase';
import 'firebase/firestore';
import fbConfig from '../../components/firebase/Firebase';


import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings(['Setting a timer']);
const Chat = (props) =>{

    const [tmpTeks, setTmpTeks] = useState("")
    const [teks, setTeks] = useState([])

    const tmpTeksHandler = (t) =>{
        setTmpTeks(t)
    }

    const teksHandler = (e) => 
    {
        setTeks([
                ...teks,
                e
            ])
    }

    const addTeks = () =>{
        teksHandler(tmpTeks)
        console.log(teks)

        
        let datas = {
            message: tmpTeks,
            username: 'user',
            datetime: moment().utcOffset('+07:00').format('DD-MMM-YYYY HH:mm:ss'),  
            createdAt: Date()
        };
      
        firebase
        .app()
        .firestore().collection('chat').doc().set(datas)
        .then(function() {
            console.log("Doc successful");

            
            const socket = io('http://192.168.0.19:8000/');
            socket.emit("send_message", {
                msg_chat:tmpTeks,
                //user_chat:this.props.location.state.user,
                user_chat:'user',
                time_chat:moment().utcOffset('+07:00').format('DD-MMM-YYYY HH:mm:ss')
            })


            setTmpTeks('')
        })
        .catch(function(error) {
           console.error("Error writing doc", error);
        });


    }
    useEffect(()=>{
        if(!firebase.apps.length)
            firebase.initializeApp(fbConfig);
            
        var tempArray = [];
        try {
            
            firebase
            .app()
            .firestore()
            .collection('chat')
            .orderBy('createdAt', 'asc')
            .get()
            .then(querySnapshot => {
                querySnapshot.docs.forEach(doc => {
                    const datanya = doc.data();
                    setTeks(teks => ([
                        ...teks,
                        datanya.message
                    ]))
                });
            });
            

            socket.on("start_message", (data)=>{
                this.setState((prevState) => ({
                    user_chat:'user',
                    id:'12345'
                }))
    
            });
            
            socket.on("new_message", (data)=>{
                this.setTeks(prevState => ({
                    message_chat:[...prevState.message_chat, {
                        message:"["+data.time+"] "+data.user+": "+ data.msg
                    }],
                }))

                var elem = document.getElementById('message_all');
                elem.scrollTop = elem.scrollHeight;
            });
        } catch (error) {
            console.log("error")
        }

        
        const socket = io('http://192.168.0.19:8000/');
        
    }, [])

    const readMessage = () =>{
        if(!firebase.apps.length)
            firebase.initializeApp(fbConfig);

        var tempArray = [];
        try {
            // firebase.firestore().collection('chat').orderBy('createdAt').get()
            //     .then(querySnapshot => {
            //         querySnapshot.docs.forEach(doc => {
            //             const datanya = doc.data();
            //             this.setTeks(prevState => ({
            //                 message_chat:[...prevState.message_chat, {
            //                     message:"["+datanya.datetime+"] "+datanya.username+": "+ datanya.message
            //                 }],
            //             }))
            //             var elem = document.getElementById('message_all');
            //             elem.scrollTop = elem.scrollHeight;
            //         });

            //     });
        } catch (error) {
            console.log("error")
        }
    }

    //console.log(teks)
    return(
        <View style={StyleSheet.containerChatMessage}>
            <ScrollView 
                style={styles.screenText}
                ref={ref => {this.scrollView = ref}}
                onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}
            >
                {teks.map(function(item, i){
                    return (
                        <View style={styles.eachTextChat} key={i}>
                            <Text>
                                [04-June-2020] Admin:
                            </Text>
                            <Text>
                                {item}
                            </Text>
                        </View>
                    )
                })}
            </ScrollView>
            <View style={styles.inputTextChat}>
                <View
                    style={styles.inputChat}
                >
                    <TextInput
                        placeholder="Input message here..."
                        onChangeText={tmpTeksHandler}
                        value={tmpTeks}
                    />
                </View>
                <View style={styles.btnChatContainer}>
                    <TouchableOpacity 
                        style={styles.sendChatBtn}
                        onPress={addTeks}
                    >
                        <Text style={styles.txtBtnChat}>
                            Send
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerChatMessage:{
        justifyContent:'center',
        alignItems:'center',
        padding:0
    },
    screenText:{
        height:'80%',
        padding:10,
        width:'100%',
        backgroundColor:'#0c9090'
    },
    inputTextChat:{
        width:'100%',
        padding:2,
        flexDirection:'row',
        backgroundColor:'#01a9a9',
        height:150
    },
    inputChat:{
        borderWidth:3,
        borderRadius:10,
        borderColor:'#d9eaea',
        width:'70%',
        padding:5,
        margin:10,
        backgroundColor:'white',
        height:45
    },
    btnChatContainer:{
        width:'30%'
    },
    sendChatBtn:{
        backgroundColor:'#edf1f1',
        borderWidth:1,
        borderColor:'#d9e7e7',
        height:45,
        borderRadius:10,
        marginTop:10,
        width:70,
        alignItems:'center'
    },
    txtBtnChat:{
        padding:10
    },
    eachTextChat:{
        margin:2,
        marginTop:5,
        width:'97%',
        height:70,
        backgroundColor:'#e9f5f5',
        borderColor:'#d9ecec',
        borderWidth:2,
        borderRadius:10,
        padding:15
    }
});

export default Chat