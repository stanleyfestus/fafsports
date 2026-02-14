import { Box } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import { User } from '../../types'

interface LayoutProps {
  user: User | null
  logOut: () => void
}

const Layout: React.FC<LayoutProps> = ({ user, logOut }) => {
  return (
    <Box minH={"100vh"} bg="gray.50">
      <Header user={user} onLogout={logOut} />
      <Box p={4}>
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout