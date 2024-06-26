import Cookies from 'js-cookie';

export const config = {
    logInState: false
}

export function setCookie(cookieName, cookieValue, expireTime) {
    const days = expireTime / 86400
    Cookies.set(cookieName, cookieValue, { expires: days, path: '/' });
}

export async function getUser (url) {
    try {
    const response = await fetch(url)
    const user = await response.json()
    return user
    } catch (error) {
        return null
    }
}

export async function verifyLoginState(session_id) {
    const loginName = document.getElementById('logged-in-name')
    const loginButtons = document.getElementById('logged-in-rest')
    const logout = document.getElementById('not-logged-in')

    if (session_id) {
        loginName.classList.remove('hide')
        loginButtons.classList.remove('hide')
        logout.classList.add('hide')
    
        const user = await getUser(`http://localhost:5000/user/${session_id}`)
        return user
      } else {
        loginName.classList.add('hide')
        loginButtons.classList.add('hide')
        logout.classList.remove('hide')
        return null
    }
}


export async function logout(session_id) {
    Cookies.remove('session_id')
    try{
        const response = await fetch(`http://localhost:5000/logout/${session_id}`)
        if (!response.ok) {
            throw Error(response.status)
        }
    } catch(error) {
        console.log(error)
    } finally{
        return null
    }
}

export async function getMyChores() {
    const session_id = Cookies.get('session_id')
    try {
        const response = await fetch(`http://localhost:5000/my_chores/${session_id}`)
        if (!response.ok) {
            throw Error(response.status)
        } else {
            const data = response.json()
            return data
        }
    } catch(error) {
        console.log(error)
        return []
    }
}


export function isEmail(emailAdress){
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  
  if (emailAdress.match(regex)) 
    return true; 
  
   else 
    return false; 
  }
