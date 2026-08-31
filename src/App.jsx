import './App.css'
import { Navbar } from './components/Nav'
import { Landing } from './components/First-Sight'
import { Second } from './components/Second-Sight'
import { Contact } from './components/Contact'
import { useEffect, useState } from 'react'

function App() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, []);

  return (
    <div className={`app ${isLoaded ? "loaded" : ""}`}>
      <div className="grain" aria-hidden="true"></div>
      <Navbar/>

      <Landing/>
      <Second/>
      <Contact/>

      <p className="site-footer">&copy; 2026 Maxwell Alvord. All rights reserved.</p>
    </div>
  )
}

export default App;

