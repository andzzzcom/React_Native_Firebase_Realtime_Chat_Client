import firebase from 'firebase';
import fbConfig from '../../components/firebase/Firebase';

export const checkLogin = (email, password) => {
    return async (dispatch) => {
        console.log("loading...")

        if (!firebase.apps.length)
            firebase.initializeApp(fbConfig);
        firebase
        .auth()
        .signOut()
        .then(function() {
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .catch(e => {
                    console.log(e)
                });
            
            firebase.auth().onAuthStateChanged(user => {
                console.log(user)
                if (user) {
                    dispatch({
                        type: 'login',
                        email: email,
                        password: password,
                        isLogin: true,
                        isRegister: false
                    })
                } else {
                    dispatch({
                        type: 'login',
                        email: email,
                        password: password,
                        isLogin: false,
                        isRegister: false
                    })
                }
            });
        }, function(error) {
            // An error happened.
        });

    }
}

export const Register = (email, password) => {
    console.log(email)
    console.log(password)

    return async (dispatch) => {
        console.log("loading...")

        if (!firebase.apps.length)
            firebase.initializeApp(fbConfig);
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(res => {
                console.log(res)
                dispatch({
                    type: 'register',
                    email: email,
                    password: password,
                    isLogin: false,
                    isRegister: true
                })
            })
            .catch(e => {
                dispatch({
                    type: 'register',
                    email: email,
                    password: password,
                    isLogin: false,
                    isRegister: false
                })
            });
    }
}