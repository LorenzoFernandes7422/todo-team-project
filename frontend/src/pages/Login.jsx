import { useState } from 'react'
import { getTest } from '../services/authService'
import './Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const handleTestarApi = async () => {
    try {
      const data = await getTest()
      alert(JSON.stringify(data))
    } catch (error) {
      alert('Erro: ' + error.message)
    }
  }

  return (
    <div className="login-background">
      <div className="login-card">
        <div className="login-form-side">
          <h1 className="login-project-name">
            <span className="login-project-name-green">TODO</span>
            <span className="login-project-name-black"> TEAMS</span>
          </h1>

          <div className="login-welcome-section">
            <h2 className="login-welcome-title">BOAS VINDAS!</h2>
            <p className="login-welcome-text">
              Entre com suas credenciais para acessar sua conta.
            </p>

            <div className="login-form">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-input"
              />
              <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="login-input"
              />
              <button onClick={handleTestarApi} className="login-button">
                Testar API
              </button>
            </div>
          </div>
        </div>
        <div className="login-image-side login-right-image">
        </div>
      </div>
    </div>
  )
}

export default Login