
const initialState = {
    email:'',
    password:'',
    isLogin:false,
    isRegister:false
}

export default (state = initialState, action) => {
    switch(action.type){
        case "login":
            return{
                ...state,
                email:action.email,
                password:action.password,
                isLogin:action.isLogin,
                isRegister:action.isRegister
            }
        case "register":
            return{
                ...state,
                email:action.email,
                password:action.password,
                isLogin:action.isLogin,
                isRegister:action.isRegister
            }
    }
    return state;
}