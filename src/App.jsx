import { AuthProvider } from './context/AuthContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { UserProvider } from './context/UserContext.jsx'
import AppRoutes from './routes/AppRoutes.jsx'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <UserProvider>
          <AppRoutes />
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
