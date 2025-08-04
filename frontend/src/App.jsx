import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Body from './components/Body'
import Login from './components/Login'
import Profile from './components/Profile'
import { Provider } from 'react-redux'
import AppStore from './store/AppStore'

const App = () => {
  return (
    <>
      <Provider store={AppStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body></Body>}>
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App