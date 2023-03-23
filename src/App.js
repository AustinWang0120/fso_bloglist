import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  // fetch blogs from database
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  // fetch user from localStorage
  useEffect(() => {
    const userJSON = window.localStorage.getItem("loggedUser")
    if (userJSON) {
      const parsedUser = JSON.parse(userJSON)
      setUser(parsedUser)
      blogService.setToken(parsedUser.token)
    }
  }, [])

  // user login
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})
      setUser(user)
      window.localStorage.setItem("loggedUser", JSON.stringify(user))
      blogService.setToken(user.token)
      setUsername("")
      setPassword("")
    } catch(error) {
      window.alert("Wront credentials")
    }
  }

  // user logout
  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem("loggedUser")
    blogService.setToken(null)
  }

  // create blog
  const createBlog = async (newBlogObject) => {
    blogFormRef.current.toggleVisibility()
    const savedBlog = await blogService.create(newBlogObject)
    setBlogs(blogs.concat(savedBlog))
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
        <Togglable buttonLabel={"new blog"} ref={blogFormRef}>
          <BlogForm createBlog={createBlog} />
        </Togglable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }
}

export default App
