import { Box } from '@chakra-ui/react'
import Header from '../Header/Header'
import UserComponent from '../UserComponent/UserComponent'
import Admin from '../Admin/Admin'
import { User } from '../../types'

interface MainViewProps {
  user: User
  admin?: boolean
  adminUser: User[]
  logout: () => void
}

const MainView: React.FC<MainViewProps> = ({ user, logout, admin, adminUser }) => {
  return (
    <Box>
      <Header user={user} onLogout={logout}/>
      <Box p={4} bg="gray.50" minHeight="100vh">
       { admin ? <Admin users={adminUser}/> : <UserComponent user={user} />}
      </Box>
    </Box>
  )
}

export default MainView