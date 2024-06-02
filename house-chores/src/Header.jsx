import mainMinion from './assets/main_minion.png'
import helloMinion from './assets/hello.png'
import { Link, useLocation, useNavigate } from 'react-router-dom';
function Header() {
  const location = useLocation()
  const navigate = useNavigate()

  function home() {
    navigate('/')
  }
    return (
        <>
            <header>
                <div className="main-title" onClick={home}>
                  <img src={mainMinion} alt="minion dancing" className="main-icon"/>
                  <h1>PUMZIKA</h1>
                </div>
                <div className="not-logged-in">
                    <Link to="/services" className={location.pathname === '/' ? 'hide' : ''}>Services</Link>
                    <Link to="/login">Log in</Link>
                    <Link to="/register">Sign up</Link>
                </div>
                <div className="logged-in-user hide">
                  <h3>Hello Sharon Muthoni</h3>
                  <img src={helloMinion} alt="minion saying hello" className="hello-icon"/>
                </div>
                <div className="logged-in hide">
                  <Link to="/services" className={location.pathname === '/' ? 'hide' : ''}>Services</Link>
                  <Link to="/mychores">My chores</Link>
                  <Link to="/">Log out</Link>
                </div>
            </header>
        </>
    )

}

export default Header;
