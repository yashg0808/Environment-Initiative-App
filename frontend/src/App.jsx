import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/login/Login'
import Protected from './pages/Protected'
import Pagelayout from './layouts/Pagelayout'
import { ROUTE_PATHS } from './constants'
import AboutPageContainer from './pages/about/AboutPageContainer'
import Signup from './pages/signup/SignupPageContainer'
import PageNotFound from './pages/pagenotfound/PageNotFound'
import ForLoggedInUsers from './protectedRoutes/ForLoggedInUsers'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Pagelayout />}> 
          {/* Unsecured Routes */}
          <Route index element={<Home />} />
          <Route path={ROUTE_PATHS.login} element={<Login />} />
          <Route path={ROUTE_PATHS.about} element={<AboutPageContainer />} />
          <Route path={ROUTE_PATHS.signup} element={<Signup />} />
          <Route path={ROUTE_PATHS.pageNotFound} element={<PageNotFound />} />
          <Route path="*" element={<PageNotFound />} />

          {/* Secured Routes */}
          <Route element={<ForLoggedInUsers />}>
            <Route path="protected" element={<Protected />} />
          </Route>

        </Route>
      </Routes>
    </div>
  )
}

export default App
