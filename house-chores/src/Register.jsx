import bookMinion from './assets/signup_minion.png';
import closeIcon from "./assets/close-circle.svg";
import mailIcon from "./assets/mail.svg"
import closeEye from "./assets/eye-off.svg"
import openEye from "./assets/eye.svg"
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useState } from 'react';
import { isEmail, config, setCookie } from './usePost';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Register() {
  const navigate = useNavigate()
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)


  async function submit() {
    const data = {first_name, last_name, email, password}

    if (!first_name.length || !last_name.length || !email.length || password.length <= 5 || !isEmail(email)) {
      document.getElementById('signUpButton').addEventListener('click', (e) => e.preventDefault())
      if (!first_name.length) {
        toast('First name is missing')
        document.getElementById('first-name').focus()
      }else if (!last_name.length) {
        toast('Last name is missing.')
        document.getElementById('last-name').focus()
      } else if (!email.length) {
        toast('Email is missing')
        document.getElementById('new-email').focus()
      } else if (!isEmail(email)) {
        toast('Invalid email format.')
        document.getElementById('new-email').focus()
      } else  {
        toast('Set a password longer than 5 characters.')
        document.getElementById('new-password').focus()
      }
    }
    else {
      try {
        
        const res = await fetch('http://localhost:5000/register', {
          method: 'POST',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(data)
          })

        
          if (res.status === 409) {
            toast('User exists, redirecting...')
            setTimeout(() => navigate('/login', {replace: true}), 2000)
            setIsLoading(false)
          } else if (res.status === 403) {
            toast('Email is invalid.')
            document.getElementById('new-email').focus()
            setIsLoading(false)
          } else if (!res.ok) {
            throw Error(`Error with status ${res.status} has occured.`)
          }else {
            const data = await res.json()
            setCookie('session_id', data.session_id, data.expiration_time)
            setIsLoading(false)
            config.logInState = true
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
    let showPassword = document.getElementById('show-password')
    let hidePassword = document.getElementById('hide-password');
    let password = document.getElementById('new-password');
    if (password.type === 'password'){
      password.type = 'text';
      hidePassword.classList.add('hide')
      showPassword.classList.remove('hide')
    } else {
      password.type = 'password'
      hidePassword.classList.remove('hide')
      showPassword.classList.add('hide')
    }
  }

  function close() {
    navigate(-1)
  }
    return (
        <>
        <div className="align-center">
            <div className="register">
                <img src={bookMinion} alt="Minion with a book." className="minion"/>
              <span className="icon-close" onClick={close}><img src={closeIcon} alt="close icon"/></span>
              <form action="#" method="POST">
                <h4 className="Signup-text">You speak Minionese? Pwede na?</h4>
                <input type="text" placeholder="First name" className="firstname" id='first-name' value={first_name.trim()} onChange={(e) => setFirstName(e.target.value)} required /><br/>
                <input type="text" placeholder="Last name" className="lastname" id='last-name' value={last_name.trim()} onChange={(e) => setLastName(e.target.value)} required /><br/>
                <input type="email" placeholder="Email" minLength="5"  className="username" id="new-email" value={email.trim()} onChange={(e) => setEmail(e.target.value)} required/>
                <label htmlFor="new-email"><img src={mailIcon} className="email-icon"/></label><br/>
                <input type="password" placeholder="Password" minLength="5" className="password" id="new-password" value={password.trim()} onChange={(e) => setPassword(e.target.value)} required/>
                <label><img src={closeEye} className="hidden-password" id='hide-password' onClick={togglePassword}/></label>
                <label><img src={openEye} className="clear-password hide" id='show-password' onClick={togglePassword}/></label><br/>
                <p className="back-to-login"><Link to='/login' replace >Have an account?</Link></p><br/>
              </form>
              <button className="log-in-button" onClick={submit} id='signUpButton'>Sign up</button>
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