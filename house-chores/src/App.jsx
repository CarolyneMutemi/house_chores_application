import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./Header"
import Home from "./home"
import SignIn from "./SignIn"
import Register from "./Register"
import Services from "./services"
import SpecificService from "./specific-service"
import Reviews from "./reviews"
import Rates from "./rates"
import MyChores from "./my-chores"
import Contact from './contact';

function App() {  
  return (
  <>
  <Router>
    <Header/>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<SignIn />} />
      <Route path='/register' element={<Register/>} />
      <Route path='/services' element={<Services/>} />
      <Route path='/providers/:serviceId' element={<SpecificService />} />
      <Route path='/reviews/:providerId' element={<Reviews />} />
      <Route path='/rates/:providerId' element={<Rates />} />
      <Route path='/contact/:providerId' element={<Contact />} />
      <Route path='/mychores' element={<MyChores />} />
    </Routes>
  </Router>
  </>
  )
}

export default App
