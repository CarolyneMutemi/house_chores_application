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
      <Route path='/services/:serviceId' element={<SpecificService />} />
      <Route path='/reviews/:providerId' element={<Reviews />} />
      <Route path='/rates/:providerId' element={<Rates />} />
      <Route path='/mychores' element={<MyChores />} />
    </Routes>
  </Router>
  </>
  )
}

export default App
