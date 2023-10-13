import { Link, Outlet } from 'react-router-dom'
import './App.css'

function App() {
  

  return (
    <>
     
      <h1>Vite + React</h1>
      <Link  to="/">Home</Link> 
      <Link to="/users">Users</Link>
      <Outlet />
     
    </>
  )
}

export default App
