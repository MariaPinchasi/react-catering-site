import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AppProvider } from './context/context.jsx'

import './style/utilities.css'
import './style/app.css'
import './style/mobile.css'
import { MenuProvider } from './context/menuContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MenuProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </MenuProvider>
  </React.StrictMode>,
)
