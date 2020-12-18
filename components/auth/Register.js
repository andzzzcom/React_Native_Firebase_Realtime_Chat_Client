import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector, connect } from 'react-redux';
import * as authActions from '../../store/actions/auth';

import Login from '../auth/Login';

const Register = (props) =>
{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegister, setIsRegister] = useState(false);

    const emailHandler = (e) =>{
        setEmail(e);
    }

    const passwordHandler = (p) =>{
        setPassword(p);
    }
    useEffect(()=>{
        
        console.log(props.isRegister)
    }, [])

    const dispatch = useDispatch();
    return(
        (props.isRegister
            ?
            <View>
                <Text>
                    Successfully Register
                </Text>
            </View>
            :
            <View style={styles.containerRegister}>
                <Text style={styles.headerText}>
                    Register
                </Text>
                <View style={styles.inputUsername}>
                    <TextInput 
                        placeholder="Input your email"
                        onChangeText={emailHandler}
                    />
                </View>
                <View style={styles.inputPassword}>
                    <TextInput
                        placeholder="Input your password"
                        onChangeText={passwordHandler}
                    />
                </View>
                <View style={styles.inputPassword}>
                    <TextInput
                        placeholder="Input your password (confirm)"
                        onChangeText={passwordHandler}
                    />
                </View>
                <View style={styles.btnContainerSubmit}>
                    <TouchableOpacity 
                        onPress={()=>{
                                dispatch(authActions.Register(email, password))
                        }} 
                        activeOpacity={0.7} 
                        style={styles.submitButton}
                    >
                        <Text style={styles.txtBtnSubmit}>
                            <FontAwesome name="user" size={15}/>
                            Register
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btnBottom}>
                    <TouchableOpacity 
                        onPress={()=>this.props.nav.navigate("Login")} 
                        activeOpacity={0.7} 
                        style={styles.regBtn}
                    >
                        <Text style={styles.txtBtnSubmit}>
                            <FontAwesome name="user" size={15}/>
                            Login
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={()=>this.props.nav.navigate("Forgot")} 
                        activeOpacity={0.7} 
                        style={styles.forgotBtn}
                    >
                        <Text style={styles.txtBtnSubmit}>
                            <FontAwesome name="user" size={15}/>
                            Forgot
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    );
}

function mapStateToProps(state){
    return{
        isRegister:state.auth.isRegister
    }
}

const styles = StyleSheet.create({
    containerRegister:{
        width:'95%',
        justifyContent:'center',
        alignItems:'center',
        borderWidth:3,
        borderRadius:10,
        borderColor:'#e4f1f1',
        height:450
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

export default connect(mapStateToProps, null)(Register);