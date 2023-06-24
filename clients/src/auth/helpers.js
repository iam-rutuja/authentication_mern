import cookie from 'js-cookie'
//set in cookie
export const setCookie = (key ,value) =>{
    if( window !== 'undefined'){
       cookie.set(key ,value ,{
        expires :1
       })
    }
}
//remove from cookie
export const removeCookie =(key)=>{
    if(window!== 'undefined'){
        cookie.remove(key ,{
            expires:1 
        })
    }
}

//get fron cookie such as stored token
// we can easily grab the token from the cookie and send to our back
//will be useful when we need to make req to server with token

export const getCookie = (key ) =>{
    if( window !== 'undefined'){
      return cookie.get(key)
    }
}
//set in localstorage
export const setLocalStorage =(key,value) =>{
    if(window !== 'undefined'){
     localStorage.setItem(key ,JSON.stringify(value))
    }
}

// remove from localstroage
export const removeLocalStorage=(key)=>{
       if(window !== 'undefined'){
        localStorage.removeItem(key)
       }
}

//auth user by passing data to cookie and localstorage during  signin
export const authenticate = (response, next) => {
    console.log('AUTHENTICATE HELPER ON SIGNIN RESPONSE', response);
    setCookie('token', response.data.token);
    setLocalStorage('user', response.data.user);
    next();
};
// access user info from localstorage
export const isAuth = () => {
    if(window !== 'undefined'){
    
        let cookieChecked = getCookie('token');
        if(cookieChecked){
            if(localStorage.getItem('user')){
                return JSON.parse(localStorage.getItem('user'))
            }
            else{
                // console.log("error in Auth")
                return false
            }
        }
    }
}
export const signout = next =>{
     removeCookie('token')
     removeLocalStorage('user')
     next()
}
export const updateUser =(res,next)=>{
    console.log("UPDATE USER IN LOCALSTORAGE HELPERS",res)
    if( window !== 'undefined'){
        let auth = JSON.parse(localStorage.getItem('user'))
        auth = res.data
        localStorage.setItem('user',JSON.stringify(auth))
    }
    next()
}