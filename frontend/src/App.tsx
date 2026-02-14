import { Container } from '@chakra-ui/react'
import { Routes, Route, Navigate, useNavigate, Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import UserComponent from './components/UserComponent/UserComponent'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import EditUser from './components/EditUser/EditUser';
import { useMutation } from '@tanstack/react-query';
import Layout from './components/Layout/Layout'
import { RootState } from '../store/store'
import { resetUser, setUser  } from './components/UserComponent/userSlice';

interface RegisterResponse {
  id: string;
  email: string;
  name: string;
  role: 'PLAYER' | 'admin';
  message?: string;
}


function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  //const [data, setData] = useState<null | {email: string, id: string, name: string}>(null);
  const localUser = useSelector((state: RootState) => state.localUser.user);

  const ProtectedRoute = ({ adminOnly = false }: { adminOnly?: boolean }) => {
    const localUser = useSelector((state: RootState) => state.localUser.user);

    if (!localUser) return <Navigate to="/" replace />;
    if (adminOnly && !localUser.id?.startsWith('admin')) return <Navigate to="/" replace />;

    return <Outlet />;
  };
  //const javaBackendAPI = 'http://localhost:8080/api/auth/login'
  const loginApi = 'http://localhost:3000/player/login'
  const registerApi = 'http://localhost:3000/player/register'

  const registerMutation = useMutation<RegisterResponse, Error, { name: string; email: string; password: string, role: 'PLAYER' | 'admin' }>({
    mutationFn: async ({ name, email, password, role} : { name: string; email: string; password: string, role: 'PLAYER' | 'admin' }) => {
      const response = await fetch(`${registerApi}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }, 
        body: JSON.stringify({name, email, password, role}),
      });
      let res: RegisterResponse = {
        id: '',
        email: '',
        name: '',
        role: 'PLAYER'
      };
      try {
        res = await response.json()
      } catch {
        res = {
          id: '',
          email: '',
          name: '',
          role: 'PLAYER'
        };
      }

      if (!response.ok) {
        const message = res?.message || `Registration failed with status ${response.status}`;
        throw new Error(message);
      }

      if (!res.id || !res.email || !res.name || !res.role) {
        throw new Error('Registration failed: Invalid server response');
      }
      return res; 
    },
    onSuccess: (result) => {
      const userData: RegisterResponse= {
        id: result.id!,
        email: result.email || '',
        name: result.name || '',
        role: result.role || 'PLAYER',
      };
      console.log('Registration successful:', userData);
      dispatch(setUser(userData));
    }
  })

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const response = await fetch(`${loginApi}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const errorMessage = 'Invalid email or/and password. Do you have an account?';
        throw new Error(errorMessage);
      }
      const res = await response.json(); 
      return res;
    }
  })

  const handleLogin = async (email: string, password: string) => {
    try {
      const data = await loginMutation.mutateAsync({ email, password });
      if(data.id === undefined){
        throw new Error('Login failed: Invalid response from server');
      }
      dispatch(setUser(data));
      navigate(data.role === 'PLAYER' ? '/user' : '/admin');
    } catch (error: unknown) {
      console.log('Login error:', error instanceof Error ? error.message : 'Unknown error');
      throw error;
    }
  };

  const handleOnRegister = async (name: string, email: string, password: string, role: 'PLAYER' | 'admin' = 'PLAYER') => {
    try {
      const result = await registerMutation.mutateAsync({ name, email, password, role });
      console.log('Registration successful:', result);
      navigate(result.role === 'PLAYER' ? '/user' : '/admin');
    } catch (error) {
      console.log('Navigation to register error:', error);
      navigate('/register');
      throw error;
    }
  }

  const handleLogout = () => {
    navigate('/')
    dispatch(resetUser())
  }
  return (
    <Container minW="100vw" p={0}>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onRegister={handleOnRegister} errorMess={registerMutation.error?.message || ''} />} />
        {/* All protected routes */}
        <Route element={<ProtectedRoute />}>
          {localUser?.id && <Route element={<Layout logOut={handleLogout} user={localUser}/>}>
            <Route path="user" element={<UserComponent user={localUser || {}} editLink="/user/edit" />} />
            <Route path="user/edit" element={<EditUser user={localUser || {}}  />} />
          </Route>}
        </Route>

        {/* Admin-only route */}
        <Route element={<ProtectedRoute adminOnly />}>
          <Route path="admin" element={<div>Admin Panel</div>} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Container>
  )
}

export default App