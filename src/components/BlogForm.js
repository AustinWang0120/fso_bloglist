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
        title
        <input value={title} onChange={({target}) => {setTitle(target.value)}} />
      </div>
      <div>
        author
        <input value={author} onChange={({target}) => {setAuthor(target.value)}} />
      </div>
      <div>
        url
        <input value={url} onChange={({target}) => {setUrl(target.value)}} />
      </div>
      <button type='submit'>create</button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm
