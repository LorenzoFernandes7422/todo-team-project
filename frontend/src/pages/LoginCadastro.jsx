import { useState } from 'react'
import {
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap'
import './LoginCadastro.css'
import { Navigate, useNavigate } from 'react-router-dom'
import { login, cadastro } from '../services/authService'

function LoginCadastro() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  
  if (token) {
    return <Navigate to="/dashboard" replace />
  }
  
  const [modo, setModo] = useState('login')

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const [nome, setNome] = useState('')
  const [emailCadastro, setEmailCadastro] = useState('')
  const [senhaCadastro, setSenhaCadastro] = useState('')

  const [loadingLogin, setLoadingLogin] = useState(false)
  const [loadingCadastro, setLoadingCadastro] = useState(false)
  const [erroLogin, setErroLogin] = useState('')
  const [erroCadastro, setErroCadastro] = useState('')

  const handleLogin = async () => {
    setErroLogin('')
    setLoadingLogin(true)
    try {
      const data = await login(email, senha)
      localStorage.setItem('token', data.token)
      navigate('/dashboard')
    } catch (error) {
      setErroLogin(error.message)
    } finally {
      setLoadingLogin(false)
    }
  }

  const handleCadastro = async () => {
    setErroCadastro('')
    setLoadingCadastro(true)
    try {
      const data = await cadastro(nome, emailCadastro, senhaCadastro)
      setNome('')
      setEmailCadastro('')
      setSenhaCadastro('')
      setModo('login')
    } catch (error) {
      setErroCadastro(error.message)
    } finally {
      setLoadingCadastro(false)
    }
  }

  return (
    <div className="login-background">
      <div className="login-card-wrapper">
        <Card className="login-card">
          <CardBody className="login-card-body p-0">
            <div className="auth-slide-container">
              <div
                className="auth-slide-wrapper"
                style={{ transform: modo === 'cadastro' ? 'translateX(-50%)' : 'translateX(0)' }}
              >
                <div className="auth-slide">
                  <Row className="g-0 login-card-row h-100">
                    <Col md="6" className="login-form-side login-form-side--login">
                      <CardBody className="d-flex flex-column h-100">
                        <h1 className="login-project-name">
                          <span className="login-project-name-green">TODO</span>
                          <span className="login-project-name-black"> TEAMS</span>
                        </h1>
                        <div className="login-welcome-section flex-grow-1 d-flex flex-column justify-content-center">
                          <h2 className="fw-bold text-dark text-center mb-2">BOAS VINDAS!</h2>
                          <p className="text-center text-secondary small mb-4">
                            Entre com suas credenciais para acessar sua conta.
                          </p>
                          <Form
                            className="auth-form-minimal"
                            onSubmit={(e) => {
                              e.preventDefault()
                              handleLogin()
                            }}
                          >
                            <FormGroup>
                              <Label for="email">Email</Label>
                              <Input
                                type="email"
                                id="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label for="senha">Senha</Label>
                              <Input
                                type="password"
                                id="senha"
                                placeholder="Senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                              />
                            </FormGroup>
                            {erroLogin && (
                              <div className="text-danger small mb-2" role="alert">
                                {erroLogin}
                              </div>
                            )}
                            <Button
                              color="dark"
                              className="w-100 fw-bold mb-2"
                              type="submit"
                              onClick={handleLogin}
                              disabled={loadingLogin}
                            >
                              {loadingLogin ? 'Entrando...' : 'Login'}
                            </Button>
                          </Form>
                          <button
                            type="button"
                            className="btn btn-link p-0 text-decoration-none w-100 text-center"
                            onClick={() => setModo('cadastro')}
                          >
                            <p className="text-secondary small mb-0 mt-2">
                              Não tem uma conta? <span className="text-primary">Cadastre-se</span>
                            </p>
                          </button>
                        </div>
                      </CardBody>
                    </Col>
                    <Col md="6" className="login-image-side">
                      <div className="login-right-image" />
                    </Col>
                  </Row>
                </div>

                <div className="auth-slide">
                  <Row className="g-0 login-card-row h-100">
                    <Col md="6" className="login-image-side order-md-1">
                      <div className="login-right-image login-right-image--mirror" />
                    </Col>
                    <Col md="6" className="login-form-side login-form-side--cadastro order-md-2">
                      <CardBody className="d-flex flex-column h-100">
                        <div className="login-project-name-wrap login-project-name-wrap--right">
                          <h1 className="login-project-name">
                            <span className="login-project-name-green">TODO</span>
                            <span className="login-project-name-black"> TEAMS</span>
                          </h1>
                        </div>
                        <div className="login-welcome-section flex-grow-1 d-flex flex-column justify-content-center">
                          <h2 className="fw-bold text-dark text-center mb-2">Criar conta</h2>
                          <p className="text-center text-secondary small mb-4">
                            Preencha os dados abaixo para se cadastrar.
                          </p>
                          <Form
                            className="auth-form-minimal"
                            onSubmit={(e) => {
                              e.preventDefault()
                              handleCadastro()
                            }}
                          >
                            <FormGroup>
                              <Label for="nome">Nome</Label>
                              <Input
                                type="text"
                                id="nome"
                                placeholder="Nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label for="emailCadastro">Email</Label>
                              <Input
                                type="email"
                                id="emailCadastro"
                                placeholder="Email"
                                value={emailCadastro}
                                onChange={(e) => setEmailCadastro(e.target.value)}
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label for="senhaCadastro">Senha</Label>
                              <Input
                                type="password"
                                id="senhaCadastro"
                                placeholder="Senha"
                                value={senhaCadastro}
                                onChange={(e) => setSenhaCadastro(e.target.value)}
                              />
                            </FormGroup>
                            {erroCadastro && (
                              <div className="text-danger small mb-2" role="alert">
                                {erroCadastro}
                              </div>
                            )}
                            <Button color="dark"
                              className="w-100 fw-bold mb-2" 
                              type="submit"
                              onClick={handleCadastro}
                              disabled={loadingCadastro}
                            >
                              {loadingCadastro ? 'Cadastrando...' : 'Cadastrar'}
                            </Button>
                          </Form>
                          <button
                            type="button"
                            className="btn btn-link p-0 text-decoration-none w-100 text-center"
                            onClick={() => setModo('login')}
                          >
                            <p className="text-secondary small mb-0 mt-2">
                              Já tem conta? <span className="text-primary">Faça login</span>
                            </p>
                          </button>
                        </div>
                      </CardBody>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default LoginCadastro
