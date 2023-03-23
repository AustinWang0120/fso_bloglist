import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const userJSON = window.localStorage.getItem("loggedUser")
    if (userJSON) {
      const parsedUser = JSON.parse(userJSON)
      setUser(parsedUser)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    const user = await loginService.login({username, password})
    window.localStorage.setItem("loggedUser", JSON.stringify(user))
    setUser(user)
    setUsername("")
    setPassword("")
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem("loggedUser")
  }

  if (user === null) {
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
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <p>Hi, {user.username}!<button onClick={handleLogout}>logout</button></p>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }
}

export default App
