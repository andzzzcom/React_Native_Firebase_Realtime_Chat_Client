import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector, connect } from 'react-redux';
import * as authActions from '../../store/actions/auth';

import Chat from '../chat/Chat';

const Login = (props) =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(false);

    const emailHandler = (e) =>{
        setEmail(e);
    }

    const passwordHandler = (p) =>{
        setPassword(p);
    }

    const isLoginHandler = () =>{
        setIsLoginHandler(true);
    }


    const dispatch = useDispatch();
    return(
            (props.isLogin
                ?
                <Chat />
                :
                <View style={styles.containerLogin}>
                    <Text style={styles.headerText}>
                        Login
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
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={styles.btnContainerSubmit}>
                        <TouchableOpacity 
                            onPress={()=>{
                                dispatch(authActions.checkLogin(email, password))
                                
                            }}
                            activeOpacity={0.7} 
                            style={styles.submitButton}
                        >
                            <Text style={styles.txtBtnSubmit}>
                                <FontAwesome name="user" size={15}/>
                                Login
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.btnBottom}>
                        <TouchableOpacity 
                            onPress={()=>props.nav.navigate("Register")} 
                            activeOpacity={0.7} 
                            style={styles.regBtn}
                        >
                            <Text style={styles.txtBtnSubmit}>
                                <FontAwesome name="user" size={15}/>
                                Register
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={()=>props.nav.navigate("Forgot")} 
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
        isLogin:state.auth.isLogin
    }
}


const styles = StyleSheet.create({
    containerLogin:{
        width:'95%',
        justifyContent:'center',
        alignItems:'center',
        borderWidth:3,
        borderRadius:10,
        borderColor:'#e4f1f1',
        height:350,
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
        justifyContent:'center'
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
    },
    errorTextLogin:{
        color:'red',
        fontWeight:'bold'
    }
})

export default connect(mapStateToProps, null)(Login);