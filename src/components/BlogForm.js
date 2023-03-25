import { useState } from "react"
import PropTypes from "prop-types"

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const addBlog = (event) => {
    event.preventDefault()
    const newBlogObject = {
      title, author, url
    }
    createBlog(newBlogObject)
    setTitle("")
    setAuthor("")
    setUrl("")
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        <label htmlFor="input-title">title</label>
        <input id="input-title" value={title} onChange={({ target }) => {setTitle(target.value)}} />
      </div>
      <div>
        <label htmlFor="input-author">author</label>
        <input id="input-author" value={author} onChange={({ target }) => {setAuthor(target.value)}} />
      </div>
      <div>
        <label htmlFor="input-url">url</label>
        <input id="input-url" value={url} onChange={({ target }) => {setUrl(target.value)}} />
      </div>
      <button id="input-button" type='submit'>create</button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm
