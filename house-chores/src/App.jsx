import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./Header"
import Home from "./home"
import Login from "./log-in"
import SignIn from "./SignIn"
import Register from "./Register"
import Services from "./services"
import SpecificService from "./specific-service"
import Reviews from "./reviews"
import Rates from "./rates"
import MyChores from "./my-chores"

function App() {
  return (
  <>
  <Router>
  <Header/>
    <Routes>
      <Route path='/' Component={Home} />
      <Route path='/login' Component={SignIn} />
      <Route path='/register' Component={Register} />
      <Route path='/services' Component={Services} />
      <Route path='*' element={<p>Oops!</p>} />
    </Routes>
      <SpecificService />
      <Reviews />
      <Rates />
      <MyChores />
  </Router>
  </>
  )
}

export default App
