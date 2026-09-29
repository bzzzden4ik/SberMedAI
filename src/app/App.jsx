import AppRouter from './router/app-router.jsx'
import { SessionProvider } from '@/entities/session'
import './styles/App.css'


function App() {
  return (
    <SessionProvider>
      <AppRouter />
    </SessionProvider>
  )
}

export default App
