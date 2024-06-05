import mainMinion from './assets/main_minion.png'
import helloMinion from './assets/hello.png'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { logout, verifyLoginState } from './usePost';
import { useEffect, useState } from 'react';

function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const path = location.pathname

  console.log('------------->>>',path)
  function home() {
    navigate('/')
  }
  const session_id = Cookies.get('session_id')
  console.log('Cookies', Cookies.get('session_id'))
  const [user, setUser] = useState(null)

  const fetchUser = async () => {
    const user = await verifyLoginState(session_id);
    setUser(user);
  };

  useEffect(() => {
    const serviceOut = document.getElementById('services-out')
    const serviceIn = document.getElementById('services-in')
    if (path === '/') {
      serviceOut.classList.add('hide')
      serviceIn.classList.add('hide')
    }else {
      serviceOut.classList.remove('hide')
      serviceIn.classList.remove('hide')
    }
  })

  useEffect( () => {
    fetchUser()
  }, [session_id])

  function logOutUser (session_id) {
    setUser(null)
    logout(session_id)
  }

    return (
        <>
            <header>
                <div className="main-title" onClick={home}>
                  <img src={mainMinion} alt="minion dancing" className="main-icon"/>
                  <h1>PUMZIKA</h1>
                </div>
                <div className="not-logged-in" id='not-logged-in'>
                    <Link to="/services" id='services-out'>Services</Link>
                    <Link to="/login" >Log in</Link>
                    <Link to="/register">Sign up</Link>
                </div>
                <div className="logged-in-user hide" id='logged-in-name'>
                  {user && <h3>Hello {user.first_name} {user.last_name}</h3>}
                  <img src={helloMinion} alt="minion saying hello" className="hello-icon"/>
                </div>
                <div className="logged-in hide" id='logged-in-rest'>
                  <Link to="/services" id='services-in'>Services</Link>
                  <Link to="/mychores" reloadDocument>My chores</Link>
                  <Link to="/" onClick={() => logOutUser(session_id)} reloadDocument>Log out</Link>
                </div>
            </header>
        </>
    )

}

export default Header;
