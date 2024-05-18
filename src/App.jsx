import { useState } from 'react'
import reactLogo from './assets/images/react.svg'

import styles from './App.module.css'
import Navbar from './components/Navbar/Navbar'

function App() {

  return (
    <div className={styles.App}>
      <Navbar />
    </div>
  )
}

export default App
