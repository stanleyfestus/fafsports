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
  Link,
} from '@chakra-ui/react'


interface LoginProps {
  onLogin: (email: string, password: string) => Promise<void>
  isLoading?: boolean
}

const Login: React.FC<LoginProps> = ({ onLogin, isLoading }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!email || !password) {
      setError('Please enter both email and password.')
      return
    }
    setError('')
    try {
      await onLogin(email, password)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Invalid email or password')
      setEmail('')
      setPassword('')
    }
  }


  return (
    <Box p={6} maxW="500px" mx="auto" borderWidth="1px" borderRadius="md" boxShadow="lg" position="relative" top={6}>
      <Heading mb={6} textAlign="center">
        Login
      </Heading>
      <VStack spacing={4}>
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} style={{width: "100%"}}>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </FormControl>
          <Button 
            colorScheme="blue" 
            width="full" 
            onClick={handleSubmit} 
            type='submit'
            position="relative"
            top={4}
            isLoading={isLoading}>
          Login
          </Button>
        </form>
        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}
      </VStack>
      <br></br>
      <Box mt={4} textAlign="center" fontSize="sm" color="gray.500">
        Don't have an account? <Link href="/register" >Register</Link>.
      </Box>
    </Box>
  )
}

export default Login