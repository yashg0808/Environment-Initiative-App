import './App.css'
import { Route, Routes } from 'react-router-dom'
import React from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Protected from './pages/Protected'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/protected' element={<Protected />} />
        </Routes> 
      </div>
    )
  }
}

export default App
