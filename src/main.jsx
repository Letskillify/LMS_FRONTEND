import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { MainProvider } from './Controller/MainProvider.jsx'
import { Bounce, ToastContainer } from 'react-toastify'
import { Provider } from "react-redux";
import { store } from './Redux/Store.jsx'
import ReduxMainProvider from './Controller/MainProviderRedux.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ReduxMainProvider>
        <MainProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </MainProvider>
      </ReduxMainProvider>
    </Provider>
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
