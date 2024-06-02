import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Protected from './pages/Protected'
import Pagelayout from './layouts/Pagelayout'
import { ROUTE_PATHS } from './constants'
import AboutPageContainer from './pages/about/AboutPageContainer'
import PageNotFound from './pages/pagenotfound/PageNotFound'
import ForLoggedInUsers from './protectedRoutes/ForLoggedInUsers'
import LoginPageContainer from './pages/login/LoginContainer'
import SignupPageContainer from './pages/signup/SignupPageContainer'
import MyAccountPageContainer from './pages/myaccount/MyAccountPageContainer.jsx'
import ProfilePageContainer from './pages/profile/ProfilePageContainer.jsx'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Pagelayout />}> 
          {/* Unsecured Routes */}
          <Route index element={<Home/>} />
          <Route path={ROUTE_PATHS.login} element={<LoginPageContainer />} />
          <Route path={ROUTE_PATHS.about} element={<AboutPageContainer />} />
          <Route path={ROUTE_PATHS.signup} element={<SignupPageContainer />} />
          <Route path={ROUTE_PATHS.pageNotFound} element={<PageNotFound />} />
          <Route path={ROUTE_PATHS.profile} element={<ProfilePageContainer />} />
          <Route path="*" element={<PageNotFound />} />

          {/* Secured Routes */}
          <Route element={<ForLoggedInUsers />}>
            <Route path={ROUTE_PATHS.protected} element={<Protected />} />
            <Route path={ROUTE_PATHS.myAccount} element={<MyAccountPageContainer />} />
          </Route>

        </Route>
      </Routes>
    </div>
  )
}

export default App
