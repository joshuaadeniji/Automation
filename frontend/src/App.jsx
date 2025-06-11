import Login from './pages/Login'
import Register from './pages/Register'
import Navigation from './components/Navigation'
import Sidebar from './components/Sidebar'
import Aside from './components/Aside'
import Home from './pages/Home'
import Notes from './pages/Notes'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import NotFound from './pages/NotFound'

function App() {

  // const { logout, isAuthenticated } = utilities()

  return (
    <div className="super-container">
      <Router>
        <div className="navigation-container">
          <Navigation />
        </div>
        <div className="main-container">
          <div className="sidebar-container">
            <Sidebar />
          </div>
          <div className="pages-container">
            <Routes>
                <Route path='/login' element={ <Login /> }></Route>
                <Route path='/register' element={ <Register /> }></Route>
                <Route path='/' element={ <Home /> }></Route>
                <Route path='/notes' element={ <Notes /> }></Route>
                <Route path='/*' element={ <NotFound /> }></Route>
            </Routes>
          </div>
          <div className="aside-container">
            <Aside />
          </div>
        </div>
      </Router>
    </div>
  )
}

export default App
