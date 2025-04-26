import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import LandingPage from './Pages/LandingPage'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import Home from './Pages/Home'
import { Toaster } from 'sonner'
import UserLogoutAuth from './Utils/AuthChecking/UserLogoutAuth'
import UserLogingAuth from './Utils/AuthChecking/UserLoginAuth'
import ChattingPage from './Pages/ChattingPage'
import { AppStateContextProvider } from './Utils/Context/AppStateContext'

function App() {
 

  return (
    <>
      <Toaster richColors position="top-right" duration={2000} />
      <AppStateContextProvider>
        <Router>
          <Routes>
            <Route element={<UserLogoutAuth/>}>
              <Route path='/'element={<LandingPage/>} />
              <Route path='/signup' element={<SignUp/>}/>
              <Route path='/login' element={<Login/>}/>
            </Route>
            
            <Route element={<UserLogingAuth/>} >
              <Route path='/home' element={<Home/>}/>
              <Route path='/chat' element={<ChattingPage/>}/>
            </Route>
            
          </Routes>
        </Router>
      </AppStateContextProvider>
    </>
  )
}

export default App
