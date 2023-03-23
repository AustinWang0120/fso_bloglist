import { useState } from "react"

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
        <input type={"text"} value={username} onChange={({target}) => {setUsername(target.value)}} />
      </div>
      <div>
        password
        <input type={"password"} value={password} onChange={({target}) => {setPassword(target.value)}} />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default Login
