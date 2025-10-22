import './App.css'
import { Nav } from './components/Navbar'
import { Landing } from './components/First-Sight'
import { Second } from './components/Second-Sight'
import { Contact } from './components/Contact'

function App() {


  return (
    <div className='app'>
      <Nav/>

      <Landing/>
      <Second/>
      <Contact/>

      <>
      <p>&copy; 2025 Maxwell Alvord. All rights reserved.</p>
      </>
    </div>
  )
}

export default App
