import { useState } from "react"
import PropTypes from "prop-types"

const Login = ({ login }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (event) => {
    event.preventDefault()
    login({ username, password })
    setUsername("")
    setPassword("")
  }
  
  return (
    <form onSubmit={handleLogin}>
      <h1>Log in to application</h1>
      <div>
        username
        <input id="username" type={"text"} value={username} onChange={({ target }) => {setUsername(target.value)}} />
      </div>
      <div>
        password
        <input id="password" type={"password"} value={password} onChange={({ target }) => {setPassword(target.value)}} />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired
}

export default Login
