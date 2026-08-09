import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './configs/Routes'
import Navbar from './components/Navbar'
import { BrowserRouter } from 'react-router'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import Footer from "./components/Footer.jsx";
import {store} from './store/store'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <Toaster position='top-center'/>
      <Navbar />
      <AppRoutes />
      <Footer />
    </BrowserRouter>
  </Provider>
)
