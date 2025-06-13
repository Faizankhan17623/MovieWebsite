import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import rootReduers from './reducer/index.js'
import { Provider } from 'react-redux'


const store = configureStore({
  reducer: rootReduers
})


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <App/>
      <Toaster position="top-right" reverseOrder={true}/>
    </BrowserRouter>
    </Provider>
  </StrictMode>,
)
