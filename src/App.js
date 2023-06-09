import { useState, useEffect, useRef } from "react"
import Login from "./components/Login"
import Blog from "./components/Blog"
import BlogForm from "./components/BlogForm"
import Togglable from "./components/Togglable"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  // fetch blogs from database
  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((prev, next) => {
        if (prev.likes < next.likes) {
          return 1
        } else if (prev.likes > next.likes) {
          return -1
        } else {
          return 0
        }
      })
      setBlogs(blogs)
    })
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
  const login = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      setUser(user)
      window.localStorage.setItem("loggedUser", JSON.stringify(user))
    } catch(error) {
      window.alert("Wrong credentials")
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

  // add a like
  const addLike = async (blog) => {
    const newBlog = { ...blog, likes: blog.likes + 1 }
    const updatedBlog = await blogService.update(blog.id, newBlog)
    setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog))
  }

  // remove a blog
  const removeBlog = async (blog) => {
    const blogId = blog.id
    await blogService.remove(blogId)
    setBlogs(blogs.filter(blog => blog.id !== blogId))
  }

  if (user === null) {
    return (
      <Togglable buttonLabel={"login"}>
        <Login login={login} />
      </Togglable>
    )
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <p>Hi, {user.name}!</p>
        <button onClick={handleLogout}>logout</button>
        <Togglable buttonLabel={"new blog"} ref={blogFormRef}>
          <BlogForm createBlog={createBlog} />
        </Togglable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} addLike={addLike} removeBlog={removeBlog} />
        )}
      </div>
    )
  }
}

export default App
