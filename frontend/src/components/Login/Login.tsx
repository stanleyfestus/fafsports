import { useState } from 'react'
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Heading,
  VStack,
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../store/store'
import { setEmail, setPassword } from './loginSlice'

interface LoginProps {
  onLogin: (email: string, password: string, isAdmin: boolean) => void
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [error, setError] = useState('')
  const email = useSelector((state: RootState) => state.loginForm?.email || '');
  const password = useSelector((state: RootState) => state.loginForm?.password || '');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (!email || !password) {
      setError('Please enter both email and password.')
      return
    }
    setError('')
    onLogin(email, password, false)
  }

  return (
    <Box p={6} maxW="400px" mx="auto" borderWidth="1px" borderRadius="md" boxShadow="lg">
      <Heading mb={6} textAlign="center">
        Login
      </Heading>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
            placeholder="Enter your email"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
            placeholder="Enter your password"
          />
        </FormControl>
        <Button colorScheme="blue" width="full" onClick={handleSubmit}>
          Login
        </Button>
        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}
      </VStack>
    </Box>
  )
}

export default Login