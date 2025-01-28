import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { MainProvider } from './Controller/MainProvider.jsx'
import { Bounce, ToastContainer } from 'react-toastify'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MainProvider>
    <ToastContainer position="top-left"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce} />
  </StrictMode>,
)
