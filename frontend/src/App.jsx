import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginCadastro from './pages/LoginCadastro'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginCadastro />} />
      </Routes>
    </Router>
  )
}

export default App
