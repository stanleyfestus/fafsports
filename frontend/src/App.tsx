import { useState } from 'react'
import { Container } from '@chakra-ui/react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import UserComponent from './components/UserComponent/UserComponent'
import Login from './components/Login/Login'
import Admin from './components/Admin/Admin'
import { useMutation } from '@tanstack/react-query';
import Layout from './components/Layout/Layout'
import { RootState } from '../store/store'
import { setEmail, setPassword } from './components/Login/loginSlice';
import { resetUser } from './components/UserComponent/userSlice';


function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [data, setData] = useState<null | {email: string, token: string, id: string}>(null);
  const localUser = useSelector((state: RootState) => state.localUser.user);

  const loginMutation = useMutation({
  mutationFn: async ({ email, password }: { email: string; password: string }) => {
    const response = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error('No user found');
    return response.json();
  }
  })

  const handleLogin = (email: string, password: string) => {

    loginMutation.mutate({ email, password }, {
      onSuccess: (data) => {
        setData(data);
        if (data.id.startsWith('admin')) {
          navigate('/admin');
        } else {
          navigate('/user');
        }
      },
      onError: () => {
        alert('Invalid email or password');
      },
    });

  }

  const handleLogout = () => {
    dispatch(setEmail(''))
    dispatch(setPassword(''))
    setData(null)
    dispatch(resetUser())
    navigate('/login')
  }
  return (
      <Container minW="100vw" p={0}>
        <Routes>
          <Route
            path="/"
            element={!data &&  <Navigate to="/login" />}
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
            element={<Layout user={localUser} logOut={handleLogout}/>}
          >
            <Route
              path="user"
              element={
                data ? <UserComponent data={data} user={localUser}/> : <Navigate to="/login" />
              }
            />
            <Route
              path="admin"
              element={
                data && data.id.startsWith('admin') ? (
                  <Admin data={data} />
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