import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { DarkModeContextProvider } from './context'

import './index.css'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <Router>
        <App />
      </Router>
    </DarkModeContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
