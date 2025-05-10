import { useState } from 'react'
import { Container } from '@chakra-ui/react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import UserComponent from './components/UserComponent/UserComponent'
import Login from './components/Login/Login'
import Admin from './components/Admin/Admin'
import { users } from '../data/profiles'
import Layout from './components/Layout/Layout'
import { User } from './types'

function App() {
  const [user, setUser] = useState<User| null>(null)
  const [adminUser, setAdminUser] = useState<User[]>([])
  const navigate = useNavigate()

  const handleLogin = (email: string, password: string) => {
    const foundUser = users.find(
      (u) => u.email === email.trim() && u.password === password.trim()
    )

    if (foundUser) {
      setUser(foundUser as User)
      if (foundUser.isAdmin) {
        setAdminUser(users as User[])
        navigate('/admin')
      } else {
        setUser(foundUser as User)
        navigate('/user')
      }
    } else {
      alert('Invalid email or password')
    }
  }

  const handleLogout = () => {
    setUser(null)
    navigate('/login')
  }
  return (
      <Container minW="100vw" p={0}>
        <Routes>
          <Route
            path="/"
            element={!user &&  <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={
              <Login
                onLogin={handleLogin}
              />
            }
          />
          <Route
            path="/"
            element={<Layout user={user} logOut={handleLogout}/>}
          >
            <Route
              path="user"
              element={
                user ? <UserComponent user={user} /> : <Navigate to="/login" />
              }
            />
            <Route
              path="admin"
              element={
                user && user.isAdmin ? (
                  <Admin users={adminUser} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Route>  
        </Routes>
      </Container>
  )
}

export default App