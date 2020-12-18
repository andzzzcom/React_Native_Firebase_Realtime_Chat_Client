import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

export default class Forgot extends Component{
    render(){
        return(
            <View style={styles.containerForgot}>
                <Text style={styles.headerText}>
                    Forgot Password
                </Text>
                <View style={styles.inputUsername}>
                    <TextInput 
                        placeholder="Input your email"
                    />
                </View>
                <View style={styles.btnContainerSubmit}>
                    <TouchableOpacity 
                        onPress={()=>this.props.nav.navigate("Forgot")} 
                        activeOpacity={0.7} 
                        style={styles.submitButton}
                    >
                        <Text style={styles.txtBtnSubmit}>
                            <FontAwesome name="user" size={15}/>
                            Reset Password
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btnBottom}>
                    <TouchableOpacity 
                        onPress={()=>this.props.nav.navigate("Login")} 
                        activeOpacity={0.7} 
                        style={styles.forgotBtn}
                    >
                        <Text style={styles.txtBtnSubmit}>
                            <FontAwesome name="user" size={15}/>
                            Login
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={()=>this.props.nav.navigate("Register")} 
                        activeOpacity={0.7} 
                        style={styles.regBtn}
                    >
                        <Text style={styles.txtBtnSubmit}>
                            <FontAwesome name="user" size={15}/>
                            Register
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    containerForgot:{
        width:'95%',
        justifyContent:'center',
        alignItems:'center',
        borderWidth:3,
        borderRadius:10,
        borderColor:'#e4f1f1',
        height:350
    },
    inputUsername:{
        borderWidth:1,
        borderColor:'black',
        width:'80%',
        margin:10,
        marginTop:15,
        padding:10,
        borderRadius:10
    },
    inputPassword:{
        borderWidth:1,
        borderColor:'black',
        width:'80%',
        padding:10,
        margin:10,
        borderRadius:10
    },
    btnContainerSubmit:{
        width:'100%',
        alignItems:'center'
    },
    submitButton:{
        margin:10,
        backgroundColor:'#05a0a0',
        width:'80%',
        height:50,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
    },
    txtBtnSubmit:{
        color:'white',
        fontWeight:'bold',
        fontSize:16
    },
    headerText:{
        fontSize:24,
        fontWeight:'bold'
    },
    btnBottom:{
        flexDirection:'row',
        width:'90%',
        alignItems:'center',
        justifyContent:'center',
        display:'none'
    },
    regBtn:{
        width:'40%',
        margin:5,
        backgroundColor:'#05a0a0',
        height:50,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
    },
    forgotBtn:{
        width:'40%',
        margin:5,
        backgroundColor:'#05a0a0',
        height:50,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
    }
})