import { useNavigate } from 'react-router-dom'
import { Button } from 'reactstrap'
import { logout } from '../services/authService'

function Dashboard() {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Você está logado!</p>
      <Button color="secondary" outline onClick={handleLogout}>
        Sair
      </Button>
    </div>
  )
}

export default Dashboard