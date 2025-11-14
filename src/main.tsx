import ReactDOM from 'react-dom/client'
import { BrowserRouter, useRoutes } from 'react-router-dom'
import routes from 'virtual:generated-pages-react'
import './index.css'
import { Header } from './layout/Header'
import { Footer } from './layout/Footer'
import { Breadcrumbs } from './components/Breadcrumbs'
import { WhatsAppButton } from './components/WhatsAppButton'

function App() {
  return useRoutes(routes)
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Header />
    <Breadcrumbs />
    <App />
    <Footer />
    <WhatsAppButton />
  </BrowserRouter>
)
