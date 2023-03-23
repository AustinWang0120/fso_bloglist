import { useState } from "react"

const Blog = ({blog}) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const contentToShow = () => {
    if (showDetails) {
      return (
        <div style={blogStyle}>
          <p>{blog.title}</p>
          <p>url: {blog.url}</p>
          <p>
            likes: {blog.likes}
            <button>like</button>
          </p>
          <p>by: {blog.author}</p>
          <button onClick={() => {setShowDetails(!showDetails)}}>hide</button>
        </div>
      )
    } else {
      return (
        <div style={blogStyle}>
          <p>{blog.title}</p>
          <button onClick={() => {setShowDetails(!showDetails)}}>view</button>
        </div>
      )
    }
  }

  return (
    <div>
      {contentToShow()}
    </div> 
  )
}

export default Blog
