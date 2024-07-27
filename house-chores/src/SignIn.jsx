import closeIcon from './assets/close-circle.svg'
import mailIcon from "./assets/mail.svg"
import closeEye from "./assets/eye-off.svg"
import openEye from "./assets/eye.svg"
import happy from "./assets/minion_icon.png"
import { Link, useNavigate } from 'react-router-dom'
import { isEmail, setCookie } from './usePost'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'


export default function SignIn() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  async function submit() {
    const data = { email, password }

    if (!email.length || password.length <= 5 || !isEmail(email)) {
      document.getElementById('login-button').addEventListener('click', (e) => e.preventDefault())
      if (!email.length) {
        toast('Email is missing')
        document.getElementById('email').focus()
      } else if (!isEmail(email)) {
        toast('Invalid email format.')
        document.getElementById('email').focus()
      } else  {
        toast('Password is longer than 5 characters.')
        document.getElementById('password').focus()
      }
    }
    else {
      try {
        
        const res = await fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(data)
          })

        
          if (res.status === 404) {
            toast('User not found, redirecting...')
            setTimeout(() => navigate('/register', {replace: true}), 2000)
            setIsLoading(false)
          } else if (res.status === 403) {
            toast('Wrong password, try again.')
            document.getElementById('password').focus()
            setIsLoading(false)
          } else if (!res.ok) {
            throw Error(`Error with status ${res.status} has occured.`)
          }else {
            const data = await res.json()
            setCookie('session_id', data.session_id, data.expiration_time)
            setIsLoading(false)
            navigate(-1, {replace: true})
          }
      } catch(error) {
        toast(error.message)
        console.log(error)
        setIsLoading(false)
      }
    }
    }

  function togglePassword() {
    let showPassword = document.getElementById('login-show')
    let hidePassword = document.getElementById('login-hide');
    let password = document.getElementById('password');
    if (password.type === 'password'){
      password.type = 'text';
      hidePassword.classList.remove('hide')
      showPassword.classList.add('hide')
    } else {
      password.type = 'password'
      hidePassword.classList.add('hide')
      showPassword.classList.remove('hide')
    }
  }

  function close() {
    navigate(-1)
  }

    return (
        <>
        <div className="align-center">
            <div className="log-in">
              <img src={happy} alt="Happy minion." className="minion"/>
              <span className="icon-close" onClick={close}><img src={closeIcon} alt="close icon" /></span>
              <form action="#" method="POST">
                <h4 className="welcome-back-text">Welcome back :)</h4>
                <input type="email" placeholder="Email" minLength="5"  className="username" id="email" value={email.trim()} onChange={(e) => setEmail(e.target.value)} required/>
                <label htmlFor="email"><img src={mailIcon} className="email-icon"/></label><br/>
                <input type="password" placeholder="Password" minLength="5" className="password" id="password" value={password.trim()} onChange={(e) => setPassword(e.target.value)} required/>
                <label><img src={closeEye} className="hidden-password hide" id='login-show' onClick={togglePassword}/></label>
                <label><img src={openEye} className="clear-password" id='login-hide' onClick={togglePassword}/></label><br/>
                <div className="user-options">
                  <Link to='/register' replace >Don't have an account?</Link>
                  <a href="#">Forgot password?</a>
                </div>
              </form>
              <button className="log-in-button" id='login-button' onClick={submit}>Log in</button>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
              />
            </div>
        </>
    )
}
